import { PureComponent } from 'react';
import Link from 'umi/link';
import { connect } from 'dva';
import { Card, List, Icon, Button, Avatar, Divider, Popconfirm } from 'antd';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import Ellipsis from '../../../components/Ellipsis';
import IconText from '../../../components/IconText';
import styles from './page.less';

@connect()
export default class page extends PureComponent {

    componentDidMount() {
        // load data
    }

    render() {
        const breadcrumbList = [{
            title: '首页',
            href: '/',
        }, {
            title: '博客管理',
        }, {
            title: '文章列表',
        }];

        const listData = [];
        for (let i = 1; i < 25; i++) {
            listData.push({
                id: i,
                title: `ant design part ${i}`,
                avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                description: 'applications, is refined by Ant UED Team.applications, is refined by Ant UED Team.applications, is refined by Ant UED Team.applications, is refined by Ant UED Team.applications, is refined by Ant UED Team.applications, is refined by Ant UED Team.applications, is refined by Ant UED Team.applications, is refined by Ant UED Team.applications, is refined by Ant UED Team.applications, is refined by Ant UED Team.applications, is refined by Ant UED Team.applications, is refined by Ant UED Team.applications, is refined by Ant UED Team.applications, is refined by Ant UED Team.applications, is refined by Ant UED Team.applications, is refined by Ant UED Team.applications, is refined by Ant UED Team.applications, is refined by Ant UED Team.applications, is refined by Ant UED Team.applications, is refined by Ant UED Team.applications, is refined by Ant UED Team.applications, is refined by Ant UED Team.applications, is refined by Ant UED Team.applications, is refined by Ant UED Team.applications, is refined by Ant UED Team.applications, is refined by Ant UED Team.applications, is refined by Ant UED Team.applications, is refined by Ant UED Team.applications, is refined by Ant UED Team.applications, is refined by Ant UED Team.applications, is refined by Ant UED Team.applications, is refined by Ant UED Team.applications, is refined by Ant UED Team.applications, is refined by Ant UED Team.applications, is refined by Ant UED Team.applications, is refined by Ant UED Team.applications, is refined by Ant UED Team.applications, is refined by Ant UED Team.',
            });
        }

        const pagination = {
            pageSize: 10,
            current: 1,
            total: listData.length,
            onChange: (() => {
                console.log('分页');
            }),
        };

        return (
            <PageHeaderLayout breadcrumbList={breadcrumbList} linkElement={Link}>
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
                        pagination={pagination}
                        dataSource={listData}
                        renderItem={item => (
                            <List.Item
                                key={item.title}
                                className={styles.item}
                                extra={<img alt="logo" src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png" />}
                            >
                                <List.Item.Meta
                                    avatar={<Avatar src={item.avatar} />}
                                    title={<Link to={`/blog/detail?action=view&id=${item.id}`}>{item.title}</Link>}
                                    description={<Ellipsis lines={3}>{item.description}</Ellipsis>}
                                />
                                <div>
                                    <span className="pull-left">
                                        <IconText type="star-o" text="156" />
                                        <Divider type="vertical" />
                                        <IconText type="like-o" text="156" />
                                        <Divider type="vertical" />
                                        <IconText type="message" text="2" />
                                    </span>
                                    <span className="pull-right">
                                        <Link to={`/blog/detail?action=edit&id=${item.id}`}>
                                            <IconText type="edit" text="编辑" />
                                        </Link>
                                        <Divider type="vertical" />
                                        <Popconfirm title="确定要删除吗？" okText="确定" cancelText="取消" onConfirm={() => {
                                            // 删除操作
                                        }}>
                                            <IconText type="delete" text="删除" style={{ color: 'red' }} />
                                        </Popconfirm>
                                        <Divider type="vertical" />
                                        <IconText type="setting" text="更多" />
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