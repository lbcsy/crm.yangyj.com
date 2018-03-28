import { PureComponent } from 'react';
import { connect } from 'dva';
import PageHeaderLayout from 'components/PageHeaderLayout';
import DetailForm from './components/DetailForm';
import {stringify} from "qs";

@connect(state => ({detail: state.blog.detail}))
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
            type: 'blog/getDetail',
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
            href: '/blog',
        }, {
            title: '文章列表',
            href: '/blog',
        }];

        if(match.params.id) {
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