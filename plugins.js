import { resolve } from 'path';

export default api => {
    api.register('modifyAFWebpackOpts', ({ memo }) => {
        memo.alias['umi-fastclick'] = resolve(__dirname, 'helper');

        return memo;
    });
}