import yargs, { CommandModule } from 'yargs';
import nodePlop from 'node-plop';
import path from 'path';

export const createCommand: CommandModule = {
  command: 'create <template>',
  describe: '创建 Tailchat 项目代码',
  builder: (yargs) =>
    yargs.positional('template', {
      demandOption: true,
      description: '代码模板名',
      type: 'string',
      choices: ['server-plugin-web'],
    }),
  async handler(args) {
    const template = String(args.template);

    const plop = nodePlop(
      path.resolve(__dirname, '../../../templates/plopfile.js')
    );
    const basic = plop.getGenerator(template);

    const answers = await basic.runPrompts();
    const results = await basic.runActions(answers);
    console.log('results', results);
  },
};
