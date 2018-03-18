import { PureComponent } from 'react';
import { Form, Input, Button, Upload, Icon } from 'antd';

const FormItem = Form.Item;
const { TextArea } = Input;

export default class FormLayoutDemo extends PureComponent {
    render() {
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 3 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 19 },
            },
        };
        const buttonItemLayout = {
            wrapperCol: { span: 14, offset: 4 },
        };
        return (
            <div>
                <Form layout="horizontal">
                    <FormItem
                        label="标题"
                        {...formItemLayout}
                    >
                        <Input placeholder="文章标题" />
                    </FormItem>
                    <FormItem
                        label="缩略图"
                        {...formItemLayout}
                    >
                        <Upload
                            name="avatar"
                            action="//jsonplaceholder.typicode.com/posts/"
                        >
                            <Button>
                                <Icon type="plus" /> 上传
                            </Button>
                        </Upload>
                    </FormItem>
                    <FormItem
                        label="摘要"
                        {...formItemLayout}
                    >
                        <TextArea placeholder="简要描述" />
                    </FormItem>
                    <FormItem
                        label="正文"
                        {...formItemLayout}
                    >
                        <TextArea placeholder="考虑采用 react-lzc-editor 实现" />
                    </FormItem>
                    <FormItem {...buttonItemLayout}>
                        <Button type="primary">Submit</Button>
                    </FormItem>
                </Form>
            </div>
        );
    }
}