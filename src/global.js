import 'url-polyfill';
import React from 'react';
import autobind from 'autobind';
import {connect} from 'dva';

// 声明全局变量
window.React = React;
window.autobind = autobind;
window.connect = connect;