const {DbUrl,dbName}=require('../config/constant');
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const assert = require('assert');
const bcrypt = require('bcrypt');//thu vien
const jwt = require('jsonwebtoken');//token

module.exports = {
    ThemUser: async function (req, res) {
        let NguoiDung = {
            ten : req.body.ten,
            taikhoan :{
                email : req.body.email,
                password : req.body.password
            },
            vaitro :2
        }
        const saltRounds = 10;
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(dbName);
        const colUser = db.collection('NguoiDung');
        const allUser = await colUser.find({}).toArray();
        let trungTaiKhoan = false;
        for (let index = 0; index < allUser.length; index++) {
            if (allUser[index].taikhoan.email === NguoiDung.taikhoan.email) {
                trungTaiKhoan = true;
                break;
            }
        }

        let result;

        if (trungTaiKhoan === false) {
            bcrypt.hash(NguoiDung.taikhoan.password, saltRounds, async function (err, hash) {
                NguoiDung.taikhoan.password = hash;
                result = await colUser.insertOne(NguoiDung);
                client.close();
                if (result.insertedCount > 0) {
                    res.status(200).json({
                        status: 'thanhcong',
                        message: 'Thêm user thành công',
                    })
                } else {
                    res.status(200).json({
                        status: 'thatbai',
                        message: 'Thêm user thất bại',
                    });
                }

            });
        } else {
            res.status(200).json({
                status: 'fail',
                message: 'Email này đã tồn tại. Vui lòng chọn email khác để đăng ký tài khoản',
            })
        }
    },
}