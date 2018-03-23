import { PureComponent } from 'react';
import ReactLzEditor from 'react-lz-editor'

export default class LzEditor extends PureComponent {
    render() {
        const { editProps = {} } = this.props;

        return (
            <ReactLzEditor
                {...editProps}
            />
        );
    }
}
