# id	name	business_type	size	OGRN	INN	type	area	town	office	recreated	licensed	
import pandas as pd 
import sqlite3
import os

if os.path.basename('.') != 'createDB':
  os.chdir('createDB')

filename = [ i for i in os.listdir() if i.split('.')[-1] == 'xlsx'][0]
df = pd.read_excel(filename)
df = df.replace('Юридическое лицо', 'UP')
df = df.replace('Индивидуальный предприниматель', 'IP')

df = df.replace('Не является субъектом МСП', 'UNSET')
df = df.replace('Микропредприятие', 'MICRO')
df = df.replace('Малое предприятие', 'SMALL')
# df = df.replace('Среднее предприятие', 'MEDIUM')
# df = df.rename(columns = {'id': 'buisiness.id'})

# print(df)

connection = sqlite3.connect('businesses.db')

df.to_sql(name='business', con=connection)

connection.commit()
connection.close()