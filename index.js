const db = require('./db')
const inquirer = require('inquirer')

module.exports.add = async (title) => {
  // 读取之前的任务
  const list = await db.read()
  // 添加一个新任务
  list.push({title: title, done: false})
  // 存储任务到文件
  await db.write(list)
}

module.exports.clear = async () => {
  await db.write([])
}

module.exports.show = async () => {
  // 读取之前的 list
  const list = await db.read()
  // 切换进行操作任务
  printTasks(list)
}

function printTasks(list) {
  inquirer
    .prompt({
      type: 'list',
      name: 'index',
      message: '请选择需要操作的任务',
      choices: [...list.map((item, index) => {
        return {
          name: `${item.done ? '[√]' : '[x]'}${index + 1}：${item.title}`, value: index.toString()
        }
      }), {name: ' + 添加', value: '-1'}, {name: ' x 取消', value: '-2'}]
    }).then((answer) => {
    const index = parseInt(answer.index)
    if (index >= 0) {
      askForAction(list, index)
    } else if (index === -1) {
      askForCreatTask(list)
    }
  })
}

function askForAction(list, index) {
  const actions = {markAsDone, markAsUnDone, remove, updateTitle}
  inquirer
    .prompt({
      type: 'list',
      name: 'action',
      message: '请选择操作',
      choices: [
        {name: '标记为完成', value: 'markAsDone'},
        {name: '标记为未完成', value: 'markAsUnDone'},
        {name: '修改标题', value: 'updateTitle'},
        {name: '删除', value: 'remove'},
        {name: '退出', value: 'quit'},
      ]
    }).then((answer) => {
    const action = actions[answer.action]
    action && action(list, index)
  })
}

function markAsDone(list, index) {
  list[index].done = true
  db.write(list).then(() => {console.log('已标记为完成')})
}

function markAsUnDone(list, index) {
  list[index].done = false
  db.write(list).then(() => {console.log('已标记为未完成')})
}

function remove(list, index) {
  list.splice(index, 1)
  db.write(list).then(() => { console.log('已删除')})
}

function updateTitle(list, index) {
  inquirer
    .prompt({
      type: 'input',
      name: 'title',
      message: '请输入标签名',
      default: list[index].title
    }).then((answer) => {
    list[index].title = answer.title
    db.write(list).then(() => {console.log('修改成功')})
  })
}

function askForCreatTask(list) {
  inquirer
    .prompt({
      type: 'input',
      name: 'title',
      message: '请输入任务名称',
    }).then((answer) => {
    list.push({title: answer.title, done: false})
    db.write(list).then(() => {console.log('添加成功')})
  })
}