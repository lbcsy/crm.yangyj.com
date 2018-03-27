module.exports = {
    'GET /api/admin/blog':(req, res) => {
        const total = '1000';
        const size = req.query.size || '10';
        const page = req.query.page || '1';

        const start = (page - 1) * size;
        const limit = (page * size);

        const data = [];
        for (let i = start; i < limit; i++) {
            data.push({
                id: i+1,
                title: `港交所市场数据论坛 Wind获颁“最佳信息商” ${i+1}`,
                image: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                intro: '一年一度的香港交易所市场数据论坛12月7日在上海成功举办，在此次论坛中，Wind凭借向投资者提供丰富的港股深度行情数据以及与港交所在市场数据及互联互通业务合作中的出色表现，获颁“最佳信息商”及“衍生产品市场数据合作伙伴”奖项',
            });
        }
        res.send({
            code: 0,
            message: '成功',
            data,
            total,
        });

    },
    'DELETE /api/admin/blog/:id': (req, res) => {
        res.send({
            code: 0,
            message: '成功',
            data: {
                id: req.params.id,
            },
        });
    }
};