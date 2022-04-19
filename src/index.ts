import yargs from 'yargs';
import { connectCommand } from './commands/connect';
import { createCommand } from './commands/create';

yargs
  .demandCommand()
  .command(createCommand)
  .command(connectCommand)
  .alias('h', 'help')
  .scriptName('tailchat')
  .parse();
