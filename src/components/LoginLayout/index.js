import { Icon } from 'antd';
import GlobalFooter from 'components/GlobalFooter';
import styles from './index.less';

export default props => {
    const { children, logo } = props;

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <div className={styles.header}>
                    <img alt="logo" className={styles.logo} src={logo} />
                    <span className={styles.title}>Super Backend System</span>
                </div>
                {children}
            </div>
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
                        Copyright <Icon type="copyright" /> 2018 Super Backend System
                        <br />
                        本系统采用 umi + antd，借鉴 ant-design-pro
                        <br />
                        @致谢 <a href="http://github.com/sorrycc">sorrycc</a> 大神
                    </div>
                }
            />
        </div>
    );
}