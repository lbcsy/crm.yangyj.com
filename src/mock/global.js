module.exports = {
    'POST /api/admin/logout': (req, res) => {
        res.send({
            code: 0,
            message: '成功',
        })
    },
    'POST /api/admin/login': (req, res) => {
        if(req.body.username !== 'admin' && req.body.password !== '123456') {
            res.send({
                code: -1,
                message: '账号密码错误',
            });
            return;
        }
        res.send({
            code: 0,
            message: '成功',
        });
    },
    'GET /api/admin/getCurrentUser':(req, res) => {
        res.send({
            code: 0,
            message: '成功',
            dataset: {
                id: 1,
                name: '杨圆建',
                avatar: 'https://avatars0.githubusercontent.com/u/9820142?s=40&v=4',
            }
        });

    },
}