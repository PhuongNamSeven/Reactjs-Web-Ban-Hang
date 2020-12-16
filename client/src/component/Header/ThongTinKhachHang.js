import React, { Fragment, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Badge, Dropdown, Menu, Avatar } from 'antd';
import { axios } from '../../config/constant';
import { useCookies } from 'react-cookie';

export default function ThongTinKhachHang(props) {
    const history = useHistory();
    const [cookies, setCookies,removeCookie] = useCookies();
    // bien gio hang
    const [dataGioHang, setDataGioHang] = useState([]);
    // bien don hang
    const [donHangThem, setDonHangThem] = useState({
        idUser: cookies.userID,
        tongSoSanPham: 0,
        tongTienDonHang: 0,
        ngayTao: new Date()
    });
    // bien thong bao
    const [thongbao, setThongbao] = useState([]);
    // nhan user tu header truyen qua de hien thi ten
    const user = props.user;

    async function LayDanhSachGioHang() {
        let res = await axios.get('/giohang?idUser=' + cookies.userID);
        if (res.data.status === 'thanhcong') {
            setDataGioHang(res.data.data);

        } else {
            alert('ket noi Api san pham khong thanh cong');
        }
    }

    // ham thong bao
    async function LayDanhSachThongBao() {
        let res = await axios.get('/thongbao');
        if (res.data.status === 'thanhcong') {
            setThongbao(res.data.data);
        } else {
            alert('ket noi Api thong bao khong thanh cong');
        }
    }

    // hien thi menu thong bao cho dropdown
    const datathongbao = (
        <Menu>
            {
                thongbao.map((item, index) => {
                    if (index < 6) {
                        return (
                            <Menu.Item key={index} style={{ width: 350, overflow: 'hidden', marginRight: '5px' }}>
                                <h5>{item.tieuDe}</h5>
                                <p>{item.noiDung}</p>
                            </Menu.Item>
                        )
                    }
                })
            }
        </Menu>
    );

    // menu nguoi dung
    const menunguoidung = (
        <Menu>
            <Menu.Item>
                <a onClick={() => {
                    history.push('/nguoidung')
                }}> Tài khoản của tôi</a>
            </Menu.Item>
            <Menu.Item>
                <a onClick={() => {
                    dangXuat();
                }}>
                    Đăng xuất
                </a>
            </Menu.Item>
        </Menu>
    )

    const menuadmin = (
        <Menu>
            <Menu.Item>
                <a onClick={() => {
                    dangXuat();
                }}>
                    Đăng xuất
                </a>
            </Menu.Item>
        </Menu>
    )

    const dangXuat = () => {
        removeCookie('userID');
        history.push('/');
        window.location.pathname = "/";
    };

    // tinh tien va tong so luong de thanh toan
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

    useEffect(() => {
        LayDanhSachThongBao();
    }, []);

    useEffect(() => {
        LayDanhSachGioHang();
        TinhTongSoLuongVaTongTienDonHang();

    }, [dataGioHang]) // data gio hang thay doi tinh lai so luong

    return (
        <Fragment>
            {
                user.vaiTro === 1 && (
                    <Fragment>
                        <a style={{ textDecoration: 'none', marginRight: 15 }} onClick={() => {
                            history.push('/GioHang/cart');
                        }}>
                            <Badge count={donHangThem.tongSoSanPham} style={{ backgroundColor: '#52c41a', opacity: 0.9, fontWeight: 'bold' }}>
                                <i className="fa fa-cart-plus" style={{ fontSize: 24 }}></i>
                            </Badge>
                        </a>
                        <span id={'dsthongbao'} style={{ marginRight: 10 }} onClick={() => {
                            history.push('/thongbao');
                        }}>
                            <Dropdown overlay={datathongbao} placement="bottomLeft"
                                getPopupContainer={() => document.getElementById('dsthongbao')}>
                                <a>
                                    <i className="fas fa-bell" style={{ fontSize: 24 }}></i>
                                </a>
                            </Dropdown>
                        </span>
                        <span id={'thongtinnguoidung'} style={{ marginRight: 10 }} onClick={() => {
                            // history.push('/nguoidung');
                        }}>
                            <Dropdown overlay={menunguoidung} placement="bottomCenter"
                                getPopupContainer={() => document.getElementById('thongtinnguoidung')}>
                                <a>
                                    <Avatar size={28} style={{ marginBottom: 10 }} src={user.anh} />
                                    <span style={{ marginLeft: '5px', size: '24' }}>{user.email}</span>
                                </a>
                            </Dropdown>
                        </span>
                    </Fragment>
                )
            }
            {
                user.vaiTro === 2 && (
                    <Fragment>
                        <a style={{ textDecoration: 'none', marginRight: 15 }} onClick={() => {
                            history.push('/GioHang/cart');
                        }}>
                            <Badge count={donHangThem.tongSoSanPham} style={{ backgroundColor: '#52c41a', opacity: 0.9, fontWeight: 'bold' }}>
                                <i className="fa fa-cart-plus" style={{ fontSize: 24 }}></i>
                            </Badge>
                        </a>
                        <span id={'dsthongbao'} style={{ marginRight: 10 }} onClick={() => {
                            history.push('/thongbao');
                        }}>
                            <Dropdown overlay={datathongbao} placement="bottomLeft"
                                getPopupContainer={() => document.getElementById('dsthongbao')}>
                                <a>
                                    <i className="fas fa-bell" style={{ fontSize: 24 }}></i>
                                </a>
                            </Dropdown>
                        </span>
                        <span id={'thongtinnguoidung'} style={{ marginRight: 10 }} onClick={() => {
                            // history.push('/nguoidung');
                        }}>
                            <Dropdown overlay={menunguoidung} placement="bottomCenter"
                                getPopupContainer={() => document.getElementById('thongtinnguoidung')}>
                                <a>
                                    <Avatar size={28} style={{ marginBottom: 10 }} src={user.anh} />
                                    <span style={{ marginLeft: '5px', size: '24' }}>{user.email}</span>
                                </a>
                            </Dropdown>
                        </span>
                    </Fragment>
                )
            }
            {
                user.vaiTro === 0 && (
                    <span id={'thongtinadmin'} style={{ marginRight: 10 }} onClick={() => {
                        // history.push('/nguoidung');
                    }}>
                        <Dropdown overlay={menuadmin} placement="bottomCenter"
                            getPopupContainer={() => document.getElementById('thongtinadmin')}>
                            <a>
                                <Avatar size={28} style={{ marginBottom: 10 }} src={user.anh} />
                                <span style={{ marginLeft: '5px', size: '24' }}>{user.email}</span>
                            </a>
                        </Dropdown>
                    </span>
                )
            }
        </Fragment>
    )
}


