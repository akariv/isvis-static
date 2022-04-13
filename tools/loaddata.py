import json
import requests
import sys
import os

base_id = 'app72pKh6npOppDZY'
api_key = os.getenv('AIRTABLE_APIKEY')
headers = {'Authorization': 'Bearer '  + api_key}
def get_airtable_data(table_name):
    resp = []
    url = "https://api.airtable.com/v0/" + base_id + "/" + table_name
    response = requests.get(url, headers=headers, params={'view': 'Grid view'})
    airtable_response = response.json()
    airtable_response = airtable_response['records']
    for elem in airtable_response:
        new_dict = {'id': elem['id'], 'createdTime': elem['createdTime']}
        fields = elem['fields']
        if fields.get('v') == 'false':
            fields['v'] = False
        new_dict.update(fields)
        resp.append(new_dict)
    
    str_response = json.dumps(resp)
    str_response = 'var '+table_name+'=\n'+str_response[:-1] +'\n];'
    return str_response


def process_file(table):
    with open(f'../js/{table}.js', 'w') as f:
        f.write(get_airtable_data(table))

if __name__ == '__main__':
    for f in ['aboutsection', 'allvideos', 'importantdates', 'tickettype', 'allEvents', 'introkeys']:
        print(f'>>> Processing {f}')
        process_file(f)
