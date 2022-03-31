from base64 import encode
import json
import csv
import pandas as pd

def toCsv(file):
    name = file[:-3]
    #open json
    f = open(file, 'r',encoding='utf-8').read()
    f = (f.split('=',1)[1])[:-1]
    #parse to json
    json_f = json.loads(f)
    
    data_file = open(name + '.csv', 'w', encoding='utf-8')

    csv_writer = csv.writer(data_file)

    count = 0

    for emp in json_f:
        if count == 0:
            # Writing headers of CSV file
            header = emp.keys()
            csv_writer.writerow(header)
            count += 1
        csv_writer.writerow(emp.values())
    data_file.close()
    df = pd.read_csv(name+'.csv', encoding='utf-8')
    #drop columns
    df.drop('_id', inplace=True, axis=1)
    df.drop('id', inplace=True, axis=1)
    df.drop('createdAt', inplace=True, axis=1)
    df.drop('updatedAt', inplace=True, axis=1)
    df.to_csv(name+'.csv',index=False)
toCsv('tickettype.js')