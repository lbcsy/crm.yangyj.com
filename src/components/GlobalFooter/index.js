import React from 'react';
import classNames from 'classnames';
import styles from './index.less';

export default ({ className, links, copyright }) => {
    const clsString = classNames(styles.globalFooter, className);
    return (
        <div className={clsString}>
            {
                links && (
                    <div className={styles.links}>
                        {links.map(link => (
                            <a
                                key={link.key}
                                target={link.blankTarget ? '_blank' : '_self'}
                                href={link.href}
                            >
                                {link.title}
                            </a>
                        ))}
                    </div>
                )
            }
            {
                copyright
                && <div className={styles.copyright}>
                    {copyright}
                    <br />
                    构建信息：{__BUILD_ENV__.toUpperCase()} 分支：{__BRANCH__.toUpperCase()} 时间：{__DATETIME__}
                </div>
            }
        </div>
    );
};