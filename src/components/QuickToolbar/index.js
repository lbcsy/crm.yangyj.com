import classNames from 'classnames';
import styles from './index.less';

export default class QuickToolbar extends React.PureComponent {
  render() {
    const {children, className, direction, extra, ...restProps} = this.props;
    return (
        <div
            className={classNames(className, styles.toolbar, direction &&
                styles[direction])}
            {...restProps}
        >
          <div className={styles.extra}>{extra}</div>
          <div className={styles.children}>{children}</div>
        </div>
    );
  }
}