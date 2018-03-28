import { Component } from 'react';
import LzEditor from './LzEditor';

let validateProps = {};

export default class CustomEditor extends Component {
    shouldComponentUpdate() {
        // 如果没有传值，则允许重新渲染
        for (let x in validateProps) {
            if(typeof validateProps[x] === 'undefined') {
                return true;
            }
        }
        return false;
    }

    componentDidMount() {
        const { editProps } = this.props;

        validateProps = {
            ...editProps,
        };
    }

    render() {
        const { type, editProps } = this.props;
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