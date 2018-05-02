import Link from 'umi/link'
import { Divider, List, Modal, Popconfirm, Spin } from 'antd'
import Ellipsis from 'components/Ellipsis'
import IconText from 'components/IconText'
import styles from './ListItem.less'

@autobind
export default class ListItem extends React.PureComponent {

  state = {
    delStatus: false,
    previewUrl: '',
    visible: false,
  }

  handleCancelPreview () {
    this.setState({
      visible: false,
      previewUrl: '',
    })
  }

  handleVisiblePreview () {
    const {item = {} } = this.props

    this.setState({
      visible: true,
      previewUrl: item.image,
    })
  }

  handleConfirm () {
    const {item = {}, dispatch, location} = this.props

    this.setState({
      delStatus: true,
    })
    dispatch({
      type: 'blog_article/delDetail',
      payload: item.id,
      location,
    })
  }

  componentWillUnmount () {
    this.setState({
      delStatus: false,
    })
  }

  render () {

    const {item = {}} = this.props

    const {count = {}} = item

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
              !this.state.delStatus
                ? <Popconfirm
                  title="确定要删除吗？"
                  okText="确定"
                  cancelText="取消"
                  onConfirm={this.handleConfirm}
                >
                  <IconText
                    type="delete"
                    text="删除"
                    style={{color: 'red', cursor: 'pointer'}}
                  />
                </Popconfirm>
                : <Spin size="small"/>
            }

            <Divider type="vertical"/>
            {
              item.image && <IconText
                type="picture"
                style={{cursor: 'pointer'}}
                text="查看缩略图"
                onClick={this.handleVisiblePreview}
              />
            }
          </div>
        </div>
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
      </List.Item>
    )
  }
}