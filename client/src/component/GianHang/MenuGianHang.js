import React, { Fragment } from 'react';
import { Link, Switch, Route, useRouteMatch } from 'react-router-dom';
import { QLDoanhThuComponent, QLBaiVietComponent, QLBlogComponent, ThongTinGianHang, QuanLyTinTuc, GianHangTaoSanPham } from '../index';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Menu, Row, Col } from 'antd';

const { SubMenu } = Menu;
export default function MenuGianHang() {
    const match = useRouteMatch();

    return (
        <Fragment>
            <Row >
                <Col xs={7} sm={6} md={4} lg={4}>
                    <Menu defaultOpenKeys={['sub1', 'sub2', 'sub3']}
                        mode="inline" theme="light"
                    >
                        <SubMenu key="sub1" title={<span><i className="far fa-address-card"></i>Thông tin gian hàng</span>}>
                            <Menu.Item >
                                <Link to={`${match.url}/thongtingianhang`} style={{ textDecoration: 'none' }}>Shop của bạn</Link>
                            </Menu.Item>
                        </SubMenu>
                        <SubMenu key="sub3" title={<span><i className="fab fa-cc-paypal"></i>Quản lý tin tức</span>}>
                            <Menu.Item >
                                <Link to={`${match.url}/quanlytintuc`} style={{ textDecoration: 'none' }}>Quản lý Tin tức</Link>
                            </Menu.Item>
                        </SubMenu>

                        <SubMenu key="sub2" title={<span><i className="fas fa-dragon"></i>Quản lý sản phẩm</span>}>
                            <Menu.Item >
                                <Link to={`${match.url}/quanlysanpham`} style={{ textDecoration: 'none' }}>Tạo sản phẩm</Link>
                            </Menu.Item>
                        </SubMenu>
                        <SubMenu key="sub5" title={<span><i className="fas fa-cart-arrow-down"></i>Quản lý doanh thu</span>}>
                            <Menu.Item>
                                <Link to={`${match.url}/qldoanhthu`} style={{ textDecoration: 'none' }}>Quản lý doanh thu</Link>
                            </Menu.Item>
                        </SubMenu>
                        <SubMenu key="sub6" title={<span><i className="fas fa-cogs"></i>Quản lý cài đặt</span>}>
                        </SubMenu>
                    </Menu>
                </Col>
                <Col xs={12} sm={18} md={20} lg={20}>
                    <Switch>
                        <Route exact path={`${match.url}/thongtingianhang`} component={ThongTinGianHang}></Route>
                        <Route exact path={`${match.url}/quanlytintuc`} component={QuanLyTinTuc}></Route>
                        <Route exact path={`${match.url}/qldoanhthu`} component={QLDoanhThuComponent}></Route>
                        <Route exact path={`${match.url}/qlbaiviet`} component={QLBaiVietComponent}></Route>
                        <Route exact path={`${match.url}/qlblog`} component={QLBlogComponent}></Route>
                        <Route exact path={`${match.url}/quanlysanpham`} component={GianHangTaoSanPham}></Route>
                    </Switch>
                </Col>
            </Row >
        </Fragment>
    )
}


