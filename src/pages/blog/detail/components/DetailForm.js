import { PureComponent } from 'react';
import { Card, Form, Input, Button, Popconfirm } from 'antd';
import router from 'umi/router';
import autobind from 'autobind';
import CustomUpload from "components/CustomUpload";
import CustomEditor from "components/CustomEditor";
import QuickToolbar from "components/QuickToolbar";

const FormItem = Form.Item;
const { TextArea } = Input;

const fields = ['id', 'title', 'image', 'intro', 'content'];

@Form.create({
    mapPropsToFields(props) {
        const { detail } = props;
        let newFields = {};
        fields.map(item => {
            newFields[item] = Form.createFormField({
                value: detail[item],
            });
            return false;
        });
        return newFields;
    }
})
@autobind
export default class DetailForm extends PureComponent {

    handleSaveDetail() {
        const { form, detail } = this.props;

        console.log(this.props);

        form.validateFieldsAndScroll((err, values) => {
            const params = {
                ...detail,
                ...values,
            };
            console.log(params);
        });
    }

    render() {
        const { action, detail, form } = this.props;
        const { getFieldDecorator } = form;

        return (
            <Card bordered={false}>
                <Form>
                    <FormItem
                        label="标题"
                    >
                        {getFieldDecorator('title', {
                            rules: [{ required: true, message: '请输入标题' }],
                        })(
                            <Input placeholder="文章标题" />
                        )}
                    </FormItem>
                    <FormItem
                        label="缩略图"
                    >
                        {
                            action === 'view'
                            ? <img alt={detail.title} src={detail.image || 'http://iph.href.lu/400x300?text=暂无图片'} width="200" />
                            : <CustomUpload />
                        }
                    </FormItem>
                    <FormItem
                        label="简介"
                    >
                        {getFieldDecorator('intro', {
                            rules: [{ required: true, message: '请输入简介' }],
                        })(
                            <TextArea placeholder="文章简介" />
                        )}
                    </FormItem>
                    <FormItem
                        label="正文"
                    >
                        {
                            action === 'view'
                                ? <div dangerouslySetInnerHTML={{__html: detail.content}} />
                                :
                                getFieldDecorator('content', {
                                    rules: [{ required: true, message: '正文' }],
                                })(
                                    <CustomEditor
                                        type="lz-editor"
                                        editProps={{
                                            importContent: form.getFieldValue('content'),
                                            cbReceiver: (content) => {
                                                form.setFieldsValue({
                                                    content: content
                                                });
                                            },
                                        }}
                                    />
                                )
                        }
                    </FormItem>
                    <QuickToolbar>
                        <Button type="default" onClick={() => router.goBack()}>返回</Button>
                        {
                            action === 'view' &&
                            <Button type="primary" ghost onClick={() => router.push(`/blog/detail?action=edit&id=${detail.id}`)}>编辑</Button>
                        }
                        {
                            action === 'add'  &&
                            <Button type="primary" ghost onClick={() => router.push(`/blog/detail?action=add`)}>添加</Button>
                        }
                        {
                            action === 'edit' &&
                            <Button type="primary" ghost onClick={this.handleSaveDetail}>保存</Button>
                        }
                        {
                            action === 'view'  &&
                            <Popconfirm title="确定要删除吗？" okText="确定" cancelText="取消" onConfirm={() => {
                                const { dispatch } = this.props;
                                dispatch({ type: 'blog/delDetail', payload: detail, cb: () => router.push(`/blog/list`) });
                            }}>
                                <Button type="danger" ghost>删除</Button>
                            </Popconfirm>
                        }
                    </QuickToolbar>
                </Form>
            </Card>
        );
    }
}