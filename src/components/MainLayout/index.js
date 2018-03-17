import { PureComponent } from 'react';
import { Layout, Icon, BackTop, Spin } from 'antd';
import { enquireScreen } from 'enquire-js';
import autobind from 'autobind';
import { connect } from 'dva';
import SiderMenu from 'components/SiderMenu';
import GlobalHeader from 'components/GlobalHeader';
import GlobalFooter from 'components/GlobalFooter';
import { getMenuData } from 'common/menu';

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
@autobind
export default class MainLayout extends PureComponent {
    state = {
        isMobile,
    };

    componentDidMount() {
        enquireScreen((mobile) => {
            this.setState({
                isMobile: mobile,
            });
        });

        this.props.dispatch({
            type: 'global/fetchCurrentUser',
        });
    }

    handleMenuCollapse(collapsed) {
        this.props.dispatch({
            type: 'global/changeCollapsed__',
            payload: collapsed,
        });
    }

    handleMenuClick = ({ key }) => {
        if (key === 'editPassword') {
            // todo: 修改密码 Model
            return;
        }
        if (key === 'logout') {
            this.props.dispatch({
                type: 'global/fetchLogout',
            });
        }
    }

    render() {
        const { children, collapsed, location, loginStatus, currentUser, logo } = this.props;

        // 未登录状态
        if(typeof loginStatus === 'undefined') {
            return <Spin size="large" className="globalSpin" tip="Loading..." />
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
                            onMenuClick={this.handleMenuClick}
                        />
                    </Header>
                    <Content style={{ margin: '24px 24px 0' }}>
                        {children}
                    </Content>
                    <Footer>
                        <GlobalFooter
                            links={[{
                                key: 'UMI',
                                title: 'UMI',
                                href: 'http://umijs.org',
                                blankTarget: true,
                            },{
                                key: 'Dva',
                                title: 'Dva',
                                href: 'http://github.com/dvajs/dva',
                                blankTarget: true,
                            }, {
                                key: 'Github',
                                title: <Icon type="github" />,
                                href: 'https://github.com/smithyj/oa.yangyj.com',
                                blankTarget: true,
                            },  {
                                key: 'Ant Design',
                                title: 'Ant Design',
                                href: 'http://ant.design',
                                blankTarget: true,
                            }, {
                                key: 'Ant Design Pro',
                                title: 'Ant Design Pro',
                                href: 'http://pro.ant.design',
                                blankTarget: true,
                            }]}
                            copyright={
                                <div>
                                    Copyright <Icon type="copyright" /> 2018 杨圆建 五米后台管理系统
                                    <br />
                                    本系统采用 umi + antd，借鉴 ant-design-pro
                                    <br />
                                    @致谢 <a href="http://github.com/sorrycc">sorrycc</a> 大神
                                </div>
                            }
                        />
                    </Footer>
                </Layout>
            </Layout>
        )
    };
};