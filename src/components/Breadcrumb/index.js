import NavLink from 'umi/navlink';
import router from 'umi/router';
import { Icon, Divider } from 'antd';
import withBreadcrumbs from 'react-router-breadcrumbs-hoc';
import styles from './index.less';

// 更多配置请移步 https://github.com/icd2k3/react-router-breadcrumbs-hoc
const routes = [
  { path: '/', breadcrumb: '系统主页' },
  { path: '/blog', breadcrumb: null },
  { path: '/blog/article', breadcrumb: '博客文章' },
  { path: '/blog/article/detail/:id?', breadcrumb: '文章详情' },
];

export default withBreadcrumbs(routes)(({ breadcrumbs }) => (
  <div className={styles.breadcrumb}>
    当前位置：
    {breadcrumbs.map((breadcrumb, index) => (
      <span key={breadcrumb.key}>
        <NavLink to={breadcrumb.props.match.url}>
          {breadcrumb}
        </NavLink>
        {(index < breadcrumbs.length - 1) && <i> / </i>}
      </span>
    ))}
    <div className={styles.control}>
      <a onClick={() => router.goBack()}><Icon type="left" /> 返回</a>
    </div>
    <div className="clearfix"></div>
  </div>
));