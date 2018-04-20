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

export default {
    alias: {
        src: resolve(__dirname, 'src'),
        assets: resolve(__dirname, 'src/assets'),
        common: resolve(__dirname, 'src/common'),
        components: resolve(__dirname, 'src/components'),
        layouts: resolve(__dirname, 'src/layouts'),
        models: resolve(__dirname, 'src/models'),
        pages: resolve(__dirname, 'src/pages'),
        plugins: resolve(__dirname, 'src/plugins'),
        services: resolve(__dirname, 'src/services'),
        utils: resolve(__dirname, 'src/utils'),
    },
    define: {
        __DEV__,
        __TEST__,
        __PROD__,
        __BRANCH__,
        __DATETIME__,
        __BUILD_ENV__,
    }
};