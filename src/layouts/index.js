import { PureComponent } from 'react';
import withRouter from 'umi/withRouter';
import { LocaleProvider } from 'antd';
import { ContainerQuery } from 'react-container-query';
import classNames from 'classnames';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import MainLayout from '../components/MainLayout';
import LoginLayout from '../components/LoginLayout';



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
export default class Layout extends PureComponent {
    render() {
        const { location } = this.props;

        return (
            <ContainerQuery query={query}>
                {params => (
                    <div className={classNames(params)}>
                        <LocaleProvider locale={zhCN}>
                            <div>
                                {location.pathname === '/login' ? <LoginLayout {...this.props} /> : <MainLayout {...this.props} />}
                            </div>
                        </LocaleProvider>
                    </div>
                )}
            </ContainerQuery>
        );
    }
};