# id	name	business_type	size	OGRN	INN	type	area	town	office	recreated	licensed	
import pandas as pd 
import sqlite3
import os
import enum

if os.path.basename('.') != 'createDB':
  os.chdir('createDB')

filename = [ i for i in os.listdir() if i.split('.')[-1] == 'xlsx'][0]
df = pd.read_excel(filename)

print('Replacing business_type...')
df = df.replace('Юридическое лицо', 'U')
df = df.replace('Индивидуальный предприниматель', 'I')

print('Making valid boolean...')
df = df.replace('Нет', False)
df = df.replace('Да', True)

print('Validating business types...')
df = df.replace('Не является субъектом МСП', 'UNSET')
df = df.replace('Микропредприятие', 'MICRO')
df = df.replace('Малое предприятие', 'SMALL')
df = df.replace('Среднее предприятие', 'MEDIUM')

class Ulus(enum.Enum):
  оленекский = 1
  мирнинский = 2
  мирный = 2
  ленский = 3
  ленск = 3
  олекминский = 4
  нерюнгри = 5
  алданский = 6
  алдан = 6
  усть_майский = 7
  сунтарский = 8
  булунский = 9
  жиганский = 10
  нюрбинский = 11
  нюрба = 11
  верхневилюйский = 12
  вилюйский = 13
  вилюйск = 13
  горный = 14
  хангаласский = 15
  амгинский = 16
  оймяконский = 17
  таттинский = 18
  якутск = 19
  намский = 20
  мегино_кангаласский = 21
  чурапчинский = 22
  усть_алданский = 23
  томпонский = 24
  кобяйский = 25
  эвено_бытантайский = 26
  верхоянский = 27
  усть_янский = 28
  аллаиховский = 29
  момский = 30
  верхнеколымский = 31
  абыйский = 32
  среднеколымский = 33
  среднеколымск = 33
  нижнеколымский = 34
  анабарский = 35


print('Enumerating areas...')
for i, column in enumerate(df['area']):
  if type(column) != float:
    ulus = column.split(' ')[0].lower()
  else:
    try:
      ulus = df['town'][i].split(' ')[1].lower()
    except AttributeError: # Жатай
      ulus = 'якутск'

  
  ulus = ulus.replace('-', '_')
  df['area'][i] = Ulus[ulus].value


print('Saving results...')

df.drop('town', inplace=True, axis=1)
df.drop('office', inplace=True, axis=1)

connection = sqlite3.connect('businesses.db')

df.to_sql(name='business', con=connection)

connection.commit()
connection.close()