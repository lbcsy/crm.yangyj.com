import { Icon} from 'antd';

export default ({ type, text, ...restProps }) => (
    <span {...restProps}>
        <Icon type={type} style={{ marginRight: 5 }} />
        {text}
    </span>
);