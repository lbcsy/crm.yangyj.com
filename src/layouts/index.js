import { PureComponent } from 'react';
import { connect } from 'dva';
import withRouter from 'umi/withRouter';
import { LocaleProvider } from 'antd';
import { ContainerQuery } from 'react-container-query';
import classNames from 'classnames';
import NProgress from 'nprogress'
import zhCN from 'antd/lib/locale-provider/zh_CN';
import MainLayout from 'components/MainLayout';
import LoginLayout from 'components/LoginLayout';
import logo from 'assets/logo.svg';
import moment from 'moment';
import 'moment/locale/zh-cn';

moment.locale('zh-cn');

const query = {
    'screen-xs': {
        maxWidth: 575,
    },
    'screen-sm': {
        minWidth: 576,
        maxWidth: 767,
    },
    'screen-md': {
        minWidth: 768,
        maxWidth: 991,
    },
    'screen-lg': {
        minWidth: 992,
        maxWidth: 1199,
    },
    'screen-xl': {
        minWidth: 1200,
    },
};

@withRouter
@connect(state => {
    return {
        loading: state.loading,
    }
})
export default class Layout extends PureComponent {
    render() {
        const { location, loading } = this.props;

        const newProps = {
            ...this.props,
            logo,
        };

        NProgress.start();
        if (!loading.global) {
            NProgress.done();
        }

        return (
            <ContainerQuery query={query}>
                {params => (
                    <div className={classNames(params)}>
                        <LocaleProvider locale={zhCN}>
                            <div>
                                {location.pathname === '/login' ? <LoginLayout {...newProps} /> : <MainLayout {...newProps} />}
                            </div>
                        </LocaleProvider>
                    </div>
                )}
            </ContainerQuery>
        );
    }
};