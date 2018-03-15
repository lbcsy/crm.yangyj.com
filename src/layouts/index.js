import { PureComponent, Fragment } from 'react';
import withRouter from 'umi/withRouter';
import { LocaleProvider, Layout, Icon, BackTop } from 'antd';
import { enquireScreen } from 'enquire-js';
import { ContainerQuery } from 'react-container-query';
import { connect } from 'dva';
import classNames from 'classnames';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import SiderMenu from '../components/SiderMenu';
import GlobalHeader from '../components/GlobalHeader';
import GlobalFooter from '../components/GlobalFooter';
import { getMenuData } from '../common/menu';


const { Header, Content, Footer } = Layout;

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


let isMobile;
enquireScreen((b) => {
    isMobile = b;
});

@withRouter
@connect((state) => {
    return {
        collapsed: state.global.collapsed,
    }
})
export default class index extends PureComponent {
    state = {
        isMobile,
    };
    componentDidMount() {
        enquireScreen((mobile) => {
            this.setState({
                isMobile: mobile,
            });
        });
    }

    handleMenuCollapse = (collapsed) => {
        this.props.dispatch({
            type: 'global/changeLayoutCollapsed',
            payload: collapsed,
        });
    }
    render() {
        const { children, collapsed, location } = this.props;
        const layout = (
            <LocaleProvider locale={zhCN}>
                <Layout>
                    {
                        /**
                         * 返回顶部
                         */
                    }
                    <BackTop />
                    <SiderMenu
                        isMobile={this.state.isMobile}
                        location={location}
                        collapsed={collapsed}
                        menuData={getMenuData()}
                        onCollapse={this.handleMenuCollapse}
                    />
                    <Layout style={{ minHeight: '100%' }}>
                        <Header style={{ padding: 0 }}>
                            <GlobalHeader
                                collapsed={collapsed}
                                isMobile={this.state.isMobile}
                                onCollapse={this.handleMenuCollapse}
                            />
                        </Header>
                        <Content style={{ margin: '24px 24px 0' }}>
                            {children}
                        </Content>
                        <Footer>
                            <GlobalFooter
                                links={[{
                                    key: 'Umi 首页',
                                    title: 'Umi 首页',
                                    href: 'http://umijs.org',
                                    blankTarget: true,
                                }, {
                                    key: 'github',
                                    title: <Icon type="github" />,
                                    href: 'https://github.com/umijs/umi',
                                    blankTarget: true,
                                }, {
                                    key: 'Ant Design',
                                    title: 'Ant Design',
                                    href: 'http://ant.design',
                                    blankTarget: true,
                                }]}
                                copyright={
                                    <Fragment>
                                        Copyright <Icon type="copyright" /> 2018 杨圆建 React 案例
                                    </Fragment>
                                }
                            />
                        </Footer>
                    </Layout>
                </Layout>
            </LocaleProvider>
        );

        return (
            <ContainerQuery query={query}>
                {params => <div className={classNames(params)}>{layout}</div>}
            </ContainerQuery>
        );
    }
};