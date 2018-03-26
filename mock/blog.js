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
                title: `ant design part ${i+1}`,
                avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                description: 'applications, is refined by Ant UED Team.applications, is refined by Ant UED Team.applications, is refined by Ant UED Team.applications, is refined by Ant UED Team.applications, is refined by Ant UED Team.applications, is refined by Ant UED Team.applications, is refined by Ant UED Team.applications, is refined by Ant UED Team.applications, is refined by Ant UED Team.applications, is refined by Ant UED Team.applications, is refined by Ant UED Team.applications, is refined by Ant UED Team.applications, is refined by Ant UED Team.applications, is refined by Ant UED Team.applications, is refined by Ant UED Team.applications, is refined by Ant UED Team.applications, is refined by Ant UED Team.applications, is refined by Ant UED Team.applications, is refined by Ant UED Team.applications, is refined by Ant UED Team.applications, is refined by Ant UED Team.applications, is refined by Ant UED Team.applications, is refined by Ant UED Team.applications, is refined by Ant UED Team.applications, is refined by Ant UED Team.applications, is refined by Ant UED Team.applications, is refined by Ant UED Team.applications, is refined by Ant UED Team.applications, is refined by Ant UED Team.applications, is refined by Ant UED Team.applications, is refined by Ant UED Team.applications, is refined by Ant UED Team.applications, is refined by Ant UED Team.applications, is refined by Ant UED Team.applications, is refined by Ant UED Team.applications, is refined by Ant UED Team.applications, is refined by Ant UED Team.applications, is refined by Ant UED Team.',
            });
        }
        res.send({
            code: 0,
            message: '成功',
            data,
            paging: {
                page: parseInt(page),
                size: parseInt(size),
                total: parseInt(total),
            }
        });

    },
};