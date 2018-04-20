import { Component } from 'react';
import BraftEditor from './BraftEditor';

export default class CustomEditor extends Component {
    /**
     * 阻止更新，防止编辑器重新渲染
     * @returns {boolean}
     */
    shouldComponentUpdate() {
        const { editorProps = {} } = this.props;

        // 有值的情况下，defaultProps 有属性 = undefined 则允许更新
        if (Object.keys(editorProps).length) {
            for(let x in editorProps) {
                if(typeof editorProps[x] === 'undefined') {
                    return true;
                }
            }
        }
        return false;
    }

    render() {
        const { type, editorProps = {} } = this.props;

        let EditorDom = () => <div>编辑器类型错误</div>;

        switch (type) {
            default:
                EditorDom = () => <BraftEditor editorProps={editorProps} />;
        }

        return <EditorDom/>;
    }
}