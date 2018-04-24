import DetailForm from './components/DetailForm';

@autobind
export default class Detail extends React.PureComponent {
  render() {
    return (
        <DetailForm action="add" />
    )
  }
}
