# encoding=utf-8
import urllib.request
import urllib.parse
import json

expressCode = {'yuantong': "圆通", 'shentong': "申通", "zhongtong": "中通", 'yunda': '韵达',
               'jtexpress': "极兔", 'debangkuaidi': "德邦快递", 'jd': "京东", 'shunfeng': '顺丰',
               'youzhengguonei': '邮政国内'}

Iheaders = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36'}

Province = input('省份：')
City = input('城市：')
Area = input('地区/县：')
Address = input('详细地址：')
data = {
    'platform': 'WWW',
    'toProvince': Province,
    'toCity': City,
    'toArea': Area,
    'toAddress': Address
}

request = urllib.request.Request("https://www.kuaidi100.com/apicenter/order.do?method=expressStopInquiries",
                                 data=urllib.parse.urlencode(data).encode('utf-8'), headers=Iheaders, method='POST')
response = urllib.request.urlopen(request)
content = response.read().decode('utf-8')
res = json.loads(content)
result = res['data']['toReachable']
print('查询结果')
for i in result:
    print('{} {} {}'.format(expressCode[i['expressCode']], '可达' if i['reachable'] else '不可达', i['reason']))
