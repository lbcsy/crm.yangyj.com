import { PureComponent } from 'react';
import { Card, Form, Input, Button } from 'antd';
import CustomUpload from "components/CustomUpload";
import CustomEditor from "components/CustomEditor";

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
                        <CustomEditor
                            type="lz-editor"
                            editProps={{
                                active: true,
                                cbReceiver: (content) => {
                                    console.log(content);
                                }
                            }}
                        />
                    </FormItem>
                    <FormItem>
                        <Button type="primary">Submit</Button>
                    </FormItem>
                </Form>
            </Card>
        );
    }
}