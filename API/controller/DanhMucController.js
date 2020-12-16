const { DbUrl, dbName , soItemMoiPageAdmin} = require('../config/constant');
const { MongoClient, ObjectID } = require('mongodb');
const { query } = require('express');

module.exports = {
    LayDanhSachDanhMuc: async function (req, res) {
        const page = req.params.page;
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        console.log('ket noi mongodb thanh cong');
        const col = client.db(dbName); // lay ten database
        const colsanpham = col.collection('DanhMuc');
        const dsalldanhmuc = await colsanpham.find({}).toArray();
        const dsdm = await colsanpham.find({}).limit(soItemMoiPageAdmin).skip(soItemMoiPageAdmin * page).toArray();
        let soTrang = Math.ceil(parseInt(dsalldanhmuc.length) / soItemMoiPageAdmin);
        client.close();
        res.json({
            status: 'thanhcong',
            data: dsdm,
            soTrang: soTrang
        })
    },
    LayDanhSachDanhMucTrangChu: async function (req, res) {
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        console.log('ket noi mongodb thanh cong');
        const col = client.db(dbName); // lay ten database
        const colsanpham = col.collection('DanhMuc');
        const dsdm = await colsanpham.find({}).toArray();
        client.close();
        res.json({
            status: 'success',
            data: dsdm
        })
    },
    LayDanhSachDanhMucTheoTimKiem: async function (req, res) {
        const timkiem = req.query.timkiem;
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        console.log('ket noi mongodb thanh cong');
        const col = client.db(dbName); // lay ten database
        const colsanpham = col.collection('DanhMuc');
        const dsdm = await colsanpham.find({ ten: { $regex: timkiem } }).toArray();
        client.close();
        res.json({
            status: 'thanhcong',
            data: dsdm
        })
    },

    LayDataMotDanhMucTheoID: async function (req, res) {
        const id = ObjectID(req.query.id);

        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        console.log('ket noi mongodb thanh cong');
        const col = client.db(dbName); // lay ten database
        const colsanpham = col.collection('DanhMuc');
        const sp = await colsanpham.findOne({ _id: id });
        client.close();
        res.json({
            status: 'thanhcong',
            data: sp
        })
    },
    ThemCategory: async function (req, res) {
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
        let categoryThem = {

            ten: req.body.ten,

            icon: req.body.icon,

            isLock: false,

        }

        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(dbName);
        const colCategory = db.collection('DanhMuc');
        let result = await colCategory.insertOne(categoryThem);
        client.close();
        if (result.insertedCount > 0) {
            res.status(200).json({
                status: 'success',
                message: 'Thêm thành công'
            });
        } else {
            res.status(200).json({
                status: 'fail',
                message: 'Thêm thất bại!'
            })
        }
    },

    SuaCategory: async function (req, res) {
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
        let categorySua = {
            _id: ObjectID(req.body._id),
            ten: req.body.ten,
            icon: req.body.icon,
            isLock: req.body.trangthai,

        }

        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(dbName);
        const colCategory = db.collection('DanhMuc');
        let result = await colCategory.updateOne({ _id: categorySua._id }, {
            $set: {
                ten: categorySua.ten,
                icon: categorySua.icon,
                isLock: categorySua.isLock
            }
        });

        client.close();

        res.status(200).json({
            status: 'success',
            message: 'Sửa thành công'
        });
    },

    XoaCategory: async function (req, res) {
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
        let id = ObjectID(req.query.id);


        console.log(id)
        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(dbName);
        const colCategory = db.collection('DanhMuc');
        let result = await colCategory.deleteOne({ _id: id });
        console.log(result);
    },
    KhoaCategory: async function (req, res) {
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });

        let id = req.body.id;
     
        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(dbName);
        const colCategory = db.collection('DanhMuc');
        let result = await colCategory.updateOne({ _id: ObjectID(id) }, { $set: { isLock: true } });
        client.close();
        res.status(200).json({
            status: 'thanhcong',
            message: 'Khóa thành công !'
        });

    },
    // LayDanhSachCategory_Search_NguoiDung: async function (req, res) {
    //     const timkiem = req.query.search;
    //     console.log(search);
    //     const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
    //     await client.connect();
    //     console.log("Connected correctly to server");
    //     const db = client.db(dbName);
    //     const colCategory = db.collection('DanhMuc');
    //     const colProduct = db.collection('SanPham');

    //     let arrCategory = await colCategory.find({ ten: { $regex: timkiem } }).toArray();
    //     console.log(arrCategory);
    //     let arrCount = [];
    //     for (let index = 0; index < arrCategory.length; index++) {
    //         let arrProduct = await colProduct.find({ idCategory: arrCategory[index]._id.toString() }).toArray();
    //         arrCount.push(arrProduct.length);

    //     }
    //     client.close();

    //     res.status(200).json({
    //         status: 'success',
    //         data: arrCategory,
    //         dataCount: arrCount
    //     });
    // },
    // làm tới đây 
    LayCategoryTheoIDSanPham: async function (req, res) {
        const iddanhmuc = req.query.id;
       
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        console.log('ket noi mongodb thanh cong');
        const col = client.db(dbName); // lay ten database
        const coldanhmuc = col.collection('DanhMuc');
        const danhmuc = await coldanhmuc.findOne({ _id: ObjectID(iddanhmuc) });
       
        client.close();
        res.json({
            status: 'thanhcong',
            data: danhmuc
        });
    },
    LayDanhMucTheoID: async function (req, res) {
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
        let categoryID = req.query.id;
        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(dbName);
        const colCategory = db.collection('DanhMuc');
        let result = await colCategory.findOne({ _id: ObjectID(categoryID) });
        client.close();
        if (result === null) {
            res.status(200).json({
                status: 'fail',
                message: 'Không có dữ liệu',
            })
        } else {
            res.status(200).json({
                status: 'success',
                message: 'Lấy dữ liệu thành công',
                data: result
            });
        }
    },
    LaySanPhamTheoDanhMuc: async function (req, res) {
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
        let categoryID = req.query.id;
        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(dbName);
        const colCategory = db.collection('SanPham');
        let result = await colCategory.find({ ID_DanhMuc: categoryID }).toArray();
        client.close();
        if (result === null) {
            res.status(200).json({
                status: 'fail',
                message: 'Không có dữ liệu',
            })
        } else {
            res.status(200).json({
                status: 'success',
                message: 'Lấy dữ liệu thành công',
                data: result
            });
        }
    },
}