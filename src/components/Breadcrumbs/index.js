import Link from 'umi/link';
import router from 'umi/router';
import {Icon} from 'antd';
import styles from './index.less';

export default (props) => {
  const {breadcrumbsList} = props;

  return (
      <div className={styles.breadcrumbs}>
        <div>
          当前位置：<Link to="/">主页</Link>
          {breadcrumbsList && breadcrumbsList.map((item, index) => (
              <span key={index}>
                {(index === 0) && <i> / </i>}
                {
                  item.link
                      ? <Link to={item.link}>{item.text}</Link>
                      : item.text
                }
                {(index !== breadcrumbsList.length - 1) && <i> / </i>}
              </span>
          ))}
        </div>
        <div>
          <a onClick={() => router.goBack()}><Icon type="left"/> 返回</a>
          {/*<a onClick={() => router.go(1)} style={{ marginLeft: 10}}>前进 <Icon type="right"/></a>*/}
        </div>
      </div>
  );
}

