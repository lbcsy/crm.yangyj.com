import { PureComponent } from 'react';
import Link from 'umi/link';
import { stringify } from 'qs';
import router from 'umi/router';
import { connect } from 'dva';
import { Card, List, Icon, Button, Avatar, Divider, Popconfirm } from 'antd';
import PageHeaderLayout from 'components/PageHeaderLayout';
import Ellipsis from 'components/Ellipsis';
import IconText from 'components/IconText';
import styles from './page.less';

@connect(state => {
    return {
        paging: state.blog.paging,
        data: state.blog.data,
        loading: state.loading.effects['blog/fetchList'],
    }
})
export default class page extends PureComponent {

    componentWillReceiveProps(nextProps) {
        const location = this.props.location;
        const nextLocation = nextProps.location;
        const urlParams = `${stringify(location.query)}${location.hash}`;
        const nextUrlParams = `${stringify(nextLocation.query)}${nextLocation.hash}`;
        if(urlParams !== nextUrlParams) {
            // 路由参数有变化，重新 reload
            this.props.dispatch({
                type: 'blog/fetchList',
                payload: nextLocation.query,
            });
        }
    }

    componentDidMount() {
        const { query } = this.props.location;
        this.props.dispatch({
            type: 'blog/fetchList',
            payload: query,
        });
    }

    render() {
        const { data, paging, loading, location } = this.props;

        const breadcrumbList = [{
            title: '首页',
            href: '/',
        }, {
            title: '博客管理',
            href: '/blog/list',
        }, {
            title: '文章列表',
            href: '/blog/list',
        }];

        const params = {
            pageSize: paging.size,
            current: paging.page,
            total: paging.total,
            onChange: (page => {
                router.push({
                    pathname: location.pathname,
                    query: {
                        ...location.query,
                        page
                    }
                });
            }),
        };
        return (
            <PageHeaderLayout breadcrumbList={breadcrumbList}>
                <Card bordered={false}>
                    <Link to={`/blog/detail?action=add`}>
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
                        pagination={params}
                        dataSource={data}
                        renderItem={item => (
                            <List.Item
                                key={item.title}
                                className={styles.item}
                                extra={<img alt="logo"
                                            src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"/>}
                            >
                                <List.Item.Meta
                                    avatar={<Avatar src={item.avatar}/>}
                                    title={<Link
                                        to={`/blog/detail?action=view&id=${item.id}`}>{item.title}</Link>}
                                    description={<Ellipsis lines={3}>{item.description}</Ellipsis>}
                                />
                                <div>
                            <span className="pull-left">
                                <IconText type="star-o" text="156"/>
                                <Divider type="vertical"/>
                                <IconText type="like-o" text="156"/>
                                <Divider type="vertical"/>
                                <IconText type="message" text="2"/>
                            </span>
                                    <span className="pull-right">
                                <Link to={`/blog/detail?action=edit&id=${item.id}`}>
                                    <IconText type="edit" text="编辑"/>
                                </Link>
                                <Divider type="vertical"/>
                                <Popconfirm title="确定要删除吗？" okText="确定" cancelText="取消" onConfirm={() => {
                                    // 删除操作
                                }}>
                                    <IconText type="delete" text="删除" style={{color: 'red'}}/>
                                </Popconfirm>
                                <Divider type="vertical"/>
                                <IconText type="setting" text="更多"/>
                            </span>
                                </div>
                            </List.Item>
                        )}
                    />
                </Card>
            </PageHeaderLayout>
        )
    }
}