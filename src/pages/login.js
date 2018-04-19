import { PureComponent } from 'react';
import { Icon, Form, Input, Button } from 'antd';
import autobind from 'autobind';
import { connect } from 'dva';
import styles from './login.less';

const FormItem = Form.Item;

@connect(state =>  {
    return {
        loading:  state.loading.effects['global/login']
    }
})
@Form.create()
@autobind
export default class Login extends PureComponent {

    handleSubmit = (e) => {
        e.preventDefault();

        const { dispatch } = this.props;

        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                dispatch({ type: 'global/login', payload: values });
            }
        });
    };

    render() {
        const { loading, form } = this.props;
        const { getFieldDecorator } = form;

        return (
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
                        <Button loading={loading} size="large" type="primary" htmlType="submit" className={styles.submit}>
                            立 即 登 录
                        </Button>
                    </FormItem>
                </Form>
            </div>
        );
    }
}