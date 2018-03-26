import React, { Component } from 'react';
import classNames from 'classnames';
import styles from './index.less';

export default class QuickToolbar extends Component {
    render() {
        const { children, className, direction, extra, ...restProps } = this.props;
        return (
            <div
                className={classNames(className, styles.toolbar, direction && styles[direction])}
                {...restProps}
            >
                <div className={styles.left}>{extra}</div>
                <div className={styles.right}>{children}</div>
            </div>
        );
    }
}