import {
  Button,
  Card,
  Form,
  Icon,
  Input,
  message,
  Modal,
  Popconfirm,
} from 'antd';
import Breadcrumbs from 'components/Breadcrumbs';
import CustomUpload from 'components/CustomUpload';
import CustomEditor from 'components/CustomEditor';
import QuickToolbar from 'components/QuickToolbar';
import router from 'umi/router';

let isMounted = true;

@Form.create()
@connect(({loading: {effects = {}}}) => {
  return {
    addLoading: effects['blog_article/addDetail'],
    saveLoading: effects['blog_article/saveDetail'],
    delLoading: effects['blog_article/delDetail'],
  };
})
@autobind
export default class DetailForm extends React.PureComponent {

  state = {
    previewUrl: '',
    visible: false,
  };

  componentWillMount() {
    isMounted = true;
  }

  componentWillUnmount() {
    isMounted = false;
  }

  handleAddDetail() {
    const {form, dispatch} = this.props;
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        dispatch({type: 'blog_article/addDetail', payload: values});
      }
    });
  }

  handleCancelDetail() {
    const {form: {resetFields}} = this.props;

    resetFields();
    router.goBack();
  }

  handleDelDetail() {
    const {delLoading, dispatch, initialData = {}} = this.props;
    if (delLoading) {
      return false;
    }
    dispatch({
      type: 'blog_article/delDetail',
      payload: initialData.id,
    }).then(cbData => {
      if (!cbData) {
        return false;
      }
      router.push('/blog/article');
    });
  }

  handleSaveDetail() {
    const {form, initialData, dispatch} = this.props;
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        dispatch({
          type: 'blog_article/saveDetail',
          payload: {...initialData, ...values},
        }).then(() => {
          dispatch({
            type: 'blog_article/getDetail',
            payload: initialData.id,
          });
        });
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
    const {addLoading, saveLoading, delLoading, action, form = {}, initialData = {}} = this.props;

    const {getFieldDecorator} = form;

    const breadcrumbsList = [
      {
        text: '博客管理',
      },
      {
        text: '文章列表',
        link: '/blog/article',
      },
    ];

    switch (action) {
      case 'view':
        breadcrumbsList.push({
          text: '查看文章',
        });
        break;
      case 'add':
        breadcrumbsList.push({
          text: '添加文章',
        });
        break;
      case 'edit':
        breadcrumbsList.push({
          text: '编辑文章',
        });
        break;
      default:
    }

    const formItemLayout = {
      labelCol: {
        xs: {span: 24},
        sm: {span: 4},
        md: {span: 3},
      },
      wrapperCol: {
        xs: {span: 24},
        sm: {span: 20},
        md: {span: 21},
      },
    };

    let uploadProps = {
      initialDataImage: initialData.image,
      accept: 'image/*',
      listType: 'picture-card',
      beforeUpload: (file) => {
        const mime = ['png', 'jpeg', 'jpg', 'gif'];
        if (!mime.includes(file.type.split('/')[1])) {
          message.error(`只能上传: ${mime.join(', ')} 类型文件`);
          return false;
        }
        return true;
      },
      onChangeCb: (info) => {
        if (!isMounted) {
          return false;
        }
        if (info.file.status === 'done' && info.file.response.status ===
            'success') {
          form.setFieldsValue({image: info.file.response.data.url});
        }
      },
      onRemove: () => {
        if (!isMounted) {
          return false;
        }
        form.setFieldsValue({image: ''});
      },
      renderChildren: (fileList) => {
        if (fileList.length >= 1) {
          return null;
        }
        return (
            <div>
              <Icon type="plus"/>
              <div className="ant-upload-text">上传</div>
            </div>
        );
      },
    };

    // 缩略图
    if (initialData.image) {
      uploadProps.defaultFileList = [
        {
          uid: -1,
          url: initialData.image,
          thumbUrl: initialData.image,
        },
      ];
    }

    let initialContent = '';

    if (action === 'edit') {
      initialContent = initialData.content;
    }

    const editorProps = {
      initialContent: initialContent,
      onChange: (content) => {
        if (!isMounted) {
          return false;
        }
        form.setFieldsValue({content});
      },
    };

    return (
        <div>
          <Breadcrumbs breadcrumbsList={breadcrumbsList}/>

          <Card bordered={false}>
            <Form>
              <Form.Item
                  {...formItemLayout}
                  label="标题"
              >
                {
                  getFieldDecorator('title', {
                    initialValue: initialData.title,
                    rules: [
                      {required: true, message: '请输入标题'},
                    ],
                  })(<Input disabled={action === 'view'}/>)
                }
              </Form.Item>
              <Form.Item
                  {...formItemLayout}
                  label="缩略图"
              >
                {
                  getFieldDecorator('image', {
                    initialValue: initialData.image,
                  })(
                      action === 'view'
                          ? (
                              initialData.image
                                  ? <img
                                      alt={initialData.title}
                                      src={initialData.image}
                                      width="100"
                                      onClick={() => {
                                        this.setState({
                                          visible: true,
                                          previewUrl: initialData.image,
                                        });
                                      }}
                                  />
                                  : <span>无</span>
                          )
                          : <CustomUpload uploadProps={uploadProps}/>,
                  )
                }
              </Form.Item>
              <Form.Item
                  {...formItemLayout}
                  label="简介"
              >
                {
                  getFieldDecorator('intro', {
                    initialValue: initialData.intro,
                  })(<Input.TextArea autosize={{minRows: 3, maxRows: 6}}
                                     disabled={action === 'view'}/>)
                }
              </Form.Item>
              <Form.Item
                  {...formItemLayout}
                  label="内容"
              >
                {
                  getFieldDecorator('content', {
                    initialValue: initialData.content,
                    rules: [
                      {required: true, message: '请输入内容'},
                    ],
                  })(action === 'view'
                      ? <div className="ant-input ant-input-disabled"
                             style={{height: 'auto', padding: '10px 15px'}}
                             dangerouslySetInnerHTML={{__html: initialData.content}}/>
                      : <CustomEditor editorProps={editorProps}/>)
                }
              </Form.Item>
              <QuickToolbar>
                {
                  action === 'view' &&
                  <div>
                    <Button type="default"
                            onClick={() => router.push('/blog/article')}>返回列表</Button>
                    <Button ghost
                            type="primary"
                            onClick={() => router.push(
                                `/blog/article/detail/${initialData.id}?action=edit`)}>编辑</Button>
                    <Popconfirm title="确定要删除吗？" okText="确定" cancelText="取消"
                                onConfirm={this.handleDelDetail}>
                      <Button type="danger" ghost loading={delLoading}>删除</Button>
                    </Popconfirm>
                  </div>
                }
                {
                  action === 'add' &&
                  <div>
                    <Button type="default"
                            onClick={() => router.goBack()}>取消</Button>
                    <Button type="primary" ghost onClick={this.handleAddDetail}
                            loading={addLoading}>添加</Button>
                  </div>
                }
                {
                  action === 'edit' &&
                  <div>
                    <Button type="default"
                            onClick={this.handleCancelDetail}>取消</Button>
                    <Button type="primary"
                            ghost
                            onClick={this.handleSaveDetail}
                            loading={saveLoading}>保存</Button>
                  </div>
                }
              </QuickToolbar>
            </Form>
          </Card>
          <Modal
              visible={this.state.visible}
              onCancel={this.handleCancelPreview}
              footer={null}
          >
            <div>
              {
                this.state.previewUrl
                    ? <img alt="预览图片"
                           src={this.state.previewUrl}
                           width="100%"/>
                    : ''
              }
            </div>
          </Modal>
        </div>
    );
  }
}