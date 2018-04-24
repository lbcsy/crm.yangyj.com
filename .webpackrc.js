import fs from 'fs';
import { resolve } from 'path';
const childProcess = require('child_process');

const __BUILD_ENV__ = process.env.BUILD_ENV || 'development';

// 环境
const __DEV__ = (__BUILD_ENV__ === 'development');
const __TEST__ = (__BUILD_ENV__ === 'test');
const __PROD__ = (__BUILD_ENV__ === 'production');

// 分支
const __BRANCH__ = childProcess.execSync("git branch | grep \\* | cut -d ' ' -f2").toString().trim();

// 时间
const __DATETIME__ = new Date().toLocaleString();

// 分支
let alias = {}
fs.readdirSync(resolve(__dirname, 'src')).forEach((item) => {
   alias[item] = resolve(__dirname, `src/${item}`);
});

export default {
    alias,
    define: {
        __DEV__,
        __TEST__,
        __PROD__,
        __BRANCH__,
        __DATETIME__,
        __BUILD_ENV__,
    },
};