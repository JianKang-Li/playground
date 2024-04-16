const commands = {
  search: {
    description: '用于搜索，第一个参数为关键词，第二个参数为搜索源',
    detail: `search source keyword`,
    run(...args) {
      if (paramsJu(2, args[0])) {
        const type = args[0][0]
        const key = args[0][1]
        search(key, type)
        print('Successful!', 'green')
      }
      else if (paramsJu(1, args[0])) {
        const key = args[0][0]
        search(key)
        print('Successful!', 'green')
      }
      else {
        ParamsWarn('search', 1)
      }
    },
  },
  help: {
    description: '查询命令的使用方法',
    detail: `使用:help`,
    run() {
      print(`**参数请使用空格作为分割**`)
      for (const key in commands)
        print(`${key} --${commands[key].description}`, 'green')
    },
  },
  time: {
    description: '返回当前时间',
    detail: `使用:time`,
    run() {
      const time = (new Date()).toTimeString().slice(0, 8)
      print(`当前时间: ${time}`, 'green')
    },
  },
  cls: {
    description: '清除控制台',
    detail: `使用:cls`,
    run() {
      const prints = document.querySelectorAll('.print')
      prints.forEach((print) => {
        print.remove()
      })
    },
  },
  go: {
    description: '前往指定网站',
    detail: `使用:go URL/书签名`,
    run(...args) {
      if (paramsJu(1, args[0])) {
        // const pry = url = args[0][0]
        flag = 0
        for (const key in LKWebShell.bookmarks) {
          if (key === url) {
            flag = 1
            url = LKWebShell.bookmarks[key]
          }
        }
        if (!flag && !url.includes('http'))
          url = `http://${url}`

        window.open(url)
        print('Successful!', 'green')
      }
      else {
        ParamsWarn('go', 1)
      }
    },
  },
  date: {
    description: '返回当前日期',
    detail: `使用:date`,
    run() {
      const date = new Date()
      const day
        = `${date.getFullYear().toString().padStart(4, 0)
         }-${
         (date.getMonth() + 1).toString().padStart(2, 0)
         }-${
         date.getDate().toString().padStart(2, 0)}`
      print(`当前日期: ${day}`, 'green')
    },
  },
  set: {
    description: '对网站某些属性进行设置',
    detail: `使用:set type value;<br>
    支持设置的属性有background(bg)`,
    run(...args) {
      if (paramsJu(2, args[0])) {
        const type = args[0][0]
        const value = args[0][1]
        if (LKWebShell[type]) {
          LKWebShell[type] = value
          local.set('LKWebShell', JSON.stringify(LKWebShell))
          init()
          print(`Successful!`, 'green')
        }
        else {
          print(`cant't set attribute ${type}`, 'red')
        }
      }
      else {
        ParamsWarn('set', 2)
      }
    },
  },
  detail: {
    description: '返回某个指令的detail',
    detail: `使用:detail command`,
    run(...args) {
      if (paramsJu(1, args[0])) {
        const command = args[0][0].toLowerCase()
        if (commands[command])
          print(commands[command].detail, 'green')
        else
          print(`无效命令${command}`, 'red')
      }
      else {
        ParamsWarn('detail', 1)
      }
    },
  },
  source: {
    description: '打印支持的搜索源',
    run() {
      for (const key in search_source)
        print(`${key} --${search_source[key]}<br/>`, 'green')
    },
  },
  save: {
    description: '保存书签',
    detail: `使用:save 显示词 网址`,
    run(...args) {
      if (paramsJu(2, args[0])) {
        const show = args[0][0]
        const value = args[0][1]
        console.warn(LKWebShell.bookmarks)
        LKWebShell.bookmarks[show] = value
        local.set('LKWebShell', JSON.stringify(LKWebShell))
        init()
        print(`Successful!`, 'green')
      }
      else {
        ParamsWarn('set', 2)
      }
    },
  },
  bookmarks: {
    description: '查看书签',
    detail: `使用:bookmarks`,
    run() {
      for (const key in LKWebShell.bookmarks)
        print(`${key} ${LKWebShell.bookmarks[key]}`)
    },
  },
}
