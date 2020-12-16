const { DbUrl, dbName } = require('../config/constant');
const { MongoClient, ObjectID } = require('mongodb');
const { query } = require('express');

module.exports = {
    LayDanhSachGioHang: async function (req, res) {
        const idUser = req.query.idUser;
        const client = new MongoClient(DbUrl);
        await client.connect();
        console.log('ket noi mongodb thanh cong');
        const col = client.db(dbName); // lay ten database
        const colsanpham = col.collection('GioHang');
        const dsgh = await colsanpham.find({ idUser: idUser, trangthai: false}).toArray();
        client.close();
        res.json({
            status: 'thanhcong',
            data: dsgh
        })
    },
    ThemGioHang: async function (req, res) {

        let GioHangThem = {
            idSanPham:req.body._id,
            ten: req.body.ten,
            gia: req.body.gia,
            anh: req.body.anh,
            soluong: parseInt(req.body.soluong),
            idUser: req.body.idUser,
            idChuShop:req.body.idChuShop,
            trangthai: req.body.trangthai, // khach hang mua va thanh toan k thanh toan 
           
        }

        console.log(GioHangThem)

        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(dbName);
        const colGioHang = db.collection('GioHang');
        const ketquatrung = await colGioHang.findOne({ ten: GioHangThem.ten, idUser: GioHangThem.idUser, trangthai: false });

        console.log(ketquatrung);
        if (ketquatrung === null) {
            const result = await colGioHang.insertOne(GioHangThem);
            client.close();

            if (result.insertedCount > 0) {
                res.status(200).json({
                    status: 'thanhcong',
                    message: 'Thêm gio hang thành công',
                })
            } else {
                res.status(200).json({
                    status: 'thatbai',
                    message: 'Thêm gio hang thất bại',
                });
            }

        } else {
            const result3 = await colGioHang.findOneAndUpdate({ _id: ObjectID(ketquatrung._id) }, { $inc: { soluong: GioHangThem.soluong } });
            client.close();
            res.status(200).json({
                status: 'thanhcong',
                message: 'Thêm gio hang thành công',
            })
        }


    },
   

}