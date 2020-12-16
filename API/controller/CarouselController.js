const { DbUrl, dbName } = require('../config/constant');
const { MongoClient, ObjectID } = require('mongodb');
const { query } = require('express');

module.exports = {
    LayDanhSachCarousel: async function (req, res) {
        const client = new MongoClient(DbUrl);
        await client.connect();
        console.log('ket noi mongodb thanh cong');
        const col = client.db(dbName); // lay ten database
        const colCarousel = col.collection('Carousel');
        const dsCarousel = await colCarousel.find({isDelete:false}).toArray();
        client.close();
        res.json({
            status: 'thanhcong',
            data: dsCarousel
        })
    },
    LayBaiVietTheoID: async function (req, res) {
        const id = req.query.id;

        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });

        await client.connect();
        console.log("Connected correctly to server POSTS");
        const db = client.db(dbName);
        const colCarousel = db.collection('Carousel');

        let result = await colCarousel.findOne({ _id: ObjectID(id) });
        client.close();

        if (result === null) {
            res.status(200).json({
                status: 'fail',
                message: 'Lấy dữ liệu thất bại'
            });
        } else {
            res.status(200).json({
                status: 'success',
                message: 'Lấy dữ liệu thành công',
                data: result
            });
        }
    },
}
