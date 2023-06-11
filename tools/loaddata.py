import json
import requests
import os
import codecs

base_id = 'appxDd09nZFUbJcMn'
api_key = os.getenv('AIRTABLE_APIKEY')
headers = {'Authorization': 'Bearer '  + api_key}

def processImage(image):
    if image and len(image) > 0:
        url = image[0].get('thumbnails', {}).get('large', {}).get('url')
        if url:
            image = requests.get(url).content
            return 'data:image/png;base64,' + codecs.encode(image, 'base64').decode().replace('\n', '').replace('\r', '').replace('\t', '').replace(' ', '')
    return ''

def get_airtable_data(table_name):
    resp = []
    url = "https://api.airtable.com/v0/" + base_id + "/" + table_name
    done = False
    offset = None
    while not done:
        params = {'view': 'Grid view'}
        if offset:
            params['offset'] = offset
        response = requests.get(url, headers=headers, params=params)
        airtable_response = response.json()
        offset = airtable_response.get('offset')
        airtable_response = airtable_response['records']
        for elem in airtable_response:
            new_dict = {'id': elem['id'], 'createdTime': elem['createdTime']}
            fields = elem['fields']
            if fields.get('v') == 'false':
                fields['v'] = False
            if fields.get('authorImage'):
                fields['authorImage'] = processImage(fields['authorImage'])
            new_dict.update(fields)
            resp.append(new_dict)
        if not offset:
            done = True
    
    str_response = json.dumps(resp, indent=4, sort_keys=True, ensure_ascii=False)
    str_response = 'var '+table_name+'=\n'+str_response[:-1] + '\n;'
    return str_response


def process_file(table):
    with open(f'./js/{table}.js', 'w') as f:
        f.write(get_airtable_data(table))

if __name__ == '__main__':
    for f in ['aboutsection', 'allvideos', 'importantdates', 'tickettype', 'allEvents', 'introkeys']:
        print(f'>>> Processing {f}')
        process_file(f)
