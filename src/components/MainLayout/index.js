import { PureComponent } from 'react';
import { Layout, Icon, BackTop } from 'antd';
import { enquireScreen } from 'enquire-js';
import autobind from 'autobind';
import { connect } from 'dva';
import SiderMenu from 'components/SiderMenu';
import GlobalHeader from 'components/GlobalHeader';
import GlobalFooter from 'components/GlobalFooter';
import EditPassword from 'components/EditPassword';
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
        visible: state.global.editPasswordModalVisible,
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

        const { dispatch } = this.props;

        dispatch({
            type: 'global/currentUser',
        });
    }

    handleMenuCollapse(collapsed) {
        console.log(collapsed);
        const { dispatch } = this.props;

        dispatch({
            type: 'global/changeCollapsed__',
            payload: collapsed,
        });
    }

    handleMenuClick({ key }) {
        const { dispatch } = this.props;

        if (key === 'editPassword') {
            dispatch({
                type: 'global/changeEditPasswordModalVisible__',
                payload: true,
            });
            return;
        }
        if (key === 'logout') {
            dispatch({
                type: 'global/logout',
            });
        }
    }

    render() {
        const { children, collapsed, location, loginStatus, currentUser, logo, visible } = this.props;

        // 未登录状态
        if(typeof loginStatus === 'undefined' || !loginStatus) {
            return null;
        }

        return (
            <Layout>
                { visible && <EditPassword />}
                <BackTop style={{ zIndex: 98 }} />
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
                    <Footer style={{ padding: 0 }}>
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
                                    Copyright <Icon type="copyright" /> 2018 CRM管理系统
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