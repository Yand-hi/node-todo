const db = require('./db')
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