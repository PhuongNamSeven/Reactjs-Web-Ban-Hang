const { DbUrl, dbName } = require('../config/constant');
const { MongoClient, ObjectID } = require('mongodb');
const { query } = require('express');

module.exports = {

    ThemDonHang: async function (req, res) {

        let DonHangThem = {
            idUser: req.body.idUser,
            tongSoSanPham: req.body.tongSoSanPham,
            tongTienDonHang: req.body.tongTienDonHang,
            ngayTao: req.body.ngayTao,
            thongtinKhachHang:req.body.thongtinKhachHang,
            dataGioHang: req.body.dataGioHang
            // khach hang mua va thanh toan k thanh toan 
        }

        console.log(DonHangThem);



        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(dbName);
        const colDonHang = db.collection('DonHang');
        const colChiTietDonHang = db.collection('ChiTietDonHang');
        
        const result = await colDonHang.insertOne(DonHangThem);

        if (result.insertedCount > 0) {
            // console.log(result.ops[0]);

            for (let index = 0; index < DonHangThem.dataGioHang.length; index++) {
                var chitiet = {
                    idDonHang: result.ops[0]._id,
                    ten:DonHangThem.dataGioHang[index].ten,
                    gia:DonHangThem.dataGioHang[index].gia,
                    anh:DonHangThem.dataGioHang[index].anh,
                    soluong:DonHangThem.dataGioHang[index].soluong
                }

                await colChiTietDonHang.insertOne(chitiet);
            }

            res.status(200).json({
                status: 'thanhcong',
                message: 'Thêm don hang thành công',
            });
        } else {
            res.status(200).json({
                status: 'thatbai',
                message: 'Thêm don hang thất bại',
            });
        }


    },
    ThemDonHang2: async function (req, res) {

        let DonHangThem = {
            idUser: req.body.idUser,
            tongSoSanPham: req.body.tongSoSanPham,
            tongTienDonHang: req.body.tongTienDonHang,
            ngayTao: req.body.ngayTao,
            dataGioHang: req.body.dataGioHang
            // khach hang mua va thanh toan k thanh toan 
        }

        console.log(DonHangThem);



        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(dbName);
        const colDonHang = db.collection('DonHang');
        const colChiTietDonHang = db.collection('ChiTietDonHang');

        const result = await colDonHang.insertOne(DonHangThem);

        if (result.insertedCount > 0) {
            // console.log(result.ops[0]);

            for (let index = 0; index < DonHangThem.dataGioHang.length; index++) {
                var chitiet = {
                    idDonHang: result.ops[0]._id,
                    ten:DonHangThem.dataGioHang[index].ten,
                    gia:DonHangThem.dataGioHang[index].gia,
                    img:DonHangThem.dataGioHang[index].img,
                    soluong:DonHangThem.dataGioHang[index].soluong
                }

                await colChiTietDonHang.insertOne(chitiet);
            }

            res.status(200).json({
                status: 'thanhcong',
                message: 'Thêm don hang thành công',
            });
        } else {
            res.status(200).json({
                status: 'thatbai',
                message: 'Thêm don hang thất bại',
            });
        }
                    

    },
    ThanhToanThanhCong: async function (req, res) {
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
        const idUser = req.query.idUser;
        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(dbName);
        const colGioHang = db.collection('GioHang');
        let result = await colGioHang.updateMany({ idUser: idUser }, {
            $set: {
                trangthai:true,
            }
        });

        client.close();

        res.status(200).json({
            status: 'success',
            message: 'Sửa thành công'
        });
    },
    LayDanhSachDonHang: async function (req, res) {
        const idUser = req.query.idUser;
        const client = new MongoClient(DbUrl);
        await client.connect();
        console.log('ket noi mongodb thanh cong');
        const col = client.db(dbName); // lay ten database
        const colDonHang = col.collection('DonHang');
        const dsDonHang = await colDonHang.find({ idUser: idUser }).toArray();
        client.close();
        res.json({
            status: 'thanhcong',
            data: dsDonHang
        })
    },

}