export default {
  disableServiceWorker: true,
  disableFastClick: true,
  plugins: [
    ['umi-plugin-dva', {immer: true}],
    [
      'umi-plugin-routes', {
      // 排除相关路由
      exclude: [
        ({path, exact, component}) => /components|models|services/.test(
          component),
      ],
    }],
  ],
  loading: './src/components/Loading',
}