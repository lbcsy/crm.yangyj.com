import { Button } from 'antd';
import Link from 'umi/link';
import Exception from 'components/Exception';

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
            const actions = (
                <div>
                    <Link to="/blog/list"><Button type="primary">返回列表页</Button></Link>
                </div>
            );
            return <Exception type="404" actions={actions} title="Oops" desc="抱歉，未知的操作，请按规范操作！" />
    }
}