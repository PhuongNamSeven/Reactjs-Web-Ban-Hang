const { DbUrl, dbName } = require('../config/constant');
const { MongoClient, ObjectID } = require('mongodb');
const { query } = require('express');

module.exports = {
    LayThongTinMotUserTheoID: async function (req, res) {
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
                message: 'Chúc mừng đăng nhập thành công ^^',
                data: user
            })
        }

    }
}