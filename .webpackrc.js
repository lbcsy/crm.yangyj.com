import { resolve } from 'path';

export default {
    alias: {
        src: resolve(__dirname, 'src'),
        common: resolve(__dirname, 'src/common'),
        components: resolve(__dirname, 'src/components'),
        layouts: resolve(__dirname, 'src/layouts'),
        models: resolve(__dirname, 'src/models'),
        pages: resolve(__dirname, 'src/pages'),
        plugins: resolve(__dirname, 'src/plugins'),
        services: resolve(__dirname, 'src/services'),
        utils: resolve(__dirname, 'src/utils'),
    }
};