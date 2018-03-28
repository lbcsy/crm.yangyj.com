import ReactLzEditor from 'react-lz-editor';

export default props => {
    const { editProps } = props;
    const uploadConfig = {
        QINIU_URL: "http://upload.qiniu.com", //上传地址，现在暂只支持七牛上传
        QINIU_IMG_TOKEN_URL: "http://www.yourServerAddress.mobi/getUptokenOfQiniu.do", //请求图片的token
        QINIU_PFOP: {
            url: "http://www.yourServerAddress.mobi/doQiniuPicPersist.do" //七牛持久保存请求地址
        },
        QINIU_VIDEO_TOKEN_URL: "http://www.yourServerAddress.mobi/getUptokenOfQiniu.do", //请求媒体资源的token
        QINIU_FILE_TOKEN_URL: "http://www.yourServerAddress.mobi/getUptokenOfQiniu.do?name=patch", //其他资源的token的获取
        QINIU_DOMAIN_IMG_URL: "https://image.yourServerAddress.mobi", //图片文件地址的前缀
        QINIU_DOMAIN_VIDEO_URL: "https://video.yourServerAddress.mobi", //视频文件地址的前缀
        QINIU_DOMAIN_FILE_URL: "https://static.yourServerAddress.com/", //其他文件地址前缀
    }

    return (
        <ReactLzEditor
            uploadConfig={uploadConfig}
            {...editProps}
        />
    );
}
