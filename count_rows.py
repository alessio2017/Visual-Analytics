import csv
with open('outfile2018.csv','r') as fin:
   
    col = next(csv.reader(fin, delimiter=','))
    count = 0;

    for row in csv.reader(fin, delimiter=','):
    	count+=1
    	
    print('# of rows 2018 = '+str(count))

with open('US_Accidents_May19.csv','r') as fin:
   
    col = next(csv.reader(fin, delimiter=','))
    count = 0;

    for row in csv.reader(fin, delimiter=','):
    	count+=1
    	
    print('# of rows = '+str(count))