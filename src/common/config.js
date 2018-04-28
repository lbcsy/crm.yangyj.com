const CONFIG = {
  BASE_URL: '',
};

if (__DEV__) {
  CONFIG.BASE_URL = 'http://dev.yangyj.com'
  // CONFIG.BASE_URL = 'https://test.yangyj.com';
}
if (__TEST__) {
  CONFIG.BASE_URL = 'https://test.yangyj.com';
}
if (__PROD__) {
  CONFIG.BASE_URL = 'https://www.yangyj.com';
}

export default CONFIG;