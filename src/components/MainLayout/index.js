import { PureComponent, Fragment } from 'react';
import router from 'umi/router';
import { Layout, Icon, BackTop, Spin } from 'antd';
import { enquireScreen } from 'enquire-js';
import { connect } from 'dva';
import SiderMenu from '../SiderMenu';
import GlobalHeader from '../GlobalHeader';
import GlobalFooter from '../GlobalFooter';
import { getMenuData } from '../../common/menu';

const { Header, Content, Footer } = Layout;


let isMobile;
enquireScreen((b) => {
    isMobile = b;
});

@connect((state) => {
    return {
        collapsed: state.global.collapsed,
        currentUser: state.global.currentUser,
        loginStatus: state.global.loginStatus,
    }
})
export default class MainLayout extends PureComponent {
    state = {
        isMobile,
    };

    componentWillReceiveProps(nextProps) {
        const { loginStatus } = nextProps;
        if(!loginStatus) {
            let query = {};
            if(this.props.location.pathname !== '/') {
                query.redirectURL = encodeURIComponent(window.location.href);
            }
            router.push({
                pathname: '/login',
                query,
            });
        }
    }

    componentDidMount() {
        enquireScreen((mobile) => {
            this.setState({
                isMobile: mobile,
            });
        });

        const { loginStatus } = this.props;

        if(typeof loginStatus === 'undefined') {
            this.props.dispatch({
                type: 'global/fetchCurrentUser',
            });
        }
    }

    handleMenuCollapse = (collapsed) => {
        this.props.dispatch({
            type: 'global/changeCollapsed__',
            payload: collapsed,
        });
    }

    render() {
        const { children, collapsed, location, loginStatus, currentUser, logo } = this.props;

        if(typeof loginStatus === 'undefined') {
            return <Spin size="large" className="globalSpin" tip="资源加载中..." />
        }

        return (
            <Layout>
                <BackTop />
                <SiderMenu
                    isMobile={this.state.isMobile}
                    location={location}
                    collapsed={collapsed}
                    logo={logo}
                    menuData={getMenuData()}
                    onCollapse={this.handleMenuCollapse}
                />
                <Layout style={{ minHeight: '100%' }}>
                    <Header style={{ padding: 0 }}>
                        <GlobalHeader
                            collapsed={collapsed}
                            isMobile={this.state.isMobile}
                            onCollapse={this.handleMenuCollapse}
                            logo={logo}
                            currentUser={currentUser}
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
        )
    };
};