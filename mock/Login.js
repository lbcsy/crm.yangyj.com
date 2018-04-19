module.exports = {
    'PUT /api/v1/admin/logout': (req, res) => {
        res.send({
            status: 'success',
            code: 0,
            message: '成功',
        })
    },
    'PUT /api/v1/admin/login': (req, res) => {
        if(req.body.name === 'admin' && req.body.password === '123456') {
            res.send({
                status: 'success',
                code: 0,
                message: '成功',
                data: {
                    access_token: 'xxxx',
                }
            });
        } else {
            res.send({
                status: 'error',
                code: -1,
                message: '账号密码错误',
            });
        }
    },
};