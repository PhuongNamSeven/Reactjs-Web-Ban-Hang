const {DbUrl,dbName}=require('../config/constant');
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;

module.exports = {
    ThemBaiViet: async function (req, res) {
        const baiVietThem2 = req.body.data;
       console.log(baiVietThem2);

        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });

        await client.connect();
        console.log("Connected correctly to server POSTS");
        const db = client.db(dbName);
        const colPost = db.collection('BaiViet');

            let result = await colPost.insertOne(baiVietThem2);
            client.close();
            if (result.insertedCount > 0) {
                    res.status(200).json({
                        status: 'success',
                        message: 'Thêm thành công'
                    });
            } else {
                res.status(200).json({
                    status: 'fail',
                    message: 'Tạo bài viết mới thất bại !'
                })
            }
       
    },
    LayDanhSachBlog: async function (req, res) {
        const client = new MongoClient(DbUrl);
        await client.connect();
        console.log('ket noi mongodb thanh cong');
        const col = client.db(dbName); // lay ten database
        const colpost = col.collection('BaiViet');
        const dspost = await colpost.find({}).toArray();
        client.close();
        res.json({
            status: 'thanhcong',
            data: dspost
        })
    },
}