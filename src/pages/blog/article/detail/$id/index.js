import DetailForm from '../components/DetailForm';

@connect(({ blog_article: { detail }}) => {
  return {
    detail,
  }
})
@autobind
export default class Detail extends React.PureComponent {
  componentDidMount() {
    const { dispatch, match: { params = {} }} = this.props;

    dispatch({
      type: 'blog_article/getDetail',
      payload: params.id,
    })
  }

  componentWillUnmount() {
    const { dispatch } = this.props;

    dispatch({
      type: 'blog_article/changeDetail__',
      payload: {},
    })
  }

  render() {
    const { detail, location: { query: { action = 'view' } } } = this.props;

    if(!['edit', 'view'].includes(action)) {
      return (<div>非法请求</div>);
    }

    return (
        <DetailForm action={action} initialData={detail} />
    )
  }
}
