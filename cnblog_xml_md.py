import os
import re
from bs4 import BeautifulSoup

xml_file = 'test.xml'
out_dir = 'output'

xml_file = open(xml_file, 'r', encoding='utf-8').read()
if xml_file[0] == '\ufeff':
    xml_file = xml_file[1:]

if not os.path.exists(out_dir):
    os.mkdir(out_dir)

soup = BeautifulSoup(xml_file, features="xml")
items =soup.find_all('content')
items = items[1:]
titles = re.findall(r'title type="text">(.+)</title>', xml_file)
titles = titles[2:]


for i in range(len(items)):
    if '/' in titles[i]:
        print('path with slash:', titles[i])
        title_legal = titles[i].replace('/', '_')
    else:
        title_legal = titles[i]

    with open(out_dir + '/'+ title_legal + '.md', 'w', encoding='utf-8') as file:
        content = items[i].string.replace('<content type="text">', '')
        content = content.replace('</content>', '')
        file.write(titles[i])
        file.write(content)
        file.close()