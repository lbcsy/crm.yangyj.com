import { PureComponent, Fragment } from 'react';
import { Icon, Form, Input, Button } from 'antd';
import autobind from 'autobind';
import { connect } from 'dva';
import GlobalFooter from '../../components/GlobalFooter';
import styles from './index.less';
import logo from '../../assets/logo.svg';

const FormItem = Form.Item;

@connect()
@Form.create()
@autobind
export default class LoginLayout extends PureComponent {

    handleSubmit = (e) => {
        e.preventDefault();

        const { dispatch } = this.props;

        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                dispatch({ type: 'global/fetchLogin' });
            }
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;

        return (
            <div className={styles.container}>
                <div className={styles.content}>
                    <div className={styles.header}>
                        <img alt="logo" className={styles.logo} src={logo} />
                        <span className={styles.title}>五米后台管理系统</span>
                    </div>
                    <div className={styles.login}>
                        <Form onSubmit={this.handleSubmit}>
                            <FormItem>
                                {getFieldDecorator('username', {
                                    rules: [{ required: true, message: '请输入您的账号' }],
                                })(
                                    <Input size="large" prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="账号" />
                                )}
                            </FormItem>
                            <FormItem>
                                {getFieldDecorator('password', {
                                    rules: [{ required: true, message: '请输入您的密码' }],
                                })(
                                    <Input size="large" prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" />
                                )}
                            </FormItem>
                            <FormItem>
                                <Button size="large" type="primary" htmlType="submit" className={styles.submit}>
                                    立 即 登 录
                                </Button>
                            </FormItem>
                        </Form>
                    </div>
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
                        <Fragment>
                            Copyright <Icon type="copyright" /> 2018 杨圆建 五米后台管理系统
                            <br />
                            本系统采用 umi + antd，借鉴 ant-design-pro
                            <br />
                            @致谢 <a href="http://github.com/sorrycc">sorrycc</a> 大神
                        </Fragment>
                    }
                />
            </div>
        );
    }
}