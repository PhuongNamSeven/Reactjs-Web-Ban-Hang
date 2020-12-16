import React, { Fragment } from 'react';
import { Link, Switch, Route, useRouteMatch } from 'react-router-dom';
import { Header } from '../index';
import { ThongTinNguoiDung,LichSuDonHang } from '../index';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Menu, Row, Col } from 'antd';

const { SubMenu } = Menu;
export default function TKnguoidung() {
    const match = useRouteMatch();

    return (
        <Fragment>
            <Fragment>
                <Header></Header>
                <Row >
                    <Col xs={7} sm={6} md={4} lg={4}>
                        <Menu defaultOpenKeys={['sub1', 'sub2']}
                            mode="inline" theme="light"
                        >
                            <SubMenu key="sub1" title={<span><i className="far fa-address-card"></i>Quản lý tài khoản</span>}>
                                <Menu.Item >
                                    <Link to={`${match.url}/ttnguoidung`} style={{ textDecoration: 'none' }}>Thông tin người dùng</Link>
                                </Menu.Item>
                                
                            </SubMenu>
                            <SubMenu key="sub2" title={<span><i class="fas fa-history"></i>Đơn hàng</span>}>
                                <Menu.Item >
                                    <Link to={`${match.url}/lsdonhang`} style={{ textDecoration: 'none' }}>Lịch sử thanh toán</Link>
                                </Menu.Item>
                            </SubMenu>
                        </Menu>
                    </Col>
                    <Col xs={12} sm={18} md={20} lg={20}>
                        <Switch>
                            <Route exact path={`${match.url}/ttnguoidung`} component={ThongTinNguoiDung}></Route>
                            <Route exact path={`${match.url}/lsdonhang`} component={LichSuDonHang}></Route>
                            
                        </Switch>
                    </Col>
                </Row >
            </Fragment>
        </Fragment>
    )
}
