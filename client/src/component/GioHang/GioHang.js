import React, { Fragment, useState, useEffect } from 'react';
import { axios } from '../../config/constant';
import { useCookies } from 'react-cookie';
import { Paypall, Header, Footer } from '../index';
import { Button, Image } from 'react-bootstrap';
import { InputNumber, Input, message } from 'antd';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify'

export default function GioHang(props) {
    const [dataGioHang, setDataGioHang] = useState([]);
    const [cookies] = useCookies();
    const [Total, setTotal] = useState(0);
    const [datashop, setDataShop] = useState({
        thongtinshop: {
            idShop: '',
            tenShop: '',
            logoShop: ''
        }
    });
    const transactionSuccess = (data) => {
    }
    const transactionError = () => {
        console.log('Paypal error')
    }
    const transactionCanceled = () => {
        console.log('Transaction canceled')
    }

    async function LayDanhSachGioHang() {
        let res = await axios.get('/giohang?idUser=' + cookies.userID);
        if (res.data.status === 'thanhcong') {
            setDataGioHang(res.data.data);
        } else {
            alert('ket noi Api san pham khong thanh cong');
        }
    }

    console.log(datashop);
    useEffect(() => {
        LayDanhSachGioHang();
    }, []);

    function format_curency(a) {
        a = a.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
        return a;
    }
    //thanh toán
    const [donHangThem, setDonHangThem] = useState({
        idUser: cookies.userID,
        tongSoSanPham: 0,
        tongTienDonHang: 0,
        ngayTao: new Date()
    });
    // thanh toan bang paypal
    const [donHangThem2, setDonHangThem2] = useState({
        idUser: cookies.userID,
        tongSoSanPham: 0,
        tongTienDonHang: 0,
        ngayTao: new Date()
    });
    // no them thuoc tinh san pham trong gio hang + iduser 
    // cong lai so luong san pham
    // async function LayDanhSachGioHang() {
    //     let res = await axios.get('/giohang?idUser=' + cookies.userID);
    //     if (res.data.status === 'thanhcong') {
    //         setDataGioHang(res.data.data);
    //     } else {
    //         alert('ket noi Api san pham khong thanh cong');
    //     }
    // }

    function TinhTongSoLuongVaTongTienDonHang() {
        var tongTien = 0;
        var tongSoLuong = 0;

        for (let index = 0; index < dataGioHang.length; index++) {
            tongTien += (dataGioHang[index].gia * dataGioHang[index].soluong);
            tongSoLuong += dataGioHang[index].soluong;
        }
        setDonHangThem({
            ...donHangThem,
            tongTienDonHang: tongTien,
            tongSoSanPham: tongSoLuong
        })
    }
   
   
    //thanh toán don hang
    async function ThanhToanGioHang() {
        let res = await axios.post('/donhang', {
            idUser: donHangThem.idUser,
            tongSoSanPham: donHangThem.tongSoSanPham,
            tongTienDonHang: donHangThem.tongTienDonHang,
            ngayTao: donHangThem.ngayTao,
            dataGioHang: dataGioHang
        });
        if (res.data.status === 'thanhcong') {
            alert('tao don hang thanh cong');
        } else {
            alert('tao don hang that bai');
        }
    }

    // thanh toán bằng paypall
    async function ThanhToanGioHang2() {
        let res = await axios.post('/donhangpaypall', {
            idUser: donHangThem2.idUser,
            tongSoSanPham: donHangThem2.tongSoSanPham,
            tongTienDonHang: donHangThem2.tongTienDonHang,
            ngayTao: donHangThem2.ngayTao,
            dataGioHang: dataGioHang
        });
        if (res.data.status === 'thanhcong') {
            window.location.pathname = '/GioHang';
            alert('tao don hang thanh cong');
            console.log(res.data);
        } else {
            alert('tao don hang that bai');
        }
    }

    useEffect(() => {
        LayDanhSachGioHang();
        TinhTongSoLuongVaTongTienDonHang();
    }, [dataGioHang]) // thay doi chay ham o tren

    return (
        <Fragment>
            <Header></Header>
            {/* <div className="px-4 px-lg-0">
              
                <div className="pb-5">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12 p-5 bg-white rounded shadow-sm mb-5">
                               
                                <div className="table-responsive">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th scope="col" className="border-0 bg-light">
                                                    <div className="p-2 px-3 text-uppercase">Product</div>
                                                </th>
                                                <th scope="col" className="border-0 bg-light">
                                                    <div className="py-2 text-uppercase">Price</div>
                                                </th>
                                                <th scope="col" className="border-0 bg-light">
                                                    <div className="py-2 text-uppercase">Quantity</div>
                                                </th>
                                                <th scope="col" className="border-0 bg-light">
                                                    <div className="py-2 text-uppercase">Remove</div>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                dataGioHang.map((item, index) => {
                                                    return <tr>
                                                        <th scope="row">
                                                            <div className="p-2">
                                                                <img src={item.img} alt="" width={70} className="img-fluid rounded shadow-sm" />
                                                                <div className="ml-3 d-inline-block align-middle">
                                                                    <h5 className="mb-0"> <a className="text-dark d-inline-block">{item.ten}</a></h5>
                                                                </div>
                                                            </div>
                                                        </th><td className="align-middle"><strong>{item.gia * item.soluong} VND</strong></td>
                                                        <td className="align-middle"><strong>{item.soluong}</strong></td>
                                                        <td className="align-middle"><a href="#" className="text-dark"><i className="fa fa-trash" /></a>
                                                        </td>
                                                    </tr>
                                                })
                                            }
                                            <tr style={{ height: '20px' }}>
                                                <td><h5 className="mb-0"> <a className="text-dark d-inline-block" style={{ marginLeft: '10px' }}> Tổng tiền </a></h5></td>
                                                <td className="align-middle"><strong>{donHangThem.tongTienDonHang} VND</strong></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                               
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="px-4 px-lg-0" style={{ marginTop: '-20px' }}>
               
                <div className="pb-5">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12 p-5 bg-white rounded shadow-sm mb-5">
                                
                                <div className="table-responsive">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th scope="col" className="border-0 bg-light">
                                                    <div className="p-2 px-3 text-uppercase">Hình thức thanh toán</div>
                                                </th>
                                                <th scope="col" className="border-0 bg-light">
                                                    <div className="p-2 px-3 text-uppercase">Chức năng</div>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td className="align-middle"><strong>
                                                    Thanh toán bình thường
                                                </strong>
                                                </td>
                                                <td className="align-middle"><strong>
                                                    <Button onClick={() => {
                                                        ThanhToanGioHang()
                                                    }}>Thanh toan don hang</Button>
                                                </strong>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="align-middle"><strong>
                                                    Thanh toán bằng Paypall
                                                </strong>
                                                </td>
                                                <td className="align-middle"><strong>
                                                    <Paypall
                                                        onClick={() => {
                                                            ThanhToanGioHang2()
                                                        }}
                                                        toPay={Total}
                                                        onSuccess={transactionSuccess}
                                                        transactionError={transactionError}
                                                        transactionCanceled={transactionCanceled}
                                                    ></Paypall>
                                                </strong>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                               
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}
            <div className="container" style={{ marginTop: '50px', backgroundColor: '#F8F9FA', height: 'auto', padding: 10 }}>
                <h4>GIỎ HÀNG({donHangThem.tongSoSanPham})</h4>
                <div className='row' style={{ padding: 20 }}>
                    <div className='col-sm-8'>
                        {
                            dataGioHang.map((item, i) => {
                                return <div key={i} className='row' style={{ backgroundColor: 'white', height: 'auto', padding: 10, borderRadius: 10, marginTop: 10 }}>
                                    <Image src={item.anh.chinh} style={{ width: 120, height: 140, marginLeft: 10 }}></Image>
                                    <div className='col-sm-6' style={{ marginLeft: 20 }}>
                                        <strong>
                                            {item.ten}
                                        </strong><br></br>
                                       
                                    </div>
                                    <div className='col-sm-3'>
                                        <div className='col'>
                                            <span style={{ fontSize: 20, fontWeight: 'bold' }}>{format_curency(item.gia.toString())}đ</span><br></br>

                                        </div>
                                        <div className='col'>
                                            <br></br>
                                            <InputNumber min={1} defaultValue={item.soluong} disabled
                                            />
                                        </div>
                                    </div>
                                </div>
                            })
                        }
                    </div>

                    <div className='col-sm-3' style={{ backgroundColor: 'white', padding: 10, borderRadius: 10, height: 'auto', marginTop: 10 }}>
                        <div className='col'>
                            <div className='row'>
                                <div className='col-sm-6'>
                                    <span style={{ float: 'left', fontSize: 16 }}>Tạm tính</span>
                                </div>
                                <div className='col-sm-6'>
                                    <span style={{ float: 'right', fontSize: 16, fontWeight: 'bold' }}>{format_curency(donHangThem.tongTienDonHang.toString())}đ</span>
                                </div>
                            </div>

                            <hr></hr>
                            <div className='row'>
                                <div className='col-sm-6'>
                                    <span style={{ float: 'left', fontSize: 16 }}>Thành tiền</span>
                                </div>
                                <div className='col-sm-6'>
                                    <span style={{ float: 'right', fontSize: 24, fontWeight: 'bold', color: 'red' }}>{format_curency(donHangThem.tongTienDonHang.toString())}đ</span>
                                </div>
                            </div>
                        </div>
                        <Link to='/GioHang/shipping' onClick={(e) => {
                            if (dataGioHang.length === 0) {
                                e.preventDefault();
                                toast.error('Chưa có sản phẩm nào trong giỏ hàng');
                            }
                        }}>
                            <Button style={{ width: '100%', height: 50, marginTop: 20 }}>Tiến hành đặt hàng</Button>
                        </Link>
                    </div>
                </div>
            </div>
           
        </Fragment >
    );
}

