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
  });
program
  .command('clear')
  .description('clear all task')
  .action(() => {
    console.log('this is clear');
  });

program.parse(process.argv);
