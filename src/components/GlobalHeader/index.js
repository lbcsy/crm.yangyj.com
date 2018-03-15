import { PureComponent } from 'react';
import autobind from 'autobind';
import { Menu, Icon, Dropdown, Avatar, Divider } from 'antd';
import Debounce from 'lodash-decorators/debounce';
import Link from 'umi/link';
import styles from './index.less';

@autobind
export default class GlobalHeader extends PureComponent {
    componentWillUnmount() {
        this.triggerResizeEvent.cancel();
    }
    handleToggle() {
        const { collapsed, onCollapse } = this.props;
        onCollapse(!collapsed);
        this.triggerResizeEvent();
    }
    @Debounce(600)
    triggerResizeEvent() { // eslint-disable-line
        const event = document.createEvent('HTMLEvents');
        event.initEvent('resize', true, false);
        window.dispatchEvent(event);
    }
    render() {
        const { collapsed, isMobile, currentUser, logo } = this.props;
        const menu = (
            <Menu className={styles.menu}>
                <Menu.Item disabled><Icon type="user" />个人中心</Menu.Item>
                <Menu.Item disabled><Icon type="setting" />设置</Menu.Item>
                <Menu.Item key="triggerError"><Icon type="close-circle" />触发报错</Menu.Item>
                <Menu.Divider />
                <Menu.Item key="logout"><Icon type="logout" />退出登录</Menu.Item>
            </Menu>
        );
        return (
            <div className={styles.header}>
                {isMobile && (
                    [
                        (
                            <Link to="/" className={styles.logo} key="logo">
                                <img alt="logo" src={logo} width="32" />
                            </Link>
                        ),
                        <Divider type="vertical" key="line" />,
                    ]
                )}
                <Icon
                    className={styles.trigger}
                    type={collapsed ? 'menu-unfold' : 'menu-fold'}
                    onClick={this.handleToggle}
                />
                <div className={styles.right}>
                    <Dropdown overlay={menu}>
                        <span className={`${styles.action} ${styles.account}`}>
                            <Avatar size="small" className={styles.avatar} src={currentUser.avatar} />
                            <span className={styles.name}>{currentUser.name}</span>
                        </span>
                    </Dropdown>
                </div>
            </div>
        );
    }
}
