# playground

一个自己写点代码玩的地方
[web](https://jiankang-li.github.io/playground/)

## `tool.js` 实现功能

+ unique,
数组去重
+ CNumber,
创建一个指定范围的随机数
+ CNumbers,
创建指定长度，范围的随机数组
+ CString,
创建指定长度的字符串
+ Ctime,
返回当前时间
+ dpClone,
深度克隆
+ CDate,
返回当前日期
+ get,
获取DOM元素
+ debounce,
防抖
+ throttle,
节流
+ Sreverse,
字符串翻转
+ type,
返回数据准确类型
+ quickSort,
快速排序
+ Dom,
自定义DOM类实现简单Jquery操作
+ Cookie,
自定义Cookie操作类
+ Local,
自定义localStorage操作类
+ Session,
自定义SessionStorage操作类
+ Bus,
自定义全局事件总线类
+ Http,
自定义http请求类(fetch实现)
+ XHR,
自定义http请求类(XMLHttpRequest实现)
+ getQueryString,
获取url某个参数
+ float,
解决0.1+0.2！=0.3
+ dayDif,
返回两个日期之间差的天数
+ timeFromDate,
时间格式化
+ rgbToHex,
rgb颜色转hex格式
+ rem2px,
rem转px
+ formatNumber,
格式化数字，增加(,)
+ getScrollOffset
获取滚动条位置
+ getViewportOffset
获取窗口大小
+ getStyle
获取元素某个样式
+ Notify
桌面通知
+ isEqual
判断两个值或对象是否相等
+ isEmpty
判断对象是否为空
+ addBig
大整数相加
+ factorial
求阶乘
+ sleep
睡眠
+ retry
重试
+ deepFreeze
深度冻结
+ toUp
字符串转大写
+ toLow
字符串转小写
+ FUp
字符串首字母大写
+ uniqueArrayObject
对象数组去重
+ getFirsLastDay
返回当月第一天和最后一天

### HTML 模块化使用

```HTML
<script type="module">
  import { CDate } from "./module.js"
  console.log(CDate());
</script>
```

## t-nani

这是一个爬取网站照片的python脚本
