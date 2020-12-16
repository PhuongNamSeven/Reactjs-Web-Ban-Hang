import React, { Fragment } from 'react';
import { Link, Switch, Route, useRouteMatch } from 'react-router-dom';
import { Header} from '../index';
import { QLCategoryComponent, QLDoanhThuComponent, QLBaiVietComponent, QLBlogComponent } from '../index';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Menu, Row, Col } from 'antd';

const { SubMenu } = Menu;
export default function TrangChuAdmin() {
    const match = useRouteMatch();
    return (
        <Fragment>
            <Header></Header>
            <Row >
                <Col xs={7} sm={6} md={4} lg={4}>
                    <Menu defaultOpenKeys={['sub1']}
                        mode="inline" theme="light"
                    >
                        {/* khai bao link trang chu dan den trang match */}
                        <SubMenu key="sub1" title={<span><i className="far fa-address-card"></i>Quản lý nội dung</span>}>
                            <Menu.Item >
                                <Link to={`${match.url}/qldanhmuc`} style={{ textDecoration: 'none' }}>Quản lý danh mục</Link>
                            </Menu.Item>
                        </SubMenu>
                        <SubMenu key="sub2" title={<span><i className="fas fa-child"></i>Quản lý người dùng</span>}>
                        </SubMenu>
                        <SubMenu key="sub3" title={<span><i className="fab fa-cc-paypal"></i>Quản lý giao dich</span>}>
                        </SubMenu>
                        <SubMenu key="sub4" title={<span><i className="fas fa-dragon"></i>Quản lý sản phẩm</span>}>
                        </SubMenu>
                        <SubMenu key="sub5" title={<span><i className="fas fa-cart-arrow-down"></i>Quản lý doanh thu</span>}>
                            <Menu.Item>
                                <Link to={`${match.url}/qldoanhthu`} style={{ textDecoration: 'none' }}>Quản lý doanh thu</Link>
                            </Menu.Item>
                            <Menu.Item>
                                <Link to={`${match.url}/qldoanhthu`} style={{ textDecoration: 'none' }}>Quản lý doanh thu</Link>
                            </Menu.Item>
                            <Menu.Item>
                                <Link to={`${match.url}/qldoanhthu`} style={{ textDecoration: 'none' }}>Quản lý doanh thu</Link>
                            </Menu.Item>
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
                        <Route exact path={`${match.url}/qldanhmuc`} component={QLCategoryComponent}></Route>
                        <Route exact path={`${match.url}/qldoanhthu`} component={QLDoanhThuComponent}></Route>
                        <Route exact path={`${match.url}/qlbaiviet`} component={QLBaiVietComponent}></Route>
                        <Route exact path={`${match.url}/qlblog`} component={QLBlogComponent}></Route>
                    </Switch>
                </Col>
            </Row >
        </Fragment>
    );
}


