const fs = require('fs');
const ci = require('miniprogram-ci');
const { appid } = require('./project.config.json');
const { ENV, MAJOR_VERSION, ADORN_VERSION } = require('./src/config/env.cjs');

// =============================================================================
// 计算版本
// =============================================================================

const specifiedEnv = process.argv[2] || 'DEV';
const specifiedMajorVersion = process.argv[3];
const specifiedAdornVersion = process.argv[4];

const buildFullVersion = (env, major, adorn) => `${env}-${major}-${adorn}`;

console.log(
  '\x1b[36m%s\x1b[0m',
  `Original Version: ${buildFullVersion(ENV, MAJOR_VERSION, ADORN_VERSION)}`
);

const nextEnv = (() => {
  if (!specifiedEnv) return ENV;

  if (['DEV', 'd', '1'].includes(specifiedEnv)) {
    return 'DEV';
  } else if (['STAGING', 's', '2'].includes(specifiedEnv)) {
    return 'STAGING';
  } else if (['PROD', 'p', '3'].includes(specifiedEnv)) {
    return 'PROD';
  } else {
    throw 'ERROR ENV!';
  }
})();
const nextMajorVersion = specifiedMajorVersion ? specifiedMajorVersion : MAJOR_VERSION;
const nextAdornVersion = (() => {
  // 如果是生产环境，则此版本号永远为 0
  if (nextEnv === 'PROD') {
    return 0;
  }
  // 判断主版本和环境是否变化，如果变化，则重置为 1
  else if (nextMajorVersion !== MAJOR_VERSION || nextEnv !== ENV) {
    return 1;
  }
  // 主版本无变化，版本号默认 + 1
  else {
    return specifiedAdornVersion ? specifiedAdornVersion : +ADORN_VERSION + 1;
  }
})();

const nextFullVersion = buildFullVersion(nextEnv, nextMajorVersion, nextAdornVersion);
console.log('\x1b[36m%s\x1b[0m', `Next Version: ${nextFullVersion}\n`);

// =============================================================================
// 生成环境变量的配置文件
// =============================================================================

console.log('\x1b[36m%s\x1b[0m', `Generating the env configuration file...`);

fs.writeFileSync(
  './src/config/env.cjs',
  `module.exports = {
  ENV: '${nextEnv}',
  MAJOR_VERSION: '${nextMajorVersion}',
  ADORN_VERSION: '${nextAdornVersion}'
};\n`
);

fs.writeFileSync(
  'src/config/env.js',
  `export const ENV = '${nextEnv}';
export const MAJOR_VERSION = '${nextMajorVersion}';
export const ADORN_VERSION = '${nextAdornVersion}';\n`
);

console.log('\x1b[32m%s\x1b[0m', `Configuration file generated!\n`);

// =============================================================================
// 上传
// =============================================================================

console.log('\x1b[36m%s\x1b[0m', `Ready to upload...`);

const project = new ci.Project({
  appid,
  type: 'miniProgram',
  projectPath: './src',
  privateKeyPath: './mp-upload.private.key',
  ignores: ['**/*.d.ts', '**/*.md']
});

(async () => {
  await ci.upload({
    project,
    version: nextFullVersion,
    desc: `Uploaded at ${new Date().toLocaleString()}`,
    setting: {
      es6: true,
      es7: true,
      minify: true,
      autoPrefixWXSS: true
    },
    onProgressUpdate() {}
  });

  console.log('\x1b[32m%s\x1b[0m', `Uploaded! New version is: ${nextFullVersion}`);

  process.exit();
})();
