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
                image: i % 2 === 0 && 'https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png',
                intro: '一年一度的香港交易所市场数据论坛12月7日在上海成功举办，在此次论坛中，Wind凭借向投资者提供丰富的港股深度行情数据以及与港交所在市场数据及互联互通业务合作中的出色表现，获颁“最佳信息商”及“衍生产品市场数据合作伙伴”奖项',
                count: {
                    view: Math.ceil(Math.random() * 1000),
                    like: Math.ceil(Math.random() * 50),
                    comment: Math.ceil(Math.random() * 50),
                },
            });
        }
        res.send({
            code: 0,
            message: '成功',
            data,
            total,
        });

    },
    'GET /api/admin/blog/:id': (req, res) => {
        if(!+req.params.id) {
            res.send({
                code: 0,
                message: '成功',
                data: {}
            });
        } else {
            res.send({
                code: 0,
                message: '成功',
                data: {
                    id: req.params.id,
                    title: `港交所市场数据论坛 Wind获颁“最佳信息商” ${req.params.id}`,
                    image: 'https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png',
                    intro: '一年一度的香港交易所市场数据论坛12月7日在上海成功举办，在此次论坛中，Wind凭借向投资者提供丰富的港股深度行情数据以及与港交所在市场数据及互联互通业务合作中的出色表现，获颁“最佳信息商”及“衍生产品市场数据合作伙伴”奖项',
                    count: {
                        view: Math.ceil(Math.random() * 1000),
                        like: Math.ceil(Math.random() * 50),
                        comment: Math.ceil(Math.random() * 50),
                    },
                    content: '中新网3月26日电 据台湾联合新闻网报道，台湾一名女研发经理于2014年被公司解雇，离职当天疑为发泄不满，在15分钟内删光公司1.4万余笔研发数据，致使公司损失惨重，该女子日前遭到检方起诉。<br />该廖姓女经理当时任职于新竹生医园区一家公司，于2014年时被公司资遣。离职当天她趁交接人员不注意，把公司研发中的一万四千多笔医疗档案全部删除。公司损失惨重，并向检调报案，新竹地检署日前依“刑法”无故删除他人电磁纪录罪嫌予以起诉。廖姓女子自2013年起在新竹生医园区任职的公司担任研发部总经理一职，手中握有公司研发中产品的各项数据，均属公司的商业机密。资安人员在检查时发现廖姓女子自2014年3月起，陆续将手中持有的商业机密交给公司的竞争对手，于是将其资遣。离职当天下午，廖某办理笔记本电脑交接与离职手续时，佯称要删除计算机内的私人照片而开启计算机，并在15分钟内删除计算机内的医疗研发档案，一共14882笔，公司也随即向新竹市调查局报案。廖某坦承删除笔电档案，并宣称是总经理要求她将个人及不重要的资料删除，自己删除的数据皆为不重要数据。总经理则说明并未同意廖某删除档案，公司投入巨大研发成本所获得的资料皆因廖某的刻意删除遭受损失。新竹地检署已依“刑法”无故删除他人电磁纪录罪嫌起诉廖女。',
                },
            });
        }
    },
    'POST /api/admin/blog': (req, res) => {
        res.send({
            code: 0,
            message: '成功',
            data: {
                id: Math.ceil(Math.random() *  100),
            }
        });
    },
    'PUT /api/admin/blog/:id': (req, res) => {
        res.send({
            code: 0,
            message: '成功',
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