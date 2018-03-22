import { Card } from 'antd';
import PageHeaderLayout from 'layouts/PageHeaderLayout';

import DetailForm from './components/DetailForm';
import DetailView from './components/DetailView';

export default (props) => {
    const { location } = props;
    const { query } = location;
    const { action } = query;

    const newProps = {
        ...props,
        action
    };

    let DetailDom = () => <Card bordered={false}>参数错误</Card>;

    let breadcrumbList = [{
        title: '首页',
        href: '/',
    }, {
        title: '博客管理',
        href: '/blog/list',
    }, {
        title: '文章列表',
        href: '/blog/list',
    }];

    switch (props.location.query.action) {
        case 'add':
            breadcrumbList.push({ title: '添加文章' });
            DetailDom = () => <DetailForm {...newProps}/>;
            break;
        case 'edit':
            breadcrumbList.push({ title: '编辑文章' });
            DetailDom = () => <DetailForm {...newProps}/>;
            break;
        case 'view':
            breadcrumbList.push({ title: '查看文章' });
            DetailDom = () => <DetailView {...newProps}/>;
            break;
        default:
            breadcrumbList.push({ title: '查看文章' });
            break;
    }

    return (
        <PageHeaderLayout
            breadcrumbList={breadcrumbList}
        >
            <DetailDom />
        </PageHeaderLayout>
    );
}