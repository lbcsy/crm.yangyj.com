import { PureComponent } from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import PageHeaderLayout from 'components/PageHeaderLayout';
import DetailForm from './components/DetailForm';
import { stringify } from "qs";

@connect(state => {
    const { blog, loading } = state;
    const { article } = blog;
    const { detail } = article;
    const { effects } = loading;
    return {
        detail,
        loading: effects['blog/getArticleDetail'],
    };
})
export default class Detail extends PureComponent {

    componentWillReceiveProps(nextProps) {
        const location = this.props.location;
        const nextLocation = nextProps.location;
        const urlParams = `${stringify(location.query)}${location.hash}`;
        const nextUrlParams = `${stringify(nextLocation.query)}${nextLocation.hash}`;
        if(location.pathname !== nextLocation.pathname || urlParams !== nextUrlParams) {
            const { match } = nextProps;
            const { params } = match;
            this.getDetail(params.id);
        }
    }

    componentDidMount() {
        const { match } = this.props;
        const { params } = match;
        this.getDetail(params.id);
    }

    getDetail(id = 0) {
        const { dispatch } = this.props;
        dispatch({
            type: 'blog/getArticleDetail',
            payload: id,
        });
    }

    render() {
        const { match, location } = this.props;
        const { query } = location;

        let action = query.action;
        let breadcrumbList = [{
            title: '首页',
            href: '/',
        }, {
            title: '博客管理',
            href: '/blog/article',
        }, {
            title: '文章列表',
            href: '/blog/article',
        }];

        if(match.params.id) {
            if(isNaN(+match.params.id)) {
                router.goBack();
                return null;
            }
            switch (action) {
                case 'edit':
                    breadcrumbList.push({
                        title: '编辑文章',
                    });
                    break;
                default:
                    action = 'view';
                    breadcrumbList.push({
                        title: '查看文章',
                    })
            }
        } else {
            action = 'add';
            breadcrumbList.push({
                title: '添加文章',
            });
        }

        const detailFormProps = {
            ...this.props,
            action,
        };

        return (
            <PageHeaderLayout
                breadcrumbList={breadcrumbList}
            >
                <DetailForm {...detailFormProps}/>
            </PageHeaderLayout>
        );
    }
}