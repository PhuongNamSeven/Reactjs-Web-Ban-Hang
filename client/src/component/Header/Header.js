import React, { Fragment, useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { axios } from '../../config/constant';
import { Collapse, Navbar, NavbarToggler, Nav, NavItem, NavbarText, Container } from 'reactstrap';
import { Row, Affix, Menu, Dropdown } from "antd";
import { ThongTinKhachHang } from '../index';
import { TimKiem } from '../index'
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { Form, FormControl,Button } from 'react-bootstrap';

export default function Header() {
    const [cookies, setCookie] = useCookies();
    const valueSearch = useSelector(state => state.valueSearch);
    const [dataLichSuTimKiem, setDataLichSuTimKiem] = useState([]);
    const history = useHistory();
    const dispatch = useDispatch();
    const [statusDangNhap, setStatusDangNhap] = useState(false);
    const [hienthi, setHienthi] = useState(false);
   
    const openModal = () => {
        setHienthi(true);
    };
    const closeModal = () => {
        setHienthi(false);
    };
    const menu = (
        <Menu>
            <span style={{ padding: 10 }}><strong>LỊCH SỬ TÌM KIẾM</strong></span>
            {
                cookies.userID !== undefined && (
                    dataLichSuTimKiem.map((item, i) => {
                        return <Menu.Item style={{ height: 30 }}>
                            <Link to='/' onClick={(e) => {
                                e.preventDefault();
                                history.push('/timkiem?data=' + item.ten );
                                dispatch({ type: 'VALUE_SEARCH', valueSearch: item.ten });
                            }}>
                                <div style={{ width: '100%' }}>
                                    <span>{item.ten}</span>
                                </div>
                            </Link>
                        </Menu.Item>
                    })
                )
            }

        </Menu>
    );
    // llay lich su tim kiem theo nguoi dung
    async function LayDataLichSuTimKiem() {
        let res = await axios.get('datasearch-lichsutimkiem?id=' + cookies.userID);

        if (res.data.status === 'success') {
            setDataLichSuTimKiem(res.data.data);
        } else {
            toast.warning('Lấy data lịch sử tìm kiếm thất bại');
        }
    }
    console.log(dataLichSuTimKiem);
    // tao bien gui form dang ky
    const [dangkytaikhoan, setdangkytaikhoan] = useState({
        ten: '',
        taikhoan: {
            email: '',
            password: ''
        },
        vaitro: ''
    });

    const [user, setUser] = useState({
        _id: '',
        ten: '',
        vaiTro: '',
        email: '',
        anh: ''
    });

    // tao bien gui form dang nhap
    const [taikhoan, setTaiKhoan] = useState({
        email: '',
        password: ''
    });

    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    const [visible, setVisible] = useState(false)
    const showDrawer = () => {
        setVisible(true)
    };
    const onClose = () => {
        setVisible(false)
    };

    async function LayUserTheoID() {
        let res = await axios.get('/users-item?id=' + cookies.userID);

        if (res.data.status === 'thanhcong') {

            setUser({
                _id: res.data.data._id,
                ten: res.data.data.ten,
                vaiTro: res.data.data.vaitro,
                email: res.data.data.taikhoan.email,
                anh: res.data.data.anh
            })
        } else {
            alert(res.data.message);
        }
    }

    // kiem tra account lay id va truyen vao cookie
    async function KiemTraAccount() {
        let res = await axios.post('/dangnhap', {
            email: taikhoan.email,
            password: taikhoan.password
        })
        if (res.data.status === 'thanhcong') {
            // kiem tra và chuyển vể giao dien tuong ung
            if (res.data.data.vaiTro === 0) {
                window.location.pathname = '/Admin';
            }
            else {
                window.location.pathname = '/';

            }
            setCookie('userID', res.data.data.userID); // truyen du lieu nguoi dung cho cookie ,dat tên là 'userID'
        } else {
            alert('dang nhap that bai');
        }
    }

    // ham dang ky tai khoan
    async function KiemTraDangKy() {
        let res = await axios.post('/dangky', {
            ten: dangkytaikhoan.ten,
            email: dangkytaikhoan.email,
            password: dangkytaikhoan.password
        })
        if (res.data.status === 'thanhcong') {
            alert('dang ky thanh cong');
            window.location.pathname = '/';
        } else {
            alert('dang ky that bai');
        }
    }
    /**
     * TODO: 
     */
    console.log(user)
    async function CapNhatTimKiem() {
        let res = await axios.post('datasearch-capnhat', {
            search: valueSearch,
            id: cookies.userID
        })
    }
    useEffect(() => {
        if (cookies.userID !== undefined) {
            setStatusDangNhap(true);
            LayUserTheoID(cookies.userID) // lay theo cookie luu dê hien gmail
        } else {
            setStatusDangNhap(false);
        }
    }, [])

    return (
        <Fragment>
            <Affix offsetTop={0}>
                <Navbar color="light" light expand="md" style={{}}>
                    <Container>
                        <div className={'d-none d-md-block'}>
                            <Link to='/'>
                                <div className={'navbar-brand'} style={{ marginTop: 17, fontFamily: 'Sofia' }}>
                                    <h1>
                                        <i className="fas fa-dragon"></i>
                                        Home
                                    </h1>
                                </div>
                            </Link>
                        </div>
                        {/* shop cua ban */}
                        {
                            user.vaiTro === 1 && (
                                <Link to='/ShopCuaBan'>
                                    <button type="button" class="btn btn-light" style={{ marginTop: '10px' }}>
                                        Shop của bạn
                                    </button>
                                </Link>
                            )
                        }


                        {
                            user.vaiTro === 2 && (
                                <Link to='/DangKyGianHang'>
                                    <button type="button" class="btn btn-light" style={{ marginTop: '10px' }}>
                                        Đăng ký gian hàng
                                    </button>
                                </Link>
                            )
                        }
                        {/* search */}
                        {/* <TimKiem></TimKiem> */}
                        <Form inline>
                            <Dropdown overlay={menu} trigger={['click']} disabled>
                                <FormControl type="text" value={valueSearch} placeholder="Tìm sản phẩm" className="mr-sm-2" style={{ width: 350 }} onChange={(e) => {
                                    dispatch({ type: 'VALUE_SEARCH', valueSearch: e.target.value });
                                }}
                                    onClick={() => {
                                        if (cookies.userID !== undefined) {
                                            LayDataLichSuTimKiem();
                                        }
                                    }} />
                            </Dropdown>

                            <Button variant="outline-primary" disabled style={{ width: 'auto' }} onClick={() => {
                                if (valueSearch !== '') {
                                    CapNhatTimKiem();
                                    history.push('/timkiem?data=' + valueSearch );
                                   
                                }
                            }}>Tìm Kiếm</Button>
                        </Form>
                        <NavbarToggler onClick={toggle} />
                        <Collapse isOpen={isOpen} navbar>
                            <Nav className="mr-auto" navbar>
                                <NavItem>
                                </NavItem>
                            </Nav>
                            <NavbarText>
                                {
                                    statusDangNhap === false && (
                                        <Fragment>
                                            <button type="button" onClick={openModal} className="btn btn-light" data-toggle="modal" data-target="#exampleModalCenter">
                                                Đăng nhập
                                            </button> |
                                            <button type="button" onClick={openModal} class="btn btn-light" data-toggle="modal" data-target="#exampleModalCenter2">
                                                Đăng ký
                                            </button>
                                        </Fragment>
                                    )
                                }
                                {
                                    statusDangNhap && (
                                        <Fragment>
                                            <Row>
                                                <ThongTinKhachHang user={user}></ThongTinKhachHang>
                                            </Row>
                                        </Fragment>
                                    )
                                }
                            </NavbarText>
                        </Collapse>
                    </Container>
                </Navbar>
            </Affix>
            <div style={{ marginBottom: '1%' }}></div>
            {/* Modal dang nhap*/}
            {
                hienthi && (
                    <div className="modal fade" id="exampleModalCenter" tabIndex={-1} role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered" role="document">
                            <div className="modal-content" style={{ height: '260px', width: '400px' }}>
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLongTitle">Đăng nhập</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">×</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    {/* form dang nhap */}
                                    <form style={{ padding: '30px', textAlign: 'center', }}>
                                        <div>
                                            <div className="form-group row">
                                                <label style={{ fontSize: '12px' }} htmlFor="inputEmail3" className="col-sm-3 col-form-label"> Tài khoản  </label>
                                                <div className="col-sm-9">
                                                    <input type="email" className="form-control form-control-lg" id="inputEmail3" placeholder="Email" onChange={(e) => {
                                                        setTaiKhoan({
                                                            ...taikhoan,//giu lai giu lieu truoc do 
                                                            email: e.target.value
                                                        })
                                                    }} />
                                                </div>
                                            </div>
                                            <div className="form-group row" style={{ paddingTop: '10px' }}>
                                                <label style={{ fontSize: '12px' }} htmlFor="inputPassword3" className="col-sm-3 col-form-label" > Mật khẩu  </label>
                                                <div className="col-sm-9">
                                                    <input type="password" className="form-control form-control-lg" id="inputPassword3" placeholder="Password" onChange={(e) => {
                                                        setTaiKhoan({
                                                            ...taikhoan,
                                                            password: e.target.value
                                                        })
                                                    }} />
                                                </div>
                                            </div>
                                        </div>

                                    </form>
                                </div>
                                <div className="modal-footer">
                                    {/* <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button> */}
                                    <button type="button" className="btn btn-primary" onClick={(e) => {
                                        e.preventDefault();
                                        KiemTraAccount()
                                    }}>Đăng nhập</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
            {/* Modal dang ky*/}
            {
                hienthi && (
                    <div className="modal fade" id="exampleModalCenter2" tabIndex={-1} role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered" role="document">
                            <div className="modal-content" style={{ height: '300px', width: '400px' }}>
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLongTitle">Đăng ký</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">×</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    {/* form dang nhap */}
                                    <form style={{ padding: '20px', textAlign: 'center', }}>
                                        <div>
                                            <div className="form-group row">
                                                <label style={{ fontSize: '12px' }} htmlFor="inputEmail3" className="col-sm-3 col-form-label"> Tên  </label>
                                                <div className="col-sm-9">
                                                    <input type="text" className="form-control form-control-lg" id="inputEmail3" placeholder="your name" onChange={(e) => {
                                                        setdangkytaikhoan({
                                                            ...dangkytaikhoan,
                                                            ten: e.target.value
                                                        })
                                                    }} />
                                                </div>
                                            </div>
                                            <div className="form-group row" style={{ paddingTop: '10px' }}>
                                                <label style={{ fontSize: '12px' }} htmlFor="inputEmail3" className="col-sm-3 col-form-label"> Tài khoản  </label>
                                                <div className="col-sm-9">
                                                    <input type="email" className="form-control form-control-lg" id="inputEmail3" placeholder="Email" onChange={(e) => {
                                                        setdangkytaikhoan({
                                                            ...dangkytaikhoan,
                                                            email: e.target.value
                                                        })
                                                    }} />
                                                </div>
                                            </div>
                                            <div className="form-group row" style={{ paddingTop: '10px' }}>
                                                <label style={{ fontSize: '12px' }} htmlFor="inputPassword3" className="col-sm-3 col-form-label" > Mật khẩu  </label>
                                                <div className="col-sm-9">
                                                    <input type="password" className="form-control form-control-lg" id="inputPassword3" placeholder="Password" onChange={(e) => {
                                                        setdangkytaikhoan({
                                                            ...dangkytaikhoan,
                                                            password: e.target.value
                                                        })
                                                    }} />
                                                </div>
                                            </div>
                                        </div>

                                    </form>
                                </div>
                                <div className="modal-footer">
                                    {/* <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button> */}
                                    <button type="button" className="btn btn-primary" onClick={(e) => {
                                        e.preventDefault();
                                        KiemTraDangKy()
                                    }}>Đăng ký</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </Fragment>
    );
}

