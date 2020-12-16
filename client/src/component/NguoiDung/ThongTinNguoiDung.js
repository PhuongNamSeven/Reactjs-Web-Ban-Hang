import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { axios } from '../../config/constant';
import { Collapse, Navbar, NavbarToggler, Nav, NavItem, NavbarText, Container } from 'reactstrap';
import { Skeleton, Switch, Card, Avatar } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';

const { Meta } = Card;
function ThongTinNguoiDung() {
    const state = {
        loading: true,
    };

    const onChange = checked => {
        this.setState({ loading: !checked });
    };
    const [cookies, setCookie] = useCookies();
    const [user, setUser] = useState({
        _id: '',
        ten: '',
        vaiTro: '',
        email: '',
        thongtinShop: {
            idShop: '',
            tenShop: '',
            diaChi: '',
            moTa: '',
            logoShop: ''
        },
        anh: ''
    });
    async function LayUserTheoID() {
        let res = await axios.get('/users-item?id=' + cookies.userID);

        if (res.data.status === 'thanhcong') {

            setUser({
                _id: res.data.data._id,
                ten: res.data.data.ten,
                vaiTro: res.data.data.vaitro,
                email: res.data.data.taikhoan.email,
                thongtinShop: {
                    idShop: res.data.data.thongtinshop.idShop,
                    tenShop: res.data.data.thongtinshop.ten,
                    diaChi: res.data.data.thongtinshop.diachi,
                    moTa: res.data.data.thongtinshop.mota,
                    logoShop: res.data.data.thongtinshop.logoShop
                },
                anh: res.data.data.anh
            })
        } else {
            alert(res.data.message);
        }
    }
    console.log(user);
    useEffect(() => {

        LayUserTheoID(cookies.userID) // lay theo cookie luu dê hien gmail
    }, [])
    return (
        <Fragment>
            <div className="row">
                <div className="col-sm-9 offset-1" style={{ display: 'flex' }}>
                    <Card style={{ width: 300, marginTop: 16 }} >
                        <Meta
                            avatar={
                                <Avatar src={user.anh} />
                            }
                            title={user.ten}
                            description={user.email}
                        />
                        <hr></hr>
                        {
                            user.vaiTro === 1 && (
                                <Fragment>
                                    <Meta
                                        avatar={
                                            <Avatar src={user.thongtinShop.logoShop} />
                                        }
                                        title="Thông tin Shop"
                                    />
                                    <h5>{user.thongtinShop.idShop}</h5>
                                    <h5>Tên Shop : {user.thongtinShop.tenShop}</h5>
                                    <h5>Mô Tả : {user.thongtinShop.moTa}</h5>
                                    <h5>Địa Chỉ : {user.thongtinShop.diaChi}</h5>

                                </Fragment>


                            )
                        }
                        {
                            user.vaiTro === 2 && (
                                <Fragment>
                                    <Meta
                                        title="Bạn chưa có shop. Vui lòng đăng ký shop =)))"
                                    />
                        
                                </Fragment>


                            )
                        }
                    </Card>


                </div>


            </div>
        </Fragment>
    )
}

export default ThongTinNguoiDung
