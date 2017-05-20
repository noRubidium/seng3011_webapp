import csv, json
d = dict()
l = list()
with open('ASXListedCompanies.csv', 'rb') as csvfile:
    spamreader = csv.reader(csvfile, delimiter=',', quotechar='"')
    for row in spamreader:
        obj = dict()
        obj['id'] = row[1]
        obj['name'] = row[0]
        obj['industry'] = row[2]
        l.append(obj)
d['data'] = l
print json.dumps(d)
