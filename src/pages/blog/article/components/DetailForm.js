import { PureComponent } from 'react';
import { Card, Form, Input, Button, Popconfirm, Icon, message, Modal } from 'antd';
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
    },
    onValuesChange(props, values) {
        const { dispatch } = props;
        let data = {};
        Object.keys(values).map((item) => {
           data[item] = values[item];
           return true;
        });
        dispatch({
            type: 'blogArticle/changeDetail__',
            payload: {
                ...props.detail,
                ...data,
            }
        })
    }
})
@autobind
export default class DetailForm extends PureComponent {

    state = {
        previewUrl: '',
        visible: false,
        delStatus: false,
    };

    componentWillUnmount() {
        const { dispatch } = this.props;
        dispatch({
            type: 'blogArticle/changeDetail__',
            payload: {}
        })
    }

    handleAddDetail() {
        const { form, dispatch } = this.props;
        form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                dispatch({ type: 'blogArticle/addDetail', payload: values });
            }
        });
    }

    handleSaveDetail() {
        const { form, detail, dispatch } = this.props;
        form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                dispatch({ type: 'blogArticle/updateDetail', payload: { ...detail, ...values } });
            }
        });
    }

    handleCancelPreview() {
        this.setState({
            visible: false,
            previewUrl: '',
        });
    }

    render() {
        const { action, detail, form, loading, addLoading, saveLoading } = this.props;

        const { getFieldDecorator } = form;

        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 4 },
                md: { span: 3 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 20 },
                md: { span: 21 },
            },
        };

        let uploadProps = {
            accept: 'image/*',
            listType: 'picture-card',
            beforeUpload: (file) => {
                const mime = ['png', 'jpeg', 'jpg', 'gif'];
                if(!mime.includes(file.type.split('/')[1])) {
                    message.error(`只能上传: ${mime.join(', ')} 类型文件`);
                    return false;
                }
                return true;
            },
            onChangeCb: (info) => {
                if(info.file.status === 'done' && info.file.response.status === 'success') {
                    form.setFieldsValue({ image: info.file.response.data.url });
                }
            },
            onRemove: () => {
                form.setFieldsValue({ image: '' });
            },
            render: (fileList) => {
                if(fileList.length >= 1) {
                    return null;
                }
                return (
                    <div>
                        <Icon type="plus" />
                        <div className="ant-upload-text">上传</div>
                    </div>
                );
            }
        };
        // 缩略图
        if(form.getFieldValue('image')) {
            uploadProps.defaultFileList = [
                {
                    uid: -1,
                    url: form.getFieldValue('image'),
                    thumbUrl: form.getFieldValue('image'),
                }
            ];
        }

        const editorProps = {
            initialContent: form.getFieldValue('content'),
            onChange: (content) => {
                form.setFieldsValue({ content });
            }
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
                                ? (
                                    detail.image
                                    ? <img
                                            alt={detail.title}
                                            src={detail.image}
                                            width="100"
                                            onClick={() => {
                                                this.setState({
                                                    visible: true,
                                                    previewUrl: detail.image,
                                                });
                                            }}
                                        />
                                    : '无'
                                )
                                :
                                getFieldDecorator('image', {
                                    rules: [
                                        // { required: true, message: '请上传图片' },
                                    ],
                                })(
                                    <CustomUpload uploadProps={uploadProps} />
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
                                        // { required: true, message: '请输入简介' },
                                    ],
                                })(
                                    <TextArea placeholder="请输入简介" rows={5} disabled={action === 'view'} />
                                )
                        }
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="文章内容"
                    >
                        {
                            action === 'view'
                                ? <div dangerouslySetInnerHTML={{__html: detail.content}} />
                                :
                                getFieldDecorator('content', {
                                    rules: [
                                        { required: true, message: '请填写文章内容' },
                                    ],
                                })(
                                    <CustomEditor editorProps={editorProps} />
                                )
                        }
                    </FormItem>
                    <QuickToolbar>
                        {
                            action === 'view' &&
                            <div>
                                <Button type="default" onClick={() => router.goBack()}>返回</Button>
                                {/*<Button type="primary" ghost disabled>审核</Button>*/}
                                <Button type="primary" ghost onClick={() => router.push(`/blog/article/detail/${detail.id}?action=edit`)}>编辑</Button>
                                <Popconfirm title="确定要删除吗？" okText="确定" cancelText="取消" onConfirm={() => {
                                    if(this.state.delStatus) {
                                        return false;
                                    }
                                    this.setState({
                                        delStatus: true,
                                    });
                                    const { dispatch } = this.props;
                                    dispatch({ type: 'blogArticle/delDetail', payload: detail.id })
                                        .then(cbData => {
                                            this.setState({
                                                delStatus: false,
                                            });
                                            if(!cbData) {
                                                return false;
                                            }
                                            router.push('/blog/article')
                                        });
                                }}>
                                    <Button type="danger" ghost loading={this.state.delStatus}>删除</Button>
                                </Popconfirm>
                            </div>
                        }
                        {
                            action === 'add'  &&
                            <div>
                                <Button type="default" onClick={() => router.goBack()}>取消</Button>
                                <Button type="primary" ghost onClick={this.handleAddDetail} loading={addLoading}>添加</Button>
                            </div>
                        }
                        {
                            action === 'edit' &&
                            <div>
                                <Button type="default" onClick={() => router.goBack()}>取消</Button>
                                <Button type="primary" ghost onClick={this.handleSaveDetail} loading={saveLoading}>保存</Button>
                            </div>
                        }
                    </QuickToolbar>
                </Form>
                <Modal
                    visible={this.state.visible}
                    onCancel={this.handleCancelPreview}
                    footer={null}
                >
                    <span>{this.state.previewUrl ? <img alt="预览图片" src={this.state.previewUrl} width="100%" /> : ''}</span>
                </Modal>
            </Card>
        );
    }
}