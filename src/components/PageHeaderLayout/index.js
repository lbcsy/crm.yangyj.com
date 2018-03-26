import React from 'react';
import Link from 'umi/link';
import PageHeader from 'components/PageHeader';
import styles from './index.less';

export default ({ children, wrapperClassName, top, ...restProps }) => (
    <div style={{ margin: '-24px -24px 0' }} className={wrapperClassName}>
        {top}
        <PageHeader key="pageheader" linkElement={Link} {...restProps} />
        {children ? <div className={styles.content}>{children}</div> : null}
    </div>
);