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

    handleAddDetail() {
        const { form, dispatch } = this.props;

        form.validateFieldsAndScroll((err, values) => {
            dispatch({ type: 'blogArticle/addDetail', payload: values });
        });
    }

    handleSaveDetail() {
        const { form, detail, dispatch } = this.props;

        form.validateFieldsAndScroll((err, values) => {
            const params = {
                ...detail,
                ...values,
            };
            dispatch({ type: 'blogArticle/updateDetail', payload: params });
        });
    }

    handleSaveContent(content) {
         this.props.form.setFieldsValue({ content: content});
    }

    render() {
        const { action, detail, form, loading } = this.props;

        const { getFieldDecorator } = form;

        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 4 },
                md: { span: 2 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 20 },
                md: { span: 22 },
            },
        };

        return (
            <Card bordered={false} loading={loading}>
                <Form>
                    <FormItem
                        {...formItemLayout}
                        label="标题"
                    >
                        {
                            action === 'view'
                                ? <p>{detail.title}</p>
                                :
                                getFieldDecorator('title', {
                                    rules: [
                                        { required: true, message: '请输入标题' },
                                    ],
                                })(
                                    <Input placeholder="请输入标题" disabled={action === 'view'} />
                                )
                        }
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="缩略图"
                    >
                        {
                            action === 'view'
                                ? <img alt={detail.title} src={detail.image || 'http://iph.href.lu/400x300?text=暂无图片'} width={detail.image ? 200 : 100} />
                                :
                                getFieldDecorator('image', {
                                    rules: [
                                        { required: true, message: '请上传图片' },
                                    ],
                                })(
                                    <CustomUpload />
                                )
                        }
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="简介"
                    >
                        {
                            action === 'view'
                                ? <p>{detail.intro}</p>
                                :
                                getFieldDecorator('intro', {
                                    rules: [
                                        { required: true, message: '请输入简介' },
                                    ],
                                })(
                                    <TextArea placeholder="请输入简介" rows={5} disabled={action === 'view'} />
                                )
                        }
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="正文"
                    >
                        {
                            action === 'view'
                                ? <div dangerouslySetInnerHTML={{__html: detail.content}} />
                                :
                                getFieldDecorator('content', {
                                    rules: [
                                        { required: true, message: '正文' },
                                    ],
                                })(
                                    <CustomEditor
                                        type="braft-editor"
                                        editorProps={{
                                            contentFormat: 'html',
                                            initialContent: detail.content,
                                            onChange: (content) => {
                                                form.setFieldsValue({ content });
                                            }
                                        }}
                                    />
                                )
                        }
                    </FormItem>
                    <QuickToolbar>
                        {
                            action === 'view' &&
                            <div>
                                <Button type="default" onClick={() => router.goBack()}>返回</Button>
                                <Button type="primary" ghost disabled>审核</Button>
                                <Button type="primary" ghost onClick={() => router.push(`/blog/article/detail/${detail.id}?action=edit`)}>编辑</Button>
                                <Popconfirm title="确定要删除吗？" okText="确定" cancelText="取消" onConfirm={() => {
                                    const { dispatch } = this.props;
                                    dispatch({ type: 'blogArticle/delDetail', payload: detail.id, cb: () => router.push('/blog/article') });
                                }}>
                                    <Button type="danger" ghost>删除</Button>
                                </Popconfirm>
                            </div>
                        }
                        {
                            action === 'add'  &&
                            <div>
                                <Button type="default" onClick={() => router.goBack()}>取消</Button>
                                <Button type="primary" ghost onClick={this.handleAddDetail}>添加</Button>
                            </div>
                        }
                        {
                            action === 'edit' &&
                            <div>
                                <Button type="default" onClick={() => router.goBack()}>取消</Button>
                                <Button type="primary" ghost onClick={this.handleSaveDetail}>保存</Button>
                            </div>
                        }
                    </QuickToolbar>
                </Form>
            </Card>
        );
    }
}