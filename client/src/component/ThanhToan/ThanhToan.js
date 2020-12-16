// import React, { Fragment, useState, useEffect } from 'react';
// import { axios } from '../../config/constant';
// import { useCookies } from 'react-cookie';

// export default function ThanhToan(props) {
//     const [dataGioHang, setDataGioHang] = useState([]);
//     const [cookies, setCookie, removeCookie] = useCookies();

//     const [donHangThem, setDonHangThem] = useState({
//         idUser: cookies.userID,
//         tongSoSanPham: 0,
//         tongTienDonHang: 0,
//         ngayTao: new Date()
//     });

//     async function LayDanhSachGioHang() {
//         let res = await axios.get('/giohang?idUser=' + cookies.userID);
//         if (res.data.status === 'thanhcong') {
//             setDataGioHang(res.data.data);
//         } else {
//             alert('ket noi Api san pham khong thanh cong');
//         }
//     }

//     function TinhTongSoLuongVaTongTienDonHang() {
//         var tongTien = 0;
//         var tongSoLuong = 0;
//         for (let index = 0; index < dataGioHang.length; index++) {
//             tongTien += (dataGioHang[index].gia * dataGioHang[index].soluong);
//             tongSoLuong += dataGioHang[index].soluong;
//         }
//         console.log(tongTien);
//         setDonHangThem({
//             ...donHangThem,
//             tongTienDonHang: tongTien,
//             tongSoSanPham: tongSoLuong
//         })
//     }

//     async function ThanhToanGioHang() {
//         let res = await axios.post('/donhang', {
//             idUser: donHangThem.idUser,
//             tongSoSanPham: donHangThem.tongSoSanPham,
//             tongTienDonHang: donHangThem.tongTienDonHang,
//             ngayTao: donHangThem.ngayTao,
//             dataGioHang: dataGioHang
//         });
//         if (res.data.status === 'thanhcong') {
//             alert('tao don hang thanh cong');
//         } else {
//             alert('tao don hang that bai');
//         }
//     }

//     useEffect(() => {
//         LayDanhSachGioHang();
//     }, []);

//     useEffect(() => {
//         TinhTongSoLuongVaTongTienDonHang();
//     }, [dataGioHang]) // thay doi chay ham o tren

//     return (
//         <Fragment>
//             <div className="container">
//                 <h1 className="text-center"> Thanh toan</h1>
//                 <div className="row">
//                     <div className="col-xs-12 col-sm-12 col-md-4 well well-sm col-md-offset-4">
//                         <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike"></input>
//                         <label for="vehicle1"> thanh toan san pham</label><br></br>
//                         <br></br>
//                         <button onClick={() => {
//                             ThanhToanGioHang()
//                         }}>Thanh toan don hang</button>
//                     </div>
//                 </div>
//             </div>
//         </Fragment>
//     );
// }

