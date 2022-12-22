# LDay

+ isLeap
是否是闰年
返回Boolean

+ format
格式化
返回值为字符串

+ isSame
是否是相同时间
参数为另一个Day对象
返回值为Boolean

+ day
是星期几，从1开始
返回值为number

+ dayOfYear
是一年内的第几天
返回值为number

+ week
一年内第几周
返回值为number

+ add
加
参数：1. 数值
      2. 关键字（'y','year','M','month','d','date','h','hour','m','minute','s','second','ms','millisecond'）
返回新的Day对象

+ subtract
减
同add

+ daysInMonth
获取本月天数
参数：关键字（'y','year','M','month','d','date','h','hour','m','minute','s','second','ms','millisecond'）
返回值number

+ get
获取数据
参数：关键字（'y','year','M','month','d','date','h','hour','m','minute','s','second','ms','millisecond','w','day'）

+ toArray
转换成数组
返回值：[年 月 日 时 分 秒 星期几]构成的数组

## 浏览器使用

```html
<script src="https://cdn.jsdelivr.net/npm/lday@0.0.1-beta/LDay.js"></script>
<script>
    console.log(LDay());
  </script>
```
