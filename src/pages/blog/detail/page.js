export default (props) => {
    switch (props.location.query.action) {
        case 'add':
            return (
                <div>
                    添加详情
                </div>
            );
        case 'edit':
            return (
                <div>
                    编辑详情
                </div>
            );
        case 'view':
            return (
                <div>
                    查看详情
                </div>
            );
        default:
            return (
                <div>
                    页面丢失
                </div>
            );
    }
}