const { DbUrl, dbName } = require('../config/constant');
const { MongoClient, ObjectID } = require('mongodb');
const { query } = require('express');

module.exports = {
    LayDanhSachThongBao : async function(req,res){
        const client = new MongoClient(DbUrl); // ket nối mongodb
        await client.connect(); // kết nối 
        console.log('ket noi mongodb thanh cong');
        const col = client.db(dbName); // lay ten database
        const colthongbao = col.collection('ThongBao'); // tao 1 biến tìm bảng san phma
        const dstb = await colthongbao.find({}).toArray(); // tao 1 bien dssp 
        client.close();
        res.json({
            status : 'thanhcong',
            data : dstb
        })
    }

}
