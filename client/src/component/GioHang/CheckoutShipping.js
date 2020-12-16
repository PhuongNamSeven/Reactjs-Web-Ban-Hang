import React, { Fragment, useState, useEffect } from 'react';
import { axios } from '../../config/constant';
import { useDispatch, useSelector } from 'react-redux';
import { Steps, Select, message, Breadcrumb } from 'antd';
import { Form, Row, Col, Button, Nav, Navbar } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { Paypall, Header, Footer } from '../index';

function CheckoutShipping() {
    const dispatch = useDispatch();
    const history = useHistory();
    const { Step } = Steps;
    const { Option } = Select;
    const [checkDuLieuNhap, setCheckDuLieuNhap] = useState(false);
    const [thongTin, setThongTin] = useState({
        hoTen: '',
        sdt: '',
        diaChi: '',
        phuong: '',
        quan: '',
        thanhPho: ''
    });
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

    function KiemTraThongTinNhap(data) {
        const regSDT = /^(0|\+84)(\s|\.)?((3[2-9])|(5[689])|(7[06-9])|(8[1-689])|(9[0-46-9]))(\d)(\s|\.)?(\d{3})(\s|\.)?(\d{3})$/;
        if (data.hoTen === '' || data.sdt === '' || data.diaChi === '' || data.phuong === '' || data.quan === '' || data.thanhPho === '') {
            message.error('Thông tin không hợp lệ. Vui lòng kiểm tra lại');
            return false;
        } else {
            if (regSDT.test(data.sdt)) {
                return true;
            } else {
                message.error('Số điện thoại không hợp lệ');
                return false;
            }
        }
    }
    useEffect(() => {
        if (checkDuLieuNhap === true) {
            history.push('/GioHang/payment');
            dispatch({ type: 'THONGTIN_DATHANG', thongTin: thongTin });
        }
    }, [checkDuLieuNhap])
    return (
        <Fragment>
            <Header />
            <div className="container" style={{ height: 'auto', padding: 10 }}>
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
                </Breadcrumb>
                <br></br>
                <div className='col'>
                    <div>
                        <Steps current={1}>
                            {steps.map(item => (
                                <Step key={item.title} title={item.title} />
                            ))}
                        </Steps>
                    </div>

                    <div style={{ marginTop: 50, padding: 20 }}>
                        <p><strong>2. Địa chỉ giao hàng</strong></p>
                        <div className='row'>
                            <div className='col-sm-2'>

                            </div>
                            <div className='col-sm-8' style={{ backgroundColor: '#F8F9FA', padding: 10 }}>
                                <Form>
                                    <Form.Group as={Row} controlId="formHorizontalHoTenMuaHang">
                                        <Form.Label column sm={3}>
                                            Họ tên
                                    </Form.Label>
                                        <Col sm={9}>
                                            <Form.Control type="text" placeholder='Nhập họ tên' onChange={(e) => {
                                                setThongTin({
                                                    ...thongTin,
                                                    hoTen: e.target.value
                                                });
                                            }}></Form.Control>
                                        </Col>
                                    </Form.Group>

                                    <Form.Group as={Row} controlId="formHorizontalSdtMuaHang">
                                        <Form.Label column sm={3}>
                                            Số điện thoại
                                    </Form.Label>
                                        <Col sm={9}>
                                            <Form.Control type="text" placeholder='Nhập số điện thoại' onChange={(e) => {
                                                setThongTin({
                                                    ...thongTin,
                                                    sdt: e.target.value
                                                });
                                            }}></Form.Control>
                                        </Col>
                                    </Form.Group>

                                    <Form.Group as={Row} controlId="formHorizontalDiaChiMuaHang1">
                                        <Form.Label column sm={3}>
                                            Tỉnh/Thành phố
                                    </Form.Label>
                                        <Col sm={9}>
                                            <Form.Control type="text" placeholder='Nhập họ tên' onChange={(e) => {
                                                setThongTin({
                                                    ...thongTin,
                                                    thanhPho: e.target.value
                                                });
                                            }}></Form.Control>
                                        </Col>
                                    </Form.Group>

                                    <Form.Group as={Row} controlId="formHorizontalDiaChiMuaHang2">
                                        <Form.Label column sm={3}>
                                            Quận/Huyện
                                    </Form.Label>
                                        <Col sm={9}>
                                            <Form.Control type="text" placeholder='Nhập họ tên' onChange={(e) => {
                                                setThongTin({
                                                    ...thongTin,
                                                    quan: e.target.value
                                                });
                                            }}></Form.Control>
                                        </Col>
                                    </Form.Group>

                                    <Form.Group as={Row} controlId="formHorizontalDiaChiMuaHang3">
                                        <Form.Label column sm={3}>
                                            Phường/Xã
                                    </Form.Label>
                                        <Col sm={9}>
                                            <Form.Control type="text" placeholder='Nhập họ tên' onChange={(e) => {
                                                setThongTin({
                                                    ...thongTin,
                                                    phuong: e.target.value
                                                });
                                            }}></Form.Control>
                                        </Col>
                                    </Form.Group>

                                    <Form.Group as={Row} controlId="formHorizontalPasswordDiaChiMuaHang">
                                        <Form.Label column sm={3}>
                                            Địa chỉ
                                    </Form.Label>
                                        <Col sm={9}>
                                            <Form.Control as='textarea' rows='3' onChange={(e) => {
                                                setThongTin({
                                                    ...thongTin,
                                                    diaChi: e.target.value
                                                })
                                            }}>
                                            </Form.Control>
                                        </Col>
                                    </Form.Group>

                                    <Form.Group as={Row}>
                                        <Col sm={{ span: 8, offset: 3 }}>
                                            <Link to='/' onClick={(e) => {
                                                e.preventDefault();
                                                setCheckDuLieuNhap(KiemTraThongTinNhap(thongTin));
                                            }}>
                                                <Button>Giao đến địa chỉ này</Button>
                                            </Link>
                                        </Col>
                                    </Form.Group>
                                </Form>
                            </div>
                            <div className='col-sm-2'>

                            </div>
                        </div>
                    </div>

                </div>
                



            </div>
            <Footer />
        </Fragment>
    )
}

export default CheckoutShipping
