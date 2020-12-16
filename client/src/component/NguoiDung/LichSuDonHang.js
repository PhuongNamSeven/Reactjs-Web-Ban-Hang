import React, { Fragment, useState, useEffect } from 'react';
import { axios } from '../../config/constant';
import { useCookies } from 'react-cookie';
import { Paypall, Header, Footer } from '../index';
import { Button, Image } from 'react-bootstrap';
import { Table } from 'antd';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify'

function LichSuDonHang() {
    const [dataDonHang, setDataDonHang] = useState([]);
    const [cookies] = useCookies();
    async function LayDanhSachDonHang() {
        let res = await axios.get('/donhang?idUser=' + cookies.userID);
        if (res.data.status === 'thanhcong') {
            setDataDonHang(res.data.data);
        } else {
            alert('ket noi Api san pham khong thanh cong');
        }
    }
    function format_curency(a) {
        a = a.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
        return a;
    }
    console.log(dataDonHang);
    useEffect(() => {
        LayDanhSachDonHang();
    }, []);
    return (
        <Fragment>
            <div className='container'>
                <div className='row'>
                    <span style={{ fontSize: 20 }}>Danh sách đơn hàng ({dataDonHang.length} đơn hàng)</span>
                    <br></br>
                </div>
                <div style={{ backgroundColor: 'white', width: '100%' }}>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Ngày đặt hàng</th>
                                <th>Tổng số sản phẩm</th>
                                <th>Sản phẩm đã mua</th>
                                <th>Tổng tiền</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                dataDonHang.map((item, i) => {
                                    return <tr key={i}>
                                        <td>{item._id}</td>
                                        <td>{item.ngayTao}</td>
                                        <td>{item.tongSoSanPham}</td>
                                        <td>
                                            {
                                                item.dataGioHang.map((sanpham, index) => {
                                                    return <h5>{sanpham.ten} x {sanpham.soluong} ( {format_curency((sanpham.gia).toString())}VND )</h5>
                                                })
                                            }
                                        </td>
                                        <td>{format_curency((item.tongTienDonHang).toString())} VND</td>
                                    </tr>
                                })
                            }

                        </tbody>
                    </table>
                </div>
            </div>
           
        </Fragment>
    )
}

export default LichSuDonHang
