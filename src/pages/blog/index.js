import { PureComponent } from 'react';
import Link from 'umi/link';
import { stringify } from 'qs';
import router from 'umi/router';
import { connect } from 'dva';
import { Card, List, Icon, Button, Divider, Popconfirm } from 'antd';
import PageHeaderLayout from 'components/PageHeaderLayout';
import Ellipsis from 'components/Ellipsis';
import IconText from 'components/IconText';
import styles from './index.less';

@connect(state => {
    const { blog, loading } = state;
    const { effects } = loading;
    return {
        page: blog.page,
        size: blog.size,
        total: blog.total,
        list: blog.list,
        loading: effects['blog/fetchList'],
    }
})
export default class page extends PureComponent {

    componentWillReceiveProps(nextProps) {
        const location = this.props.location;
        const nextLocation = nextProps.location;
        const urlParams = `${stringify(location.query)}${location.hash}`;
        const nextUrlParams = `${stringify(nextLocation.query)}${nextLocation.hash}`;
        if(urlParams !== nextUrlParams) {
            this.getList(nextLocation.query);
        }
    }

    componentDidMount() {
        const { query } = this.props.location;
        this.getList(query);
    }

    getList(query = {}) {
        const { dispatch } = this.props;
        dispatch({
            type: 'blog/getList',
            payload: query,
        });
    }

    render() {
        const { list, page, size, total, loading, location } = this.props;

        const breadcrumbList = [{
            title: '首页',
            href: '/',
        }, {
            title: '博客管理',
        }, {
            title: '文章列表',
        }];

        const pagination = {
            pageSize: size,
            current: page,
            total: total,
            onChange: (page => {
                router.push({
                    pathname: location.pathname,
                    query: {
                        ...location.query,
                        page: page || 1,
                    }
                });
            }),
        };
        return (
            <PageHeaderLayout breadcrumbList={breadcrumbList}>
                <Card bordered={false}>
                    <Link to={`/blog/detail`}>
                        <Button type="dashed"
                                className={styles.addButton}
                        >
                            <Icon type="plus"/>
                            添加
                        </Button>
                    </Link>
                    <List
                        itemLayout="vertical"
                        size="large"
                        loading={loading}
                        pagination={pagination}
                        dataSource={list}
                        renderItem={item => (
                            <List.Item
                                key={item.title}
                                className={styles.item}
                                extra={item.image && <Link to={`/blog/detail/${item.id}`}><img alt={item.title} src={item.image} /></Link>}
                            >
                                <List.Item.Meta
                                    title={<Link to={`/blog/detail/${item.id}`}>{item.title}</Link>}
                                    description={<Ellipsis lines={3}>{item.intro}</Ellipsis>}
                                />
                                <div>
                                    <span className="pull-left">
                                        <IconText type="eye-o" text={item.count.view} />
                                        <Divider type="vertical"/>
                                        <IconText type="like-o" text={item.count.like}/>
                                        <Divider type="vertical"/>
                                        <IconText type="message" text={item.count.comment}/>
                                    </span>
                                    <span className="pull-right">
                                        <Link to={`/blog/detail/${item.id}?action=edit`}>
                                            <IconText type="edit" text="编辑"/>
                                        </Link>
                                        <Divider type="vertical"/>
                                            <Popconfirm title="确定要删除吗？" okText="确定" cancelText="取消" onConfirm={() => {
                                                const { dispatch } = this.props;
                                                dispatch({ type: 'blog/delDetail', payload: item.id, location })
                                            }}>
                                                <IconText type="delete" text="删除" style={{color: 'red', cursor: "pointer"}}/>
                                            </Popconfirm>
                                        <Divider type="vertical"/>
                                        {/*<IconText type="setting" text="更多"/>*/}
                                    </span>
                                    <div className="clearfix" />
                                </div>
                            </List.Item>
                        )}
                    />
                </Card>
            </PageHeaderLayout>
        )
    }
}