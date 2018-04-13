import { Component } from 'react';
import BraftEditor from './BraftEditor';

let defaultProps = {};

export default class CustomEditor extends Component {
    /**
     * 阻止更新，防止编辑器重新渲染
     * @returns {boolean}
     */
    shouldComponentUpdate() {
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
        const { type, editorProps } = this.props;

        defaultProps = {
            ...editorProps,
        };

        if(!Object.keys(defaultProps).length) {
            defaultProps = editorProps;
        }

        let EditorDom = () => <div>编辑器类型错误</div>;

        switch (type) {
            case 'braft-editor':
                EditorDom = () => <BraftEditor editorProps={editorProps} />;
                break;
            default:
        }

        return <EditorDom/>;
    }
}