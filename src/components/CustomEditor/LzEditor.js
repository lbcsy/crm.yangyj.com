import { PureComponent } from 'react';
import autobind from 'autobind';
import ReactLzEditor from 'react-lz-editor';

@autobind
export default class LzEditor extends PureComponent {

    render() {
        const { editProps } = this.props;
        return (
            <ReactLzEditor
                {...editProps}
            />
        );
    }
}
