import {isUrl} from '../utils/utils';

const menuData = [
  {
    name: '博客管理',
    icon: 'table',
    path: 'blog',
    children: [
      {
        name: '文章列表',
        path: 'article',
      },
    ],
  }];

function formatter(data, parentPath = '/') {
  return data.map((item) => {
    let {path} = item;
    if (!isUrl(path)) {
      path = parentPath + item.path;
    }
    const result = {
      ...item,
      path,
    };
    if (item.children) {
      result.children = formatter(item.children, `${parentPath}${item.path}/`);
    }
    return result;
  });
}

export const getMenuData = () => formatter(menuData);