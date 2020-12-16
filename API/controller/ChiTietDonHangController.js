const { DbUrl, dbName, phanTramChietKhau } = require('../config/constant');
const { MongoClient, ObjectID } = require('mongodb');
const { query } = require('express');

module.exports = {

    LayDoanhThu_HomNay_Admin: async function (req, res) {
        var ngayHomNay = new Date();
        const client = new MongoClient(DbUrl);
        await client.connect();
        console.log('ket noi mongodb thanh cong');
        const col = client.db(dbName); // lay ten database
        const colctdh = col.collection('ChiTietDonHang');
        const ctdh = await colctdh.find({ trangthai: 4 }).toArray();

        var doanhThu = 0;
        //so sanh ngay hoan thanh bang new date 
        // doanh thu hom nay
        for (let index = 0; index < ctdh.length; index++) {

            if (ctdh[index].ngayhoanthanh.getDate() === ngayHomNay.getDate() &&
                ctdh[index].ngayhoanthanh.getMonth() === ngayHomNay.getMonth() &&
                ctdh[index].ngayhoanthanh.getFullYear() === ngayHomNay.getFullYear()) {

                doanhThu += ctdh[index].gia * phanTramChietKhau / 100;
            }
        }

        console.log(doanhThu)

        client.close();
        res.json({
            status: 'thanhcong',
            data: doanhThu
        })
    },

    LayDoanhThu_TuanNay_Admin: async function (req, res) {
        var ngayHomNay = new Date();
        var ngayDauTienCuaTuanNay = ngayHomNay.getDate() - ngayHomNay.getDay();
        var ngayDauTienCuaTuanTruoc = new Date(ngayHomNay.getFullYear(), ngayHomNay.getMonth(), ngayDauTienCuaTuanNay - 7);

        var firstDay = new Date(ngayHomNay.setDate(ngayDauTienCuaTuanNay));

        var arrDate = [];

        for (let index = 1; index <= 7; index++) {
            var dateThem = new Date(firstDay.getFullYear(), firstDay.getMonth(), firstDay.getDate() + index);
            arrDate.push(dateThem);
        }

        const client = new MongoClient(DbUrl);
        await client.connect();
        console.log('ket noi mongodb thanh cong');
        const col = client.db(dbName); // lay ten database
        const colctdh = col.collection('ChiTietDonHang');
        const ctdh = await colctdh.find({ trangthai: 4 }).toArray();

        var arrDoanhThu = [];

        for (let index = 0; index < arrDate.length; index++) {
            var doanhThu = 0;

            for (let index2 = 0; index2 < ctdh.length; index2++) {
                if (arrDate[index].getDate() === ctdh[index2].ngayhoanthanh.getDate() &&
                    arrDate[index].getMonth() === ctdh[index2].ngayhoanthanh.getMonth() &&
                    arrDate[index].getFullYear() === ctdh[index2].ngayhoanthanh.getFullYear()) {
                    doanhThu += ctdh[index2].gia * phanTramChietKhau / 100;
                }
            }

            arrDoanhThu.push(doanhThu);
        }

        var arrDateString = [];

        for (let index = 0; index < arrDate.length; index++) {
            var stringNgay = arrDate[index].getDate() + '/' + (arrDate[index].getMonth() + 1) + '/' + arrDate[index].getFullYear();
            arrDateString.push(stringNgay);

        }

        client.close();
        res.json({
            status: 'thanhcong',
            data: arrDoanhThu,
            dataNgay: arrDateString
        })
    },
    LayDoanhThu_TuanTruoc_Admin: async function (req, res) {
        var ngayHomNay = new Date();
        var ngayDauTienCuaTuanNay = ngayHomNay.getDate() - ngayHomNay.getDay();
        var ngayDauTienCuaTuanTruoc = ngayDauTienCuaTuanNay - 7;

        var firstDay = new Date(ngayHomNay.setDate(ngayDauTienCuaTuanTruoc));

        var arrDate = [];

        for (let index = 1; index <= 7; index++) {
            var dateThem = new Date(firstDay.getFullYear(), firstDay.getMonth(), firstDay.getDate() + index);
            arrDate.push(dateThem);
        }

        const client = new MongoClient(DbUrl);
        await client.connect();
        console.log('ket noi mongodb thanh cong');
        const col = client.db(dbName); // lay ten database
        const colctdh = col.collection('ChiTietDonHang');
        const ctdh = await colctdh.find({ trangthai: 4 }).toArray();

        var arrDoanhThu = [];

        for (let index = 0; index < arrDate.length; index++) {
            var doanhThu = 0;

            for (let index2 = 0; index2 < ctdh.length; index2++) {
                if (arrDate[index].getDate() === ctdh[index2].ngayhoanthanh.getDate() &&
                    arrDate[index].getMonth() === ctdh[index2].ngayhoanthanh.getMonth() &&
                    arrDate[index].getFullYear() === ctdh[index2].ngayhoanthanh.getFullYear()) {
                    doanhThu += ctdh[index2].gia * phanTramChietKhau / 100;
                }
            }

            arrDoanhThu.push(doanhThu);
        }

        var arrDateString = [];

        for (let index = 0; index < arrDate.length; index++) {
            var stringNgay = arrDate[index].getDate() + '/' + (arrDate[index].getMonth() + 1) + '/' + arrDate[index].getFullYear();
            arrDateString.push(stringNgay);

        }

        client.close();
        res.json({
            status: 'thanhcong',
            data: arrDoanhThu,
            dataNgay: arrDateString
        })
    },

}