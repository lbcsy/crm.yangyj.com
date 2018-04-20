import { Component } from 'react';
import DefaultUpload from './DefaultUpload';

export default class CustomUpload extends Component {
    /**
     * 阻止更新，防止编辑器重新渲染
     * @returns {boolean}
     */
    shouldComponentUpdate() {
        const { uploadProps = {} } = this.props;

        // 有值的情况下，defaultProps 有属性 = undefined 则允许更新
        if (Object.keys(uploadProps).length) {
            for(let x in uploadProps) {
                if(typeof uploadProps[x] === 'undefined') {
                    return true;
                }
            }
        }
        return false;
    }

    render() {
        const { type, uploadProps = {} } = this.props;

        let Upload = () => <div>上传组件类型错误</div>;

        switch (type) {
            default:
                Upload = () => <DefaultUpload uploadProps={uploadProps} />;
        }

        return <Upload />;
    }
}