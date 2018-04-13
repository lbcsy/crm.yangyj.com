import { PureComponent } from 'react';
import { Upload, message, Button, Icon } from 'antd';
import autobind from 'autobind';
import API from 'common/api';
import CONFIG from 'common/config';
import storage from 'utils/storage';

@autobind
export default class DefaultUpload extends PureComponent
{
    state = {
        fileList: [],
    };

    handleChange(info) {
        if (info.file.status === 'done') {
            if(info.file.response.code !== 0) {
                message.error(`上传失败`);
            } else {
                message.success(`上传成功`);
            }
        }
        if (info.file.status === 'error') {
            message.error(`上传失败`);
        }

        let fileList = info.fileList.filter((file) => {
            const { status, response } = file;

            if(status === 'error') {
                return false;
            }
            if(status === 'done' && response.code !== 0) {
                return false;
            }
            return true;
        });

        fileList = fileList.map((file) => {
            let newFile = {
                ...file,
            };
            if(file.status === 'done') {
                newFile = {
                    ...file,
                    ...file.response.data,
                };
            }
            return newFile;
        });

        this.setState({
            fileList,
        });

        const newInfo = {
            ...info,
            fileList,
        };

        const { callback } = this.props.uploadProps;

        if(callback) {
            callback(newInfo);
        }
    }

    render() {
        const { uploadProps } = this.props;

        let newUploadProps = {
            name: 'file',
            action: `${CONFIG.BASE_URL}${API.UPLOAD}`,
            headers: {},
            fileList: this.state.fileList,
            onChange: this.handleChange,
            ...uploadProps,
        };

        const apiToken = storage.get('api_token');
        if(apiToken) {
            newUploadProps.headers.Authorization = `Bearer ${apiToken}`;
        }

        return (
            <Upload {...newUploadProps}>
                {
                    newUploadProps.renderChildren
                        ? newUploadProps.renderChildren(this.state.fileList)
                        :
                            <Button>
                                <Icon type="upload" /> 上传
                            </Button>
                }

            </Upload>
        )
    }
}