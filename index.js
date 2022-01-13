const program = require('commander');

program
  .option('-x, --xxx', 'hello xxx')
program
  .command('add')
  .description('add a task')
  .action((...args) => {
    const words = args.slice(0, -1).join(' ')
    console.log(words);
  });

program.parse(process.argv);
