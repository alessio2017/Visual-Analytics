import pandas as pd
import csv
import re

with open('US_Accidents_May19.csv','r') as fin,  open ('outfile2018.csv','w') as fout:
    writer = csv.writer(fout, delimiter=',')     
   
    col = next(csv.reader(fin, delimiter=','))
    writer.writerow(col)
    
    for row in csv.reader(fin, delimiter=','):
    	if re.search(r'^2018',row[4]):
    		row[4] = (row[4])[5:7]
    		writer.writerow(row)
    		
    	
f=pd.read_csv("outfile2018.csv")

keep_col = ['ID','Severity','Start_Time','End_Time','Description','City','Country','State','Temperature(F)','Visibility(mi)','Wind_Speed(mph)','Weather_Condition','Crossing','Railway','Sunrise_Sunset']

new_f = f[keep_col]
new_f.to_csv("finalFile.csv", index=False)


f = pd.read_csv("finalFile.csv")
data = f.groupby(['Start_Time', 'State']).size().reset_index(name='Counts')
df = pd.DataFrame(data, columns = ['Start_Time', 'State', 'Counts'])
df.to_csv("results.csv", index=False)

f = pd.read_csv("results.csv")
data = f.groupby(['State']).mean().reset_index();
df = pd.DataFrame(data, columns = ['State', 'Counts'])
df.to_csv("mean_annua.csv", index=False)


f = pd.read_csv("finalFile.csv")
data = f.groupby(['Start_Time','State','Sunrise_Sunset']).size().reset_index(name='Counts');
df = pd.DataFrame(data, columns = ['Start_Time','State','Counts'])
df.to_csv("state_pair_month.csv", index=False)

with open('finalFile.csv','r') as fin,  open ('night.csv','w') as fout:
    writer = csv.writer(fout, delimiter=',')     
   
    col = next(csv.reader(fin, delimiter=','))
    writer.writerow(col)
    
    for row in csv.reader(fin, delimiter=','):
    	if re.search(r'^Night',row[14]):
    		writer.writerow(row)
    			
f = pd.read_csv("night.csv")
data = f.groupby(['Start_Time','State']).size().reset_index(name='Night');
df = pd.DataFrame(data, columns = ['Start_Time','State','Night'])
df.to_csv("Night_correct.csv", index=False)
    			
with open('finalFile.csv','r') as fin,  open ('day.csv','w') as fout:
    writer = csv.writer(fout, delimiter=',')     
   
    col = next(csv.reader(fin, delimiter=','))
    writer.writerow(col)
    
    for row in csv.reader(fin, delimiter=','):
    	if re.search(r'^Day',row[14]):
    		writer.writerow(row)    			
    			
f = pd.read_csv("day.csv")
data = f.groupby(['Start_Time','State']).size().reset_index(name='Day');
df = pd.DataFrame(data, columns = ['Start_Time','State','Day'])
df.to_csv("Day_correct.csv", index=False)



   
    			
    			