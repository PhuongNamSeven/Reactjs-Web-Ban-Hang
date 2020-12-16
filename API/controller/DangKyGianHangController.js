const { DbUrl, dbName } = require('../config/constant');
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const assert = require('assert');
const bcrypt = require('bcrypt');//thu vien
const jwt = require('jsonwebtoken');//token
const { ObjectID } = require('mongodb');
const ids = require('short-id');
module.exports = {
    DangKyGianHang: async function (req, res) {
        let Shop = {
            idShop: 'SHOP-' + ids.generate().toUpperCase(),
            ten: req.body.ten,
            diachi: req.body.diachi,
            mota: req.body.moTa,
            logoShop: req.body.logoShop
        }

        console.log(Shop)

        const id = req.body.id;

        const saltRounds = 10;
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(dbName);
        const colUser = db.collection('NguoiDung');
        const allUser = await colUser.findOneAndUpdate({ _id: ObjectID(id) }, {
            $set: {
                thongtinshop: Shop,
                vaitro : 1
            }
        });

        client.close();
        res.status(200).json({
            status: 'thanhcong',
            message: 'Tao shop thanh cong'
        })
    },
    LayThongTinShopTheoID: async function (req, res) {
        const id = req.query.id;
        const client = new MongoClient(DbUrl);
        await client.connect();
        console.log('ket noi mongodb thanh cong');
        const col = client.db(dbName); // lay ten database
        const coluser = col.collection('NguoiDung');
        const user = await coluser.findOne({ _id: ObjectID(id) });
        client.close();
        if (user === null) {
            res.json({
                status: 'thatbai',
                message: 'Khong co user nay'
            })
        } else {
            res.json({
                status: 'thanhcong',
                data: user
            })
        }

    },
    LayShopTheoIDSanPham: async function (req, res) {
        const idShop = req.query.id;
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        console.log('ket noi mongodb thanh cong');
        const col = client.db(dbName); // lay ten database
        const colnguoidung = col.collection('NguoiDung');
        const shop = await colnguoidung.findOne({ "thongtinshop.idShop": idShop });
        console.log(shop);
        client.close();
        res.json({
            status: 'thanhcong',
            data: shop
        });
    },
    LaySanPhamShopTheoIDSanPham: async function (req, res) {
        const idShop = req.query.id;
        console.log("san pham shop"+idShop);
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        console.log('ket noi mongodb thanh cong');
        const col = client.db(dbName); // lay ten database
        const colsanpham = col.collection('SanPham');
        const arrshop = await colsanpham.find({ ID_ChuShop: idShop }).toArray();
        console.log(arrshop);
        client.close();
        res.json({
            status: 'thanhcong',
            data: arrshop
        });
    },
}