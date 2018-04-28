import {PureComponent} from 'react';
import Link from 'umi/link';
import {stringify} from 'qs';
import router from 'umi/router';
import {connect} from 'dva';
import autobind from 'autobind';
import {Button, Card, Divider, Icon, List, Modal, Popconfirm, Spin} from 'antd';
import Ellipsis from 'components/Ellipsis';
import IconText from 'components/IconText';
import Breadcrumbs from 'components/Breadcrumbs';
import styles from './index.less';

@connect(state => {
  const {blog_article, loading} = state;
  const {effects} = loading;
  return {
    page: blog_article.page,
    size: blog_article.size,
    total: blog_article.total,
    list: blog_article.list,
    loading: effects['blog_article/getList'],
  };
})
@autobind
export default class Article extends PureComponent {

  state = {
    previewUrl: '',
    visible: false,
    delStatus: {},
  };

  componentWillReceiveProps(nextProps) {
    const location = this.props.location;
    const nextLocation = nextProps.location;
    const urlParams = `${stringify(location.query)}${location.hash}`;
    const nextUrlParams = `${stringify(
        nextLocation.query)}${nextLocation.hash}`;
    if (urlParams !== nextUrlParams) {
      this.handleGetList(nextLocation.query);
    }
  }

  componentDidMount() {
    const {query} = this.props.location;
    this.handleGetList(query);
  }

  handleCancelPreview() {
    this.setState({
      visible: false,
      previewUrl: '',
    });
  }

  handleGetList(query = {}) {
    const {dispatch} = this.props;
    dispatch({
      type: 'blog_article/getList',
      payload: query,
    });
  }

  render() {
    const {list, page, size, total, loading, location, dispatch} = this.props;

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
          },
        });
      }),
    };

    const breadcrumbsList = [
      {
        text: '博客管理',
      },
      {
        text: '文章列表',
        link: '/blog/article',
      },
    ];

    return (
        <div>
          <Breadcrumbs breadcrumbsList={breadcrumbsList}/>

          <Card bordered={false}>
            <Link to={`/blog/article/detail/add`}>
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
                  const {count = {}} = item;

                  return (
                      <List.Item
                          key={item.title}
                          className={styles.item}
                      >
                        <List.Item.Meta
                            title={
                              <Link
                                  to={`/blog/article/detail/${item.id}`}
                              >
                                {item.title}
                              </Link>
                            }
                            description={
                              <Ellipsis tooltip
                                        lines={3}>{item.intro}</Ellipsis>
                            }
                        />
                        <div className={styles.control}>
                          <div>
                              <IconText type="eye-o" text={count.view || 0}/>
                              <Divider type="vertical"/>
                              <IconText type="like-o" text={count.like || 0}/>
                              <Divider type="vertical"/>
                              <IconText type="message" text={count.comment || 0}/>
                          </div>
                          <div>
                            <Link to={`/blog/article/detail/${item.id}`}>
                                <IconText type="desktop" text="查看"/>
                            </Link>

                            <Divider type="vertical"/>

                            <Link
                                to={`/blog/article/detail/${item.id}?action=edit`}>
                                <IconText type="edit" text="编辑"/>
                            </Link>

                            <Divider type="vertical"/>
                                {
                                  !this.state.delStatus[item.id]
                                      ?
                                      <Popconfirm title="确定要删除吗？" okText="确定"
                                                  cancelText="取消" onConfirm={() => {
                                        let delStatus = {
                                          ...this.state.delStatus,
                                        };
                                        delStatus[item.id] = true;
                                        this.setState({
                                          delStatus,
                                        });
                                        dispatch({
                                          type: 'blog_article/delDetail',
                                          payload: item.id,
                                          location,
                                        }).then(() => {
                                          let delStatus = {
                                            ...this.state.delStatus,
                                          };
                                          delStatus[item.id] = false;

                                          this.setState({
                                            delStatus,
                                          });
                                        });
                                      }}>
                                        <IconText type="delete" text="删除"
                                                  style={{
                                                    color: 'red',
                                                    cursor: 'pointer',
                                                  }}/>
                                      </Popconfirm>
                                      : <Spin size="small"/>
                                }

                                <Divider type="vertical"/>

                                {
                                  item.image

                                  && <IconText
                                      type="picture"
                                      style={{cursor: 'pointer'}}
                                      text="查看缩略图"
                                      onClick={() => {
                                        this.setState({
                                          visible: true,
                                          previewUrl: item.image,
                                        });
                                      }}
                                  />
                                }

                          </div>
                        </div>
                      </List.Item>
                  );
                }}
            />
          </Card>
          <Modal
              visible={this.state.visible}
              onCancel={this.handleCancelPreview}
              footer={null}
          >
            <div>
              {
                this.state.previewUrl
                    ? <img alt="预览图片"
                           src={this.state.previewUrl}
                           width="100%"/>
                    : ''
              }
            </div>
          </Modal>
        </div>
    );
  }
}