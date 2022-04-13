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
        new_dict.update(elem['fields'])
        resp.append(new_dict)
    
    str_response = json.dumps(resp)
    str_response = 'var '+table_name+'=\n'+str_response[:-1] +'\n];'
    return str_response


for i in ['tickettype', 'introkeys', 'aboutsection', 'importantdates', 'allvideos', 'allEvents']:
    with open('../js/'+i+'.js', 'w') as f:
        f.write(get_airtable_data(i))
        f.close()
