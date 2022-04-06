const path = require('path');

module.exports = function (
  /** @type {import('plop').NodePlopAPI} */
  plop
) {
  // 服务端插件的前端模板代码
  plop.setGenerator('server-plugin-web', {
    description: 'this is a skeleton plopfile',
    prompts: [
      {
        type: 'input',
        name: 'name',
        require: true,
        message: '插件名称',
      },
      {
        type: 'input',
        name: 'id',
        require: true,
        default: 'com.msgbyte.example',
        message: '插件唯一id, 以反域名格式的唯一字符串',
      },
      {
        type: 'input',
        name: 'author',
        message: '插件作者',
        default: 'anonymous',
      },
      {
        type: 'input',
        name: 'desc',
        message: '插件描述',
        default: '',
      },
    ],
    actions: [
      {
        type: 'addMany',
        destination: path.resolve(process.cwd(), './plugins'),
        base: './server-plugin-web',
        templateFiles: './server-plugin-web/**/*',
        globOptions: {},
      },
    ],
  });
};
