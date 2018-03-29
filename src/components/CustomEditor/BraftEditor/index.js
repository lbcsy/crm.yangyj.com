// 引入编辑器以及编辑器样式
import BraftEditor from 'braft-editor'
import 'braft-editor/dist/braft.css'

export default props => {
    const handleChange = (content) => {
        console.log(content)
    };

    const editorProps = {
        height: 500,
        contentFormat: 'html',
        initialContent: '<p>Hello World!</p>',
        onChange: handleChange,
        onRawChange: handleChange,
    };

    return (
        <BraftEditor {...editorProps}/>
    )
}