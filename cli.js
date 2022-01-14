const program = require('commander');
const api = require('./index')

program
  .option('-x, --xxx', 'hello xxx')
program
  .command('add')
  .description('add a task')
  .action((...args) => {
    const words = args.slice(0, -1).join(' ')
    api.add(words)
      .then(() => {console.log('添加成功')}, () => {console.log('添加失败')})
  });
program
  .command('clear')
  .description('clear all task')
  .action(() => {
    api.clear()
      .then(() => {console.log('清除成功')}, () => {console.log('清楚失败')})
  });

if (process.argv.length === 2) {
  void api.show()
}

program.parse(process.argv);
