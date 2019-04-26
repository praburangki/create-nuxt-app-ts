const { join } = require('path');
const glob = require('glob');
const spawn = require('cross-spawn');
const validate = require('validate-npm-package-name');

const rootDir = __dirname;

module.exports = {
  prompts: [
    {
      name: 'name',
      message: 'Project name',
      default: '{outFolder}',
    },
    {
      name: 'pm',
      message: 'Choose a package manager',
      choices: ['npm', 'yarn'],
      type: 'list',
      default: 'yarn'
    }
  ],
  actions() {
    const validation = validate(this.answers.name);
    validation.warnings &&
      validation.warnings.forEach(warn => {
        console.warn('Warning:', warn);
      });
    validation.errors &&
      validation.errors.forEach(err => {
        console.error('Error:', err);
      });
    validation.errors && validation.errors.length && process.exit(1);

    const actions = [
      {
        type: 'add',
        files: '**',
        templateDir: 'template/nuxt',
      },
    ];

    actions.push({
      type: 'move',
      patterns: {
        gitignore: '.gitignore',
        '_package.json': 'package.json',
        '_.eslintrc.js': '.eslintrc.js',
      },
    });

    return actions;
  },
  async completed() {
    this.gitInit();

    await this.npmInstall({ npmClient: this.answers.pm });

    const isNewFolder = this.outDir !== process.cwd();
    const cd = () => {
      if (isNewFolder) {
        console.log(`\t${this.chalk.cyan('cd')} ${this.outFolder}`);
      }
    };

    console.log();
    console.log(this.chalk.bold(`  To get started:\n`));
    cd();
    console.log(`\t${this.answers.pm} run dev\n`);
    console.log(this.chalk.bold(`  To build & start for production:\n`));
    cd();
    console.log(`\t${this.answers.pm} run build`);
    console.log(`\t${this.answers.pm} start`);
  },
};
