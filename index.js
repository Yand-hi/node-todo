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
  // 切换进行操作任务
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
      // 改变任务状态
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
        }).then((answer2) => {
        switch (answer2.action) {
          case 'markAsDone':
            list[index].done = true
            db.write(list)
            console.log('已标记为完成')
            break
          case 'markAsUnDone':
            list[index].done = false
            db.write(list)
            console.log('已标记为未完成')
            break
          case 'remove':
            list.splice(index, 1)
            db.write(list)
            console.log('已删除')
            break
          case 'updateTitle':
            inquirer
              .prompt({
                type: 'input',
                name: 'title',
                message: '请输入标签名',
                default: list[index].title
              }).then((answer3) => {
              list[index].title = answer3.title
              db.write(list)
              console.log('修改成功')
            })
            break
        }
      })
    } else if (index === -1) {
      // 添加任务
      inquirer
        .prompt({
          type: 'creat',
          name: 'title',
          message: '请输入任务名称',
        }).then((answer4) => {
        list.push({title: answer4.title, done: false})
        db.write(list)
        console.log('添加成功')
      })
    }
  })
}