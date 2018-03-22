import { PureComponent } from 'react';
import { Card, Form, Input, Button } from 'antd';
import CustomUpload from "components/CustomUpload";

const FormItem = Form.Item;
const { TextArea } = Input;

export default class FormLayoutDemo extends PureComponent {
    render() {
        return (
            <Card bordered={false}>
                <Form>
                    <FormItem
                        label="标题"
                    >
                        <Input placeholder="文章标题" />
                    </FormItem>
                    <FormItem
                        label="缩略图"
                    >
                        <CustomUpload />
                    </FormItem>
                    <FormItem
                        label="摘要"
                    >
                        <TextArea placeholder="简要描述" />
                    </FormItem>
                    <FormItem
                        label="正文"
                    >
                        <TextArea placeholder="考虑采用 react-lzc-editor 实现" />
                    </FormItem>
                    <FormItem>
                        <Button type="primary">Submit</Button>
                    </FormItem>
                </Form>
            </Card>
        );
    }
}