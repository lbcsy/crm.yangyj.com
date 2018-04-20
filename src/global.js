import 'url-polyfill';
import { connect } from 'dva';
import autobind from 'autobind';

window.connect = connect;
window.autobind = autobind;

