import yargs from 'yargs';
import { createCommand } from './commands/create';

yargs
  .demandCommand()
  .command(createCommand)
  .alias('h', 'help')
  .scriptName('tailchat')
  .parse();
