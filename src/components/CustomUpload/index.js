import { Component } from 'react';
import DefaultUpload from './DefaultUpload';

let defaultProps = {};

export default class CustomUpload extends Component {
    /**
     * 阻止更新，防止编辑器重新渲染
     * @returns {boolean}
     */
    shouldComponentUpdate(nextProps) {
        // 有值的情况下，defaultProps 有属性 = undefined 则允许更新
        if (Object.keys(defaultProps).length) {
            for(let x in defaultProps) {
                if(typeof defaultProps[x] === 'undefined') {
                    return true;
                }
            }
        }
        return false;
    }

    render() {
        const { type, uploadProps = {} } = this.props;

        defaultProps = {
            ...uploadProps,
        };

        let Upload = () => <div>上传组件类型错误</div>;

        switch (type) {
            default:
                Upload = () => <DefaultUpload {...this.props} />;
        }

        return <Upload />;
    }
}