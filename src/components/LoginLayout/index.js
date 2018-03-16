import { PureComponent, Fragment } from 'react';
import Link from 'umi/link';
import { Icon, Form, Input, Checkbox, Button } from 'antd';
import autobind from 'autobind';
import GlobalFooter from '../../components/GlobalFooter';
import styles from './index.less';
import logo from '../../assets/logo.svg';

const FormItem = Form.Item;

@Form.create()
@autobind
export default class LoginLayout extends PureComponent {

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;

        return (
            <div className={styles.container}>
                <div className={styles.content}>
                    <div className={styles.top}>
                        <div className={styles.header}>
                            <Link to="/">
                                <img alt="logo" className={styles.logo} src={logo} />
                                <span className={styles.title}>五米后台管理系统</span>
                            </Link>
                        </div>
                        <div className={styles.desc}>五米后台管理系统是基于阿里大神的 UMI 工具库 以及结合 Dva & Ant Design & Ant Design Pro 开发的系统 </div>
                    </div>
                    <div className={styles.login}>
                        <Form onSubmit={this.handleSubmit}>
                            <FormItem>
                                {getFieldDecorator('userName', {
                                    rules: [{ required: true, message: 'Please input your username!' }],
                                })(
                                    <Input size="large" prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                                )}
                            </FormItem>
                            <FormItem>
                                {getFieldDecorator('password', {
                                    rules: [{ required: true, message: 'Please input your Password!' }],
                                })(
                                    <Input size="large" prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                                )}
                            </FormItem>
                            <FormItem>
                                {getFieldDecorator('remember', {
                                    valuePropName: 'checked',
                                    initialValue: true,
                                })(
                                    <Checkbox>Remember me</Checkbox>
                                )}
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