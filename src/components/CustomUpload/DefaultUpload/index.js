import { PureComponent } from 'react';
import { Upload, message, Button, Icon, Modal } from 'antd';
import autobind from 'autobind';
import API from 'common/api';
import CONFIG from 'common/config';
import storage from 'utils/storage';

@autobind
export default class DefaultUpload extends PureComponent
{
    state = {
        previewUrl: '',
        visible: false,
        fileList: [],
    };

    handlePreview(file) {
        this.setState({
            previewUrl: file.url,
            visible: true,
        });
    }

    handleCancelPreview() {
        this.setState({
            visible: false,
        });
    }

    handleChange(info) {
        const { uploadProps = {} } = this.props;
        const { status, response } = info.file;
        const { onChangeCb = (info) => {console.log('默认上传回调',  info)}} = uploadProps;

        if (status === 'error') {
            message.error(response.msg || `上传失败`);
        }
        if (status === 'done') {
            if(!response.status) {
                message.error(response.msg || '上传失败');
            } else {
                message.success(response.msg || `上传成功`);
            }
        }

        let fileList = info.fileList.filter((file) => {
            const { status, response } = file;

            if(status === 'error') {
                return false;
            }
            if(status === 'done') {
                if(!response.status) {
                    return false;
                }
            }
            return true;
        });
        fileList = fileList.map((file) => {
            const { status, response = {} } = file;
            let newFile = {
                ...file,
            };
            if(status === 'done') {
                newFile = {
                    ...newFile,
                    ...response.data
                };
            }
            return newFile;
        });

        this.setState({
            fileList,
        });

        onChangeCb({
            ...info,
            fileList,
        });
    }

    componentWillMount() {
        const { uploadProps } = this.props;
        if(uploadProps.defaultFileList) {
            this.setState({
                fileList: uploadProps.defaultFileList,
            });
        }
    }

    render() {
        const { uploadProps } = this.props;

        let defaultProps = {
            name: 'file',
            action: `${CONFIG.BASE_URL}${API.UPLOAD}`,
            headers: {},
            onChange: this.handleChange,
            onPreview: this.handlePreview,
            ...uploadProps,
        };

        if(this.state.fileList) {
            defaultProps.fileList = this.state.fileList;
        }

        const apiToken = storage.get('api_token');
        if(apiToken) {
            defaultProps.headers.Authorization = `Bearer ${apiToken}`;
        }

        return (
            <div>
                <Upload {...defaultProps}>
                    {
                        defaultProps.render
                            ? defaultProps.render(this.state.fileList)
                            :
                                <Button>
                                    <Icon type="upload" /> 上传
                                </Button>
                    }
                </Upload>
                <Modal
                    visible={this.state.visible}
                    onCancel={this.handleCancelPreview}
                    footer={null}
                >
                    <p>{this.state.previewUrl ? <img alt="预览图片" src={this.state.previewUrl} width="100%" /> : '缺少预览地址'}</p>
                </Modal>
            </div>
        )
    }
}