module.exports = {
    'PUT /api/admin/logout': (req, res) => {
        res.send({
            code: 0,
            msg: '成功',
        })
    },
    'GET /api/admin/currentUser':(req, res) => {
        res.send({
            code: 0,
            msg: '成功',
            data: {
                id: 1,
                name: '杨圆建',
                avatar: 'https://avatars0.githubusercontent.com/u/9820142?s=40&v=4',
            }
        });

    },
    'PUT /api/admin/login': (req, res) => {
        if(req.body.username === 'admin' && req.body.password === '123456') {
            res.send({
                code: 0,
                msg: '成功',
            });
        } else {
            res.send({
                code: -1,
                msg: '账号密码错误',
            });
        }
    },
    'PUT /api/admin/editPassword': (req, res) => {
        if(req.body.password !== '123456') {
            res.send({
                code: -1,
                msg: '密码不正确',
            });
            return;
        }
        if(req.body.newPassword !== req.body.confirmNewPassword) {
            res.send({
                code: -1,
                msg: '新密码输入不一致',
            });
            return;
        }
        if(req.body.newPassword.length < 6) {
            res.send({
                code: -1,
                msg: '新密码最小长度为6位',
            });
            return;
        }
        res.send({
            code: 0,
            msg: '成功',
        });
    }
};