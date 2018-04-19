import { PureComponent } from 'react';
import Link from 'umi/link';
import { stringify } from 'qs';
import router from 'umi/router';
import { connect } from 'dva';
import autobind from 'autobind';
import { Card, List, Icon, Button, Divider, Popconfirm, Modal } from 'antd';
import PageHeaderLayout from 'components/PageHeaderLayout';
import Ellipsis from 'components/Ellipsis';
import IconText from 'components/IconText';
import styles from './index.less';

@connect(state => {
    const { blogArticle, loading } = state;
    const { effects } = loading;
    return {
        page: blogArticle.page,
        size: blogArticle.size,
        total: blogArticle.total,
        list: blogArticle.list,
        loading: effects['blogArticle/getList'],
    }
})
@autobind
export default class Article extends PureComponent {

    state = {
        previewUrl: '',
        visible: false,
    };

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

    handleCancelPreview() {
        this.setState({
            visible: false,
            previewUrl: '',
        });
    }

    getList(query = {}) {
        const { dispatch } = this.props;
        dispatch({
            type: 'blogArticle/getList',
            payload: query,
        });
    }

    render() {
        const { list, page, size, total, loading, location, dispatch } = this.props;

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
                    <Link to={`/blog/article/detail`}>
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
                        renderItem={(item) => {
                            const { count={} } = item;

                            return (
                                <List.Item
                                    key={item.title}
                                    className={styles.item}
                                >
                                    <List.Item.Meta
                                        title={<Link to={`/blog/article/detail/${item.id}`}>{item.title}</Link>}
                                        description={<Ellipsis lines={3}>{item.intro}</Ellipsis>}
                                    />
                                    <div>
                                        <span className="pull-left">
                                            <IconText type="eye-o" text={count.view || 0}/>
                                            <Divider type="vertical"/>
                                            <IconText type="like-o" text={count.like || 0}/>
                                            <Divider type="vertical"/>
                                            <IconText type="message" text={count.comment || 0}/>
                                        </span>
                                        <span className="pull-right">
                                            <Link to={`/blog/article/detail/${item.id}`}>
                                                <IconText type="desktop" text="查看"/>
                                            </Link>

                                            <Divider type="vertical"/>

                                            <Link to={`/blog/article/detail/${item.id}?action=edit`}>
                                                <IconText type="edit" text="编辑"/>
                                            </Link>

                                            <Divider type="vertical"/>

                                            <Popconfirm title="确定要删除吗？" okText="确定" cancelText="取消" onConfirm={() => {
                                                dispatch({ type: 'blogArticle/delDetail', payload: item.id, location })
                                            }}>
                                                <IconText type="delete" text="删除"
                                                          style={{color: 'red', cursor: "pointer"}}/>
                                            </Popconfirm>

                                            <Divider type="vertical"/>

                                            {
                                                item.image
                                                && <IconText
                                                        type="picture"
                                                        style={{ cursor: 'pointer' }}
                                                        text="查看缩略图"
                                                        onClick={() => {
                                                            this.setState({
                                                                visible: true,
                                                                previewUrl: item.image,
                                                            });
                                                        }}
                                                    />
                                            }

                                                {/*<IconText type="setting" text="更多"/>*/}
                                        </span>
                                        <div className="clearfix"/>
                                    </div>
                                </List.Item>
                            )
                        }
                        }
                    />
                </Card>
                <Modal
                    visible={this.state.visible}
                    onCancel={this.handleCancelPreview}
                    footer={null}
                >
                    <span>{this.state.previewUrl ? <img alt="预览图片" src={this.state.previewUrl} width="100%" /> : ''}</span>
                </Modal>
            </PageHeaderLayout>
        )
    }
}