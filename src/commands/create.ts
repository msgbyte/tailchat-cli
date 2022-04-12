import { CommandModule } from 'yargs';
import nodePlop from 'node-plop';
import path from 'path';
import inquirer from 'inquirer';

const plop = nodePlop(path.resolve(__dirname, '../../templates/plopfile.js'));

export const createCommand: CommandModule = {
  command: 'create [template]',
  describe: '创建 Tailchat 项目代码',
  builder: (yargs) =>
    yargs.positional('template', {
      demandOption: true,
      description: '代码模板名',
      type: 'string',
      choices: plop.getGeneratorList().map((v) => v.name),
    }),
  async handler(args) {
    let template = String(args.template);

    if (!template) {
      const res = await inquirer.prompt([
        {
          type: 'list',
          name: 'template',
          message: '选择代码模板',
          choices: plop.getGeneratorList().map((v) => ({
            name: `${v.name} (${v.description})`,
            value: v.name,
          })),
        },
      ]);
      template = String(res.template);
    }

    const basic = plop.getGenerator(template);

    const answers = await basic.runPrompts();
    const results = await basic.runActions(answers);
    console.log('results', results);
  },
};
