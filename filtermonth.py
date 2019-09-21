import pandas as pd
for i in range(1,13):
	f = pd.read_csv("state_pair_month.csv")
	f['Start_Time'] = f['Start_Time'].apply(str)
	f['Day'] = f['Day'].apply(str)
	f['Night'] = f['Night'].apply(str)

	filter = f["Start_Time"] == str(i)
	df = f.where(filter)

	keep_col = ['State','Day','Night']
	df = df[keep_col]
	df.dropna(axis=0, how='all', thresh=None, subset=None, inplace=True)
	df.to_csv(str(i)+".csv", index=False)
	