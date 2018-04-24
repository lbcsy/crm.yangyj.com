import styles from './index.less';

export default class QuickToolbar extends React.PureComponent {
  render() {
    const {children, extra, ...restProps} = this.props;
    return (
        <div
            className={styles.toolbar}
            {...restProps}
        >
          <div className={styles.extra}>{extra}</div>
          <div className={styles.children}>{children}</div>
        </div>
    );
  }
}