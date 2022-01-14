const db = require('./db')
const inquirer = require('inquirer')

module.exports.add = async (title) => {
  const task = {
    title: title,
    done: false
  }
  // 读取之前的任务
  const list = await db.read()
  // 添加一个新任务
  list.push(task)
  // 存储任务到文件
  await db.write(list)
}

module.exports.clear = async () => {
  await db.write([])
}

module.exports.show = async () => {
  // 读取之前的 list
  const list = await db.read()
  inquirer
    .prompt({
      type: 'list',
      name: 'index',
      message: '请选择需要操作的任务',
      choices: list.map((item, index) => {
        return {
          name: `${item.done ? '[√]' : '[x]'}${index + 1}：${item.title}`,
          value: index.toString()
        }
      })
    })
    .then((answer) => {
      console.log(answer.index)
    })
}