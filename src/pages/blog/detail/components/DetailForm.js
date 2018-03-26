import { PureComponent } from 'react';
import { Card, Form, Input, Button } from 'antd';
import router from 'umi/router';
import CustomUpload from "components/CustomUpload";
import CustomEditor from "components/CustomEditor";
import QuickToolbar from "components/QuickToolbar";

const FormItem = Form.Item;
const { TextArea } = Input;

export default class FormLayoutDemo extends PureComponent {
    render() {
        const { action } = this.props;
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
                        <QuickToolbar>
                            <Button type="default" onClick={() => router.goBack()}>返回</Button>
                            {action && <Button type="primary">{action === 'add' ? '添加' : '保存'}</Button>}
                        </QuickToolbar>
                    </FormItem>
                </Form>
            </Card>
        );
    }
}