// 引入编辑器以及编辑器样式
import { message } from 'antd';
import BraftEditor from 'braft-editor'
import 'braft-editor/dist/braft.css'
import API from 'common/api';
import request from 'utils/request';

export default props => {

    const { editorProps } = props;

    const media = {
        allowPasteImage: true, // 是否允许直接粘贴剪贴板图片（例如QQ截图等）到编辑器
        image: true, // 开启图片插入功能
        video: true, // 开启视频插入功能
        audio: true, // 开启音频插入功能
        validateFn: null, // 指定本地校验函数，说明见下文
        uploadFn: async (param) => {
            const fd = new FormData();
            fd.append('file', param.file);

            try {
                const res = await request(API.UPLOAD, {
                    method: 'POST',
                    body: fd,
                });

                param.success({
                    ...res.data,
                });
            } catch (error) {
                param.error({
                    msg: 'unable not upload'
                });
                message.error(error.message);
            }

        }, // 指定上传函数，说明见下文
        removeConfirmFn: null, // 指定删除前的确认函数，说明见下文
        onRemove: null, // 指定媒体库文件被删除时的回调，参数为被删除的媒体文件列表(数组)
        onChange: null, // 指定媒体库文件列表发生变化时的回调，参数为媒体库文件列表(数组)
        onInsert: null, // 指定从媒体库插入文件到编辑器时的回调，参数为被插入的媒体文件列表(数组)
    };

    return (
        <BraftEditor media={media} {...editorProps}
        />
    )
}