import pandas as pd
import numpy as np
import random
import csv

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
    '''principalDf["D"] = df["Wind_Chill(F)"]'''
    
    print(principalDf.head(5))

    with open("pca_viz.tsv", "w") as f:
        a = principalDf.values
        mat = np.matrix(a)
        print('P1\tP2\tA', file=f)
        for line in mat:
            np.savetxt(f, line, delimiter="\t")


features = ['State','Severity','Temperature(F)','Wind_Chill(F)','Humidity(%)','Pressure(in)','Visibility(mi)','Wind_Speed(mph)','Precipitation(in)']

filename = "outfile2.csv"
n = sum(1 for line in open(filename))-1
s = 25000    	
skip = sorted(random.sample(range(1,n+1),n-s))
f=pd.read_csv(filename,skiprows=skip)

new_f = f[features]

new_f.to_csv("finalFile3.csv", index=False)
with open('finalFile3.csv','r') as fin,  open ('pca.csv','w') as fout:
    writer = csv.writer(fout, delimiter=',')     
   
    col = next(csv.reader(fin, delimiter=','))
    writer.writerow(col)
    
    for row in csv.reader(fin, delimiter=','):
    	if row[2] is "" or row[3] is "" or row[4] is "" or row[5] is "" or row[6] is "" or row[7] is "" or row[8] is "":
    		continue
    	else:
    		writer.writerow(row)

f=pd.read_csv('pca.csv')  	
save_pca(f.loc[:, features[1:]])