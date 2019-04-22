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
  },
  async completed() {},
};
