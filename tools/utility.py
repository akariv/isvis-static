from base64 import encode
import json
import csv
import sys

def toCsv(file):
    name = file[:-3]
    #open json
    f = open(file, 'r',encoding='utf-8').read()
    f = (f.split('=',1)[1])[:-1]
    #parse to json
    json_f = json.loads(f)
    
    data_file = open(name + '.csv', 'w', encoding='utf-8', newline='')
    fields = list(json_f[0].keys())
    delete = ['_id', 'createdAt', 'updatedAt']
    fields = [x for x in fields if x not in delete]
    csv_writer = csv.DictWriter(data_file, fieldnames=fields, extrasaction='ignore')
    csv_writer.writeheader()
    for emp in json_f:
        csv_writer.writerow(emp)
    data_file.close()
toCsv(sys.argv[1])