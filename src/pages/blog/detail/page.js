import { Button } from 'antd';
import Link from 'umi/link';
import Exception from 'components/Exception';
import DetailForm from './components/DetailForm';
import DetailView from './components/DetailView';

export default (props) => {
    const newProps = {
        ...props,
    };

    switch (props.location.query.action) {
        case 'add':
            return <DetailForm {...newProps}/>;
        case 'edit':
            return <DetailForm {...newProps}/>;
        case 'view':
            return <DetailView {...newProps}/>;
        default:
            const actions = (
                <div>
                    <Link to="/blog/list"><Button type="primary">返回列表</Button></Link>
                </div>
            );
            return <Exception type="404" actions={actions} title="Oops" />
    }
}