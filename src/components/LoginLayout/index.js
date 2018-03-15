import { PureComponent } from 'react';

export default class LoginLayout extends PureComponent {
    render() {
        const { children } = this.props;

        return (
            <div>
                登录布局
                {children}
            </div>
        );
    };
};