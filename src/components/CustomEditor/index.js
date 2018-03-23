import LzEditor from './LzEditor';

export default props => {
    let EditorDom;

    const { type, editProps = {} } = props;

    console.log(editProps);

    switch (type) {
        case 'lz-editor':
            EditorDom = () => <LzEditor editProps={editProps} />;
            break;
        default:
            EditorDom = () => <div>编辑器类型错误</div>;
    }

    return <EditorDom/>;
}