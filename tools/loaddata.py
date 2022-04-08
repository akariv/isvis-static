import json
import requests
import sys
import os

base_id = 'appxDd09nZFUbJcMn'
api_key = os.getenv('AIRTABLE_APIKEY')
headers = {'Authorization': 'Bearer '  + api_key}
def get_airtable_data(table_name):
    resp = []
    url = "https://api.airtable.com/v0/" + base_id + "/" + table_name
    response = requests.get(url, headers=headers)
    airtable_response = response.json()
    airtable_response = airtable_response['records']
    for elem in airtable_response:
        new_dict = {'id': elem['id'], 'createdTime': elem['createdTime']}
        new_dict.update(elem['fields'])
        resp.append(new_dict)
    
    str_response = json.dumps((sorted(resp, key = lambda i: i['id'])))
    str_response = 'var '+table_name+'=\n'+str_response[:-1] +'\n];'
    return str_response



with open('../js/'+sys.argv[1]+'.js', 'w') as f:
    f.write(get_airtable_data(sys.argv[1]))
    f.close()
