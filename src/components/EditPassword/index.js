import { PureComponent } from 'react';
import { Modal, Form, Input } from 'antd';
import { connect } from 'dva';
import autobind from 'autobind';

const FormItem = Form.Item;

@Form.create()
@connect(state => {
    return {
        visible: state.global.editPasswordModalVisible,
        confirmLoading: state.loading.effects['global/fetchEditPassword'],
    }
})
@autobind
export default class EditPassword extends PureComponent {
    handleOk() {
        const { dispatch } = this.props;

        this.props.form.validateFields((err, values) => {
            if (!err) {
                dispatch({
                    type: 'global/fetchEditPassword',
                    payload: values,
                });
            }
        });
    }
    handleCancel() {
        const { dispatch } = this.props;
        dispatch({
            type: 'global/changeEditPasswordModalVisible__',
            payload: false,
        });
    }
    render() {
        const { visible, confirmLoading } = this.props;
        const { getFieldDecorator } = this.props.form;

        return (
            <Modal
                title="修改密码"
                visible={visible}
                confirmLoading={confirmLoading}
                onCancel={this.handleCancel}
                onOk={this.handleOk}
            >
                <Form>
                    <FormItem>
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: '请输入您的旧密码' }],
                        })(
                            <Input type="password" placeholder="请输入您的旧密码" />
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('newPassword', {
                            rules: [{ required: true, message: '请输入您的新密码' }],
                        })(
                            <Input type="password" placeholder="请输入您的新密码" />
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('confirmNewPassword', {
                            rules: [{ required: true, message: '请确认您的新密码' }],
                        })(
                            <Input type="password" placeholder="请确认您的新密码" />
                        )}
                    </FormItem>
                </Form>
            </Modal>
        );
    }
}
