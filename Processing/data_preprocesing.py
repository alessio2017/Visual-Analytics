import pandas as pd
import numpy as np
import random
import csv
import datetime

from sklearn.decomposition import PCA
from sklearn.preprocessing import StandardScaler

def save_pca(df):
    x = df.values
    x = StandardScaler().fit_transform(x)

    #pd.DataFrame(data = x, columns = features).head()
    pca = PCA(n_components=2)
    principalComponents = pca.fit_transform(x)
    
    principalDf = pd.DataFrame(data = principalComponents, 
                                columns = ['principal component 1', 'principal component 2'])
    
    principalDf["A"] = df["Severity"] 
    principalDf["D"] = df["End_Time"]
    
    print(principalDf.head(5))

    with open("FDB/pca_viz.tsv", "w") as f:
        a = principalDf.values
        mat = np.matrix(a)
        
        print('P1\tP2\tA\tD', file=f)
        #print('P1\tP2\tA', file=f) #-->attuale
        
        for line in mat:
            np.savetxt(f, line, delimiter="\t")

#features = ['State','End_Time','Severity','Temperature(F)','Wind_Chill(F)','Humidity(%)','Pressure(in)','Visibility(mi)','Wind_Speed(mph)','Precipitation(in)']

features = ['State','End_Time','Severity','Temperature(F)','Wind_Chill(F)','Visibility(mi)','Precipitation(in)']

filename = "FDB/outfile2.csv"
n = sum(1 for line in open(filename))-1
s = 25000    	
skip = sorted(random.sample(range(1,n+1),n-s))
f=pd.read_csv(filename,skiprows=skip)

new_f = f[features]
''' anno-mese-giorno 2018-02-08 
x = datetime.datetime(2018, 2, 3) --> formato che bisogna passare
'''
new_f.to_csv("FDB/finalFile3.csv", index=False)

with open('FDB/finalFile3.csv','r') as fin,  open ('FDB/pca.csv','w') as fout:
    writer = csv.writer(fout, delimiter=',')     
   
    col = next(csv.reader(fin, delimiter=','))
    writer.writerow(col)
    
    for row in csv.reader(fin, delimiter=','):
        #if row[3] is "" or row[4] is "" or row[5] is "" or row[6] is "" or row[7] is "" or row[8] is "" or row[9] is "":

    	if row[3] is "" or row[4] is "" or row[5] is "" or row[6] is "":
    		continue
    	else:
    		y = row[1]
    		y = y[5:10]
    		month = y[0:2]
    		day = y[3:5]
    		x = datetime.datetime(2018,int(month),int(day))
    		x = x.strftime("%A")
    		
    		print(x)
    		if x == "Monday":
    			row[1] = 1
    		if x == "Tuesday":
    			row[1] = 2
    		if x == "Wednesday":
    			row[1] = 3
    		if x == "Thursday":
    			row[1] = 4
    		if x == "Friday":
    			row[1] = 5
    		if x == "Saturday":
    			row[1] = 6
    		if x == "Sunday":
    			row[1] = 7
    		
    		writer.writerow(row)

f=pd.read_csv('FDB/pca.csv')  	

save_pca(f.loc[:, features[1:]]) 