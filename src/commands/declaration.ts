import inquirer from 'inquirer';
import { CommandModule } from 'yargs';
import fs, { mkdirp } from 'fs-extra';
import path from 'path';
import ora from 'ora';
import got from 'got';

export const declarationCommand: CommandModule = {
  command: 'declaration [source]',
  describe: 'Tailchat 插件类型声明',
  builder: (yargs) =>
    yargs.positional('source', {
      demandOption: true,
      description: '声明类型来源',
      type: 'string',
      choices: ['empty', 'github'],
    }),
  async handler(args) {
    let source = String(args.source);

    if (!source) {
      const res = await inquirer.prompt([
        {
          type: 'list',
          name: 'source',
          message: '选择类型来源',
          choices: [
            {
              name: '空',
              value: 'empty',
            },
            {
              name: '从 Github 下载完整声明',
              value: 'github',
            },
          ],
        },
      ]);
      source = String(res.source);
    }

    let content = '';
    if (source === 'empty') {
      content =
        "declare module '@capital/common';\ndeclare module '@capital/component';\n";
    } else if (source === 'github') {
      const spinner = ora('正在从 Github 下载插件类型声明');
      const url =
        'https://raw.githubusercontent.com/msgbyte/tailchat/master/web/tailchat.d.ts';
      try {
        spinner.start();

        content = await got.get(url).then((res) => res.body);

        spinner.succeed('声明文件下载完毕');
      } catch (e) {
        spinner.fail(
          `声明下载失败, 可以直接通过浏览器访问最新类型定义: ${url}`
        );
        console.error(e);
        return;
      }
    } else {
      console.warn('未知的数据来源');
      return;
    }

    if (content !== '') {
      const target = path.resolve(process.cwd(), './types/tailchat.d.ts');
      await mkdirp(path.dirname(target));
      await fs.writeFile(target, content);
      console.log('写入类型文件完毕:', target);
    }
  },
};
