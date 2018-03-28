import { Component } from 'react';
import LzEditor from './LzEditor';

let defaultProps = {};

export default class CustomEditor extends Component {
    /**
     * 阻止更新，防止编辑器重新渲染
     * @returns {boolean}
     */
    shouldComponentUpdate() {
        // 如果没有传值，则忽略
        if (!Object.keys(defaultProps).length) {
            for(let x of defaultProps) {
                if(!defaultProps[x]) {
                    return true;
                }
            }
        }
        return false;
    }

    componentDidMount() {
        const { editProps } = this.props;

        defaultProps = {
            ...editProps,
        };
    }

    render() {
        const { type, editProps } = this.props;

        if(!Object.keys(defaultProps).length) {
            defaultProps = editProps;
        }

        let EditorDom = () => <div>编辑器类型错误</div>;

        switch (type) {
            case 'lz-editor':
                EditorDom = () => <LzEditor editProps={editProps} />;
                break;
            default:
        }

        return <EditorDom/>;
    }
}