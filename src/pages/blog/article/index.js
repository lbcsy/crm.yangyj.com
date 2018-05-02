import { PureComponent } from 'react'
import Link from 'umi/link'
import { stringify } from 'qs'
import router from 'umi/router'
import {
  Button,
  Card,
  Icon,
  List,
} from 'antd'
import Breadcrumbs from 'components/Breadcrumbs'
import ListItem from './components/ListItem'
import styles from './index.less'

@connect(state => {
  const {blog_article, loading} = state
  const {effects} = loading
  return {
    page: blog_article.page,
    size: blog_article.size,
    total: blog_article.total,
    list: blog_article.list,
    loading: effects['blog_article/getList'],
  }
})
@autobind
export default class Article extends PureComponent {

  componentWillReceiveProps (nextProps) {
    const location = this.props.location
    const nextLocation = nextProps.location
    const urlParams = `${stringify(location.query)}${location.hash}`
    const nextUrlParams = `${stringify(
      nextLocation.query)}${nextLocation.hash}`
    if (urlParams !== nextUrlParams) {
      this.handleGetList(nextLocation.query)
    }
  }

  componentDidMount () {
    const {query} = this.props.location
    this.handleGetList(query)
  }

  handleGetList (query = {}) {
    const {dispatch} = this.props
    dispatch({
      type: 'blog_article/getList',
      payload: query,
    })
  }

  renderItem (item) {
    const { location, dispatch } = this.props;

    const itemProps = {
      key: item.id, // 唯一组件标识符
      item,
      location,
      dispatch,
    }

    return <ListItem {...itemProps} />
  }

  render () {
    const {list, page, size, total, loading, location } = this.props

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
        })
      }),
    }

    const breadcrumbsList = [
      {
        text: '博客管理',
      },
      {
        text: '文章列表',
        link: '/blog/article',
      },
    ]

    return (
      <div>
        <Breadcrumbs breadcrumbsList={breadcrumbsList}/>

        <Card bordered={false}>
          <Link to={`/blog/article/detail/add`}>
            <Button type="dashed" className={styles.addButton}>
              <Icon type="plus"/> 添加
            </Button>
          </Link>
          <List
            itemLayout="vertical"
            size="large"
            loading={loading}
            pagination={pagination}
            dataSource={list}
            renderItem={this.renderItem}
          />
        </Card>
      </div>
    )
  }
}