// 存储已输入指令
const commandStack = []

// 记录当前指令下标
let commandIndex = 0

// 解析指令
function Analysis() {
  const value = input.value.trim()
  commandStack.push(value)
  commandIndex++
  let params = value.split(" ").filter((value) => {
    return value != ''
  })
  let command = params[0].toLowerCase()
  params.shift()
  if (commands[command]) {
    commands[command].run(params)
  } else {
    print(`没有${command}指令，请输入help查看支持的命令`, 'red')
  }
}

// 参数判断
function paramsJu(num, args) {
  return args.length === num
}

function ParamsWarn(command, params) {
  print(`${command} needs ${params} params`, 'red')
}
