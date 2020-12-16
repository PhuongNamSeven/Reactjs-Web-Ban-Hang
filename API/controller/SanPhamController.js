const { DbUrl, dbName } = require('../config/constant');
const { MongoClient, ObjectID } = require('mongodb');
const { query } = require('express');
const { BoDau } = require('../functionHoTro/index');
module.exports = {
    LayDanhSachSanPham: async function (req, res) {
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true }); // ket nối mongodb
        await client.connect(); // kết nối 
        console.log('ket noi mongodb thanh cong'); // kiem tra ket noi thanh cong 
        const col = client.db(dbName); // lay ten database 
        const colsanpham = col.collection('SanPham'); // tao 1 biến tìm bảng san phma
        const dssp = await colsanpham.find({}).toArray(); // tao 1 bien mang dssp 
        client.close(); // ngat ket noi
        // tra json ve client
        res.status(200).json({
            status: 'success',
            data2: dssp
        })
    },
    LaySanPhamTheoID: async function (req, res) {

        const id = req.query.id3;
        console.log(id);
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        console.log('ket noi mongodb thanh cong');
        const col = client.db(dbName); // lay ten database
        const colsanpham = col.collection('SanPham');
        const sp = await colsanpham.findOne({ _id: ObjectID(id) });
        client.close();
        if (sp === null) {
            res.json({
                status: 'thatbai'
            })
        } else {
            res.json({
                status: 'thanhcong',
                data: sp
            })
        }
    },
    TaoSanPhamShop: async function (req, res) {

        let SanPhamShop = {
            ten: req.body.ten,
            gia: req.body.gia,
            mota: req.body.mota,
            hinhanhsanphamshop: req.body.hinhanhsanphamshop,
            idUser: req.body.idUser,
            hienthi: req.body.hienthi // khach hang mua va thanh toan k thanh toan 
        }

        console.log(SanPhamShop)

        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(dbName);
        const colSanPhamShop = db.collection('SanPham');
        const ketquatrung = await colSanPhamShop.findOne({ ten: SanPhamShop.ten, hienthi: false });

        console.log(ketquatrung);
        if (ketquatrung === null) {
            const result = await colSanPhamShop.insertOne(SanPhamShop);
            client.close();

            if (result.insertedCount > 0) {
                res.status(200).json({
                    status: 'thanhcong',
                    message: 'Tao san pham thanh cong',
                })
            } else {
                res.status(200).json({
                    status: 'thatbai',
                    message: 'Tao san pham that bai',
                });
            }

        } else {
            res.status(404).json({
                status: 'thanhbai',
                message: 'San Pham trung ten',
            })
        }


    },
    LayDanhSachProductTheoIDBaiViet: async function (req, res) {
        const id = req.query.id; // id cua Carousel
        const page = req.params.page
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });

        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(dbName);
        const colProduct = db.collection('SanPham'); // 1
        const colPost = db.collection('Carousel'); // 2

        const result = await colPost.findOne({ _id: ObjectID(id) });
        let allProduct = await colProduct.find().toArray();
        client.close();
        let arrProduct = [];

        if (result === null) {
            res.status(200).json({
                status: 'fail',
                message: 'Lấy danh sách sản phẩm theo bài viết thất bại'
            });
        } else {
            for (let index = 0; index < result.idProducts.length; index++) { // nhung id san pham thuoc Carousel 2
                for (let index2 = 0; index2 < allProduct.length; index2++) { // san pham 7
                    if (result.idProducts[index] === allProduct[index2]._id.toString()) { // id của SP === id cua CArousel
                        arrProduct.push(allProduct[index2]); // push du lieu mang cai tao
                        break;
                    }
                }
            }

            res.status(200).json({
                status: 'success',
                data: arrProduct,
                message: 'Lấy danh sách sản phẩm theo bài viết thất bại'
            });
        }



    },
    LayDanhSachDataSearchLichSuTimKiem: async function (req, res) {
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
        const id = req.query.id;
        console.log("id nguoi search"+id);
        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(dbName);
        const colDataSearch = db.collection('Datasearch');
        let result = await colDataSearch.find({ idUser: id }).sort({ _id: -1 }).limit(5).toArray();

        res.status(200).json({
            status: 'success',
            message: 'Lấy danh sách lịch sử tìm kiếm thành công',
            data: result
        });
    },
    CapNhatTimKiem: async function (req, res) {
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
        const id = req.body.id;
        const dataSearchThem = {
            ten: req.body.search,
            lowerTen: BoDau(req.body.search),
            count: 1,
            idUser: []
        }

        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(dbName);
        const colDataSearch = db.collection('Datasearch');
        let result = await colDataSearch.findOne({ lowerTen: dataSearchThem.lowerTen });

        if (result) {
            let ketqua = 0;
            let arrUser = result.idUser;
            if (id === undefined) {
                await colDataSearch.findOneAndUpdate({ lowerTen: dataSearchThem.lowerTen }, { $inc: { count: 1 } });
            } else {
                for (let index = 0; index < result.idUser.length; index++) {
                    if (result.idUser[index] === id) { // chi 1 thang search
                        ketqua = 1;
                        break;
                    }
                }
                if (ketqua === 1) {
                    await colDataSearch.findOneAndUpdate({ lowerTen: dataSearchThem.lowerTen }, { $inc: { count: 1 } });
                } else {
                    arrUser.push(id);
                    await colDataSearch.findOneAndUpdate({ lowerTen: dataSearchThem.lowerTen }, {
                        $inc: { count: 1 }, $push: {
                            "idUser": id // nhieu thang search
                        }
                    });
                }
            }
        } else {
            if (id === undefined) {
                await colDataSearch.insertOne(dataSearchThem);
            } else {
                dataSearchThem.idUser.push(id);
                await colDataSearch.insertOne(dataSearchThem);
            }
        }
        client.close();

        res.status(200).json({
            status: 'success',
            message: 'Cập nhật thành công'
        });

    },
    LayTatCaSanPham_Search_NguoiDung_TheoTrang: async function (req, res) {
       
        const search = BoDau(req.query.search);
        
        console.log(search);
    

       

        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(dbName);
        const colProduct = db.collection('SanPham');
        let allProduct = await colProduct.find({lowerCase: { '$regex': search, '$options': '$i' }}).toArray();
        console.log(allProduct);
        client.close();

        res.status(200).json({
            status: 'success',
            data: allProduct,
           
        });
    },
}