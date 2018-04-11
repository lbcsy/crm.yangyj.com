// 引入编辑器以及编辑器样式
import BraftEditor from 'braft-editor'
import 'braft-editor/dist/braft.css'

export default props => {

    const { editorProps } = props;

    return (
        <BraftEditor {...editorProps}/>
    )
}