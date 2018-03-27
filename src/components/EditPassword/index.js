import { PureComponent } from 'react';
import { Modal, Form, Input, Button } from 'antd';
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
                    type: 'global/editPassword',
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
                style={{ maxWidth: '320px', width: '100%', top: 10 }}
                visible={visible}
                onCancel={this.handleCancel}
                onOk={this.handleOk}
                footer={[
                    <Button key="back" size="large" onClick={this.handleCancel}>取消</Button>,
                    <Button key="submit" type="primary" size="large" loading={confirmLoading} onClick={this.handleOk}>确认</Button>,
                ]}
            >
                <Form>
                    <FormItem
                        label="旧密码"
                    >
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: '请输入您的旧密码' }],
                        })(
                            <Input size="large" type="password" placeholder="请输入您的旧密码" />
                        )}
                    </FormItem>
                    <FormItem
                        label="新的密码"
                    >
                        {getFieldDecorator('newPassword', {
                            rules: [{ required: true, message: '请输入您的新密码' }],
                        })(
                            <Input size="large" type="password" placeholder="请输入您的新密码" />
                        )}
                    </FormItem>
                    <FormItem
                        label="确认密码"
                    >
                        {getFieldDecorator('confirmNewPassword', {
                            rules: [{ required: true, message: '请确认您的新密码' }],
                        })(
                            <Input size="large" type="password" placeholder="请确认您的新密码" />
                        )}
                    </FormItem>
                </Form>
            </Modal>
        );
    }
}
