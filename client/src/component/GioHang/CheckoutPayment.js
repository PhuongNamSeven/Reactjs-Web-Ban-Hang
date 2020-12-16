import React, { useState, useEffect, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { axios } from '../../config/constant';
import { Steps, Radio, message, Breadcrumb } from 'antd';
import { Link, useHistory } from 'react-router-dom';
import { Button, Navbar, Nav } from 'react-bootstrap';
import { useCookies } from 'react-cookie';
import { Paypall, Header, Footer } from '../index';
import { toast } from 'react-toastify';

function CheckoutPayment() {
    const [dataGioHang, setDataGioHang] = useState([]);
    const dispatch = useDispatch();
    const history = useHistory();
    const [cookies, setCookie, removeCookie] = useCookies();
    const [valueRadioGiaoHang, setValueRadioGiaoHang] = useState(0);
    const [valueRadioThanhToan, setValueRadioThanhToan] = useState(0);
    const { Step } = Steps;
    const thongTinDatHang = useSelector(state => state.user);
    const steps = [
        {
            title: 'Đăng nhập',
        },
        {
            title: 'Địa chỉ giao hàng',
        },
        {
            title: 'Thanh toán & Đặt mua',
        },
    ];
    function format_curency(a) {
        a = a.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
        return a;
    }
    const radioStyle = {
        display: 'block',
        height: '30px',
        lineHeight: '30px',
    };
    async function LayDanhSachGioHang() {
        let res = await axios.get('/giohang?idUser=' + cookies.userID);
        if (res.data.status === 'thanhcong') {
            setDataGioHang(res.data.data);
        } else {
            alert('ket noi Api san pham khong thanh cong');
        }
    }
    console.log(dataGioHang);
    useEffect(() => {
        LayDanhSachGioHang();
    }, []);
    const [donHangThem, setDonHangThem] = useState({
        idUser: cookies.userID,
        tongSoSanPham: 0,
        tongTienDonHang: 0,
        ngayTao: new Date()
    });
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
    async function ThanhToanGioHang() {
        let res = await axios.post('/donhang', {
            idUser: donHangThem.idUser,
            tongSoSanPham: donHangThem.tongSoSanPham,
            tongTienDonHang: donHangThem.tongTienDonHang,
            ngayTao: donHangThem.ngayTao,
            thongtinKhachHang: {
                hoTen: thongTinDatHang.hoTen,
                sdt: thongTinDatHang.sdt,
                diaChi: thongTinDatHang.diaChi,
                phuong: thongTinDatHang.phuong,
                quan: thongTinDatHang.quan,
                thanhPho: thongTinDatHang.thanhPho,
            },
            dataGioHang: dataGioHang
        });
        if (res.data.status === 'thanhcong') {
            toast.success('Đặt mua thành công. Vui lòng kiểm tra đơn hàng trong tài khoản của tôi =)');
            history.push('/GioHang/success');
        } else {
            toast.warning('Đặt mua không thành công. Vui lòng kiểm tra lại thông tin');
        }
    }
    useEffect(() => {
        LayDanhSachGioHang();
        TinhTongSoLuongVaTongTienDonHang();
    }, [dataGioHang])
    return (
        <Fragment>
            <Header></Header>
            <div className="container" style={{ height: 'auto', padding: 20 }}>
                <Breadcrumb>
                    <Breadcrumb.Item>
                        <a href="/">Trang Chủ</a>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        <a href="/" onClick={(e) => {
                            e.preventDefault();
                            window.location.pathname = 'GioHang/cart';
                        }}>Giỏ hàng</a>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        <a href="/" onClick={(e) => {
                            e.preventDefault();
                            window.location.pathname = 'GioHang/shipping';
                        }}>Địa chỉ giao hàng</a>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        <a href="/" onClick={(e) => {
                            e.preventDefault();
                            window.location.pathname = 'GioHang/payment';
                        }}>Thanh toán & Đặt mua</a>
                    </Breadcrumb.Item>
                </Breadcrumb>
                <br></br>
                <div className='col'>
                    <div>
                        <Steps current={2}>
                            {steps.map(item => (
                                <Step key={item.title} title={item.title} />
                            ))}
                        </Steps>
                    </div>
                    <br></br>
                    <br></br>
                    <div className='row'>
                        <div className='col-sm-9'>
                            <div>
                                <h6>1. Chọn hình thức giao hàng</h6>
                                <div style={{ height: 'auto', paddingLeft: 20 }}>
                                    <Radio.Group onChange={(e) => {
                                        setValueRadioGiaoHang(e.target.value);
                                    }} value={valueRadioGiaoHang}>
                                        <Radio style={radioStyle} value={0}>
                                            Giao hàng tiêu chuẩn
                                </Radio>
                                        {/* <Radio style={radioStyle} value={1} disabled>
                                        Giao hàng bằng GoViet
                                </Radio>
                                    <Radio style={radioStyle} value={2} disabled>
                                        Giao hàng bằng Grab
                                </Radio> */}
                                    </Radio.Group>
                                </div>
                            </div>
                            <div style={{ marginTop: 20 }}>
                                <h6>2. Chọn hình thức thanh toán</h6>
                                <div style={{ height: 'auto', paddingLeft: 20 }}>
                                    <Radio.Group onChange={(e) => {
                                        setValueRadioThanhToan(e.target.value);
                                    }} value={valueRadioThanhToan}>
                                        <Radio style={radioStyle} value={0}>
                                            Thanh toán tiền mặt khi nhận hàng
                                </Radio>
                                    </Radio.Group>
                                </div>
                            </div>
                            <div style={{ marginTop: 20 }}>
                                <h6 style={{ color: 'gray' }}>Thông tin người mua</h6>
                                <div className='col' style={{ height: 'auto', paddingLeft: 20 }}>
                                    <div className='row'>
                                        <div className='col-sm-2'>
                                            <strong>Họ tên:</strong>
                                        </div>
                                        <div className='col-sm-6'>
                                            {thongTinDatHang.hoTen}
                                        </div>
                                    </div>

                                    <div className='row'>
                                        <div className='col-sm-2'>
                                            <strong>Số điện thoại:</strong>
                                        </div>
                                        <div className='col-sm-6'>
                                            {thongTinDatHang.sdt}
                                        </div>
                                    </div>

                                    <div className='row'>
                                        <div className='col-sm-2'>
                                            <strong>Địa chỉ:</strong>
                                        </div>
                                        <div className='col-sm-6'>
                                            {
                                                thongTinDatHang.diaChi + ', phường ' + thongTinDatHang.phuong + ', quận ' + thongTinDatHang.quan + ', thành phố ' + thongTinDatHang.thanhPho
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='col' style={{ marginTop: 20 }}>
                                {
                                    valueRadioThanhToan === 0 && (
                                        // <Link to={'payment/success/' + thongTinDonHang.idShow} onClick={(e) => {

                                        <Button style={{ width: 300 }} variant="primary" size='lg'
                                            onClick={() => {
                                                ThanhToanGioHang();
                                                
                                            }}>ĐẶT MUA</Button>
                                    )
                                }

                                <br></br>
                                (Xin vui lòng kiểm tra lại thông tin trước khi Đặt mua)
                            </div>
                        </div>
                        <div className='col-sm-3' style={{ height: 'auto', backgroundColor: '#F8F9FA' }}>
                            <div className='row' style={{ padding: 10 }}>
                                <span>
                                    <strong>Đơn hàng ({donHangThem.tongSoSanPham} sản phẩm)</strong> &nbsp;
                                <Link to='/GioHang/cart'>Sửa</Link>
                                </span>

                            </div>
                            <hr style={{ marginTop: 5 }}></hr>
                            <div className='col'>
                                {
                                    dataGioHang.map((item, i) => {
                                        return <div className='row' key={i}>
                                            <div className='col-sm-8' style={{ height: 'auto', marginLeft: 0 }}>
                                                <strong>x{item.soluong}</strong> {item.ten} 
                                            </div>
                                            <div className='col-sm-4' style={{ paddingRight: 10 }}>
                                                <span style={{ float: 'right', fontWeight: 'bold' }}>{format_curency((item.soluong*item.gia).toString())}đ</span>
                                            </div>
                                        </div>
                                    })
                                }

                            </div>
                            <hr></hr>
                            <div className='col'>
                                <div className='row'>
                                    <div className='col-sm-8' style={{ height: 'auto', marginLeft: 0 }}>
                                        Tạm tính
                                </div>
                                    <div className='col-sm-4' style={{ paddingRight: 10 }}>
                                        <span style={{ float: 'right', fontWeight: 'bold' }}>{format_curency(donHangThem.tongTienDonHang.toString())}đ</span>
                                    </div>
                                </div>
                                <div className='row'>

                                </div>
                                <div className='row'>
                                    <div className='col-sm-8' style={{ height: 'auto', marginLeft: 0 }}>
                                        Phí vận chuyển
                                </div>
                                    <div className='col-sm-4' style={{ paddingRight: 10 }}>
                                        <span style={{ float: 'right', fontWeight: 'bold' }}>0đ</span>
                                    </div>
                                </div>
                            </div>
                            <hr></hr>
                            <div className='col'>
                                <div className='row'>
                                    <div className='col-sm-8' style={{ height: 'auto', marginLeft: 0 }}>
                                        Thành tiền
                                </div>
                                    <div className='col-sm-4' style={{ paddingRight: 10 }}>
                                        <span style={{ float: 'right', color: 'red', fontSize: 20, fontWeight: 'bold' }}>{format_curency(donHangThem.tongTienDonHang.toString())}đ</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>



            </div>
        </Fragment>
    )
}

export default CheckoutPayment
