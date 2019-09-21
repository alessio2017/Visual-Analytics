import pandas as pd
import re
import csv
import random
''' We don't use the following comment code
with open('finalFile.csv','r') as fin,  open ('Rain.csv','w') as fout:

    writer = csv.writer(fout, delimiter=',')     
   
    col = next(csv.reader(fin, delimiter=','))
    writer.writerow(col)
    
    for row in csv.reader(fin, delimiter=','):
    	if re.search(r'^.*Rain.*$',row[11]) or re.search(r'^.*Drizzle.*$',row[11]):
    		row[11] = "Rain"
    		writer.writerow(row)
    		
f = pd.read_csv("Rain.csv")
data = f.groupby(['State','Weather_Condition']).size().reset_index(name='Count_Rain')
df = pd.DataFrame(data, columns = ['State', 'Count_Rain'])
df.to_csv("Count_Rain.csv", index=False)






with open('finalFile.csv','r') as fin,  open ('Overcast.csv','w') as fout:

    writer = csv.writer(fout, delimiter=',')     
   
    col = next(csv.reader(fin, delimiter=','))
    writer.writerow(col)
    
    for row in csv.reader(fin, delimiter=','):
    	if re.search(r'^.*Overcast.*$',row[11]) or re.search(r'^.*Cloudy.*$',row[11]) or re.search(r'^.*Cloud.*$',row[11]) or re.search(r'^.*Clouds.*$',row[11]) :
    		row[11] = "Overcast"
    		writer.writerow(row)
    		
f = pd.read_csv("Overcast.csv")
data = f.groupby(['State','Weather_Condition']).size().reset_index(name='Count_Overcast')
df = pd.DataFrame(data, columns = ['State', 'Count_Overcast'])
df.to_csv("Count_Overcast.csv", index=False)




with open('finalFile.csv','r') as fin,  open ('Snow.csv','w') as fout:

    writer = csv.writer(fout, delimiter=',')     
   
    col = next(csv.reader(fin, delimiter=','))
    writer.writerow(col)
    
    for row in csv.reader(fin, delimiter=','):
    	if re.search(r'^.*Snow.*$',row[11]):
    		row[11] = "Snow"
    		writer.writerow(row)
    		
f = pd.read_csv("Snow.csv")
data = f.groupby(['State','Weather_Condition']).size().reset_index(name='Count_Snow')
df = pd.DataFrame(data, columns = ['State', 'Count_Snow'])
df.to_csv("Count_Snow.csv", index=False)




with open('finalFile.csv','r') as fin,  open ('Fog.csv','w') as fout:

    writer = csv.writer(fout, delimiter=',')     
   
    col = next(csv.reader(fin, delimiter=','))
    writer.writerow(col)
    
    for row in csv.reader(fin, delimiter=','):
    	if re.search(r'^.*Fog.*$',row[11]) or re.search(r'^.*Haze.*$',row[11]) or re.search(r'^.*Mist.*$',row[11]):
    		row[11] = "Fog"
    		writer.writerow(row)
    		
f = pd.read_csv("Fog.csv")
data = f.groupby(['State','Weather_Condition']).size().reset_index(name='Count_Fog')
df = pd.DataFrame(data, columns = ['State', 'Count_Fog'])
df.to_csv("Count_Fog.csv", index=False)



with open('finalFile.csv','r') as fin,  open ('Clear.csv','w') as fout:

    writer = csv.writer(fout, delimiter=',')     
   
    col = next(csv.reader(fin, delimiter=','))
    writer.writerow(col)
    
    for row in csv.reader(fin, delimiter=','):
    	if re.search(r'^.*Clear.*$',row[11]):
    		row[11] = "Clear"
    		writer.writerow(row)
    		
f = pd.read_csv("Clear.csv")
data = f.groupby(['State','Weather_Condition']).size().reset_index(name='Count_Clear')
df = pd.DataFrame(data, columns = ['State', 'Count_Clear'])
df.to_csv("Count_Clear.csv", index=False)




with open('finalFile.csv','r') as fin,  open ('Freezing.csv','w') as fout:

    writer = csv.writer(fout, delimiter=',')     
   
    col = next(csv.reader(fin, delimiter=','))
    writer.writerow(col)
    
    for row in csv.reader(fin, delimiter=','):
    	if re.search(r'^.*Freezing.*$',row[11]):
    		row[11] = "Freezing"
    		writer.writerow(row)
    		
f = pd.read_csv("Freezing.csv")
data = f.groupby(['State','Weather_Condition']).size().reset_index(name='Count_Freezing')
df = pd.DataFrame(data, columns = ['State', 'Count_Freezing'])
df.to_csv("Count_Freezing.csv", index=False)
'''


'''

with open('US_Accidents_May19.csv','r') as fin,  open ('outfile2.csv','w') as fout:
    writer = csv.writer(fout, delimiter=',')     
   
    col = next(csv.reader(fin, delimiter=','))
    writer.writerow(col)
    
    for row in csv.reader(fin, delimiter=','):
    	if re.search(r'^2018',row[4]):
    		row[4] = (row[4])[5:7]
    		writer.writerow(row)
'''		
filename = "outfile2.csv"
n = sum(1 for line in open(filename))-1
s = 10000    	
skip = sorted(random.sample(range(1,n+1),n-s))
f=pd.read_csv(filename,skiprows=skip)

keep_col = ['Severity','State','Temperature(F)','Wind_Chill(F)','Humidity(%)','Pressure(in)','Visibility(mi)','Wind_Speed(mph)','Precipitation(in)']


new_f = f[keep_col]

new_f.to_csv("finalFile2.csv", index=False)


with open('finalFile2.csv','r') as fin,  open ('1k-6num-attrs.csv','w') as fout:
    writer = csv.writer(fout, delimiter=',')     
   
    col = next(csv.reader(fin, delimiter=','))
    writer.writerow(col)
    
    for row in csv.reader(fin, delimiter=','):
    	if row[2] is "" or row[3] is "" or row[4] is "" or row[5] is "" or row[6] is "" or row[7] is "" or row[8] is "":
    		continue
    	else:
    		writer.writerow(row)
    '''
    	if row[2] is "":
    		row[2] = "0"
    	if row[3] is "":
    		row[3] = "0"
    	if row[4] is "":
    		row[4] = "0"
    	if row[5] is "":
    		row[5] = "0"
    	if row[6] is "":
    		row[6] = "0"
    	if row[7] is "":
    		row[7] = "0"
    	if row[8] is "":
    		row[8] = "0"
    	
    	writer.writerow(row)
    '''
