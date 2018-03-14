import { PureComponent } from 'react';
import { connect } from 'dva';
import router from 'umi/router';

@connect()
export default class index extends PureComponent {
    render() {
        router.push('/blog/list');
        return null;
    };
}