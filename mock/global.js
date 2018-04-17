module.exports = {
    'PUT /api/v1/admin/logout': (req, res) => {
        res.send({
            status: 'success',
            code: 0,
            message: '成功',
        })
    },
    'GET /api/v1/admin/currentUser':(req, res) => {
        res.send({
            status: 'success',
            code: 0,
            message: '成功',
            data: {
                id: 1,
                name: '杨圆建',
                avatar: 'https://avatars0.githubusercontent.com/u/9820142?s=40&v=4',
            }
        });

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
    'PUT /api/v1/admin/editPassword': (req, res) => {
        if(req.body.password !== '123456') {
            res.send({
                status: 'error',
                code: -1,
                message: '密码不正确',
            });
            return;
        }
        if(req.body.newPassword !== req.body.confirmNewPassword) {
            res.send({
                status: 'error',
                code: -1,
                message: '新密码输入不一致',
            });
            return;
        }
        if(req.body.newPassword.length < 6) {
            res.send({
                status: 'error',
                code: -1,
                message: '新密码最小长度为6位',
            });
            return;
        }
        res.send({
            status: 'success',
            code: 0,
            message: '成功',
        });
    },
    'POST /api/v1/admin/upload':(req, res) => {
        res.send({
            status: 'success',
            code: 0,
            message: '成功',
            data: {
                url: 'https://avatars0.githubusercontent.com/u/9820142?s=40&v=4',
            }
        });

    },
};