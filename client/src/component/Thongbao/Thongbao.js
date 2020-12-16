import React, { Fragment } from 'react';
import { Link, Switch, Route, useRouteMatch } from 'react-router-dom';
import { Header } from '../index';
import { QLCategoryComponent, QLDoanhThuComponent, QLBaiVietComponent, QLBlogComponent } from '../index';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Menu, Row, Col } from 'antd';
const { SubMenu } = Menu;
export default function Thongbao() {
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
                            <SubMenu key="sub1" title={<span><i class="fas fa-sms"></i>Thông báo của ADMIN</span>}>
                                <Menu.Item >
                                    <Link to={`${match.url}/`} style={{ textDecoration: 'none' }}>Thông báo sự kiện</Link>
                                </Menu.Item>
                                <Menu.Item >
                                    <Link to={`${match.url}/`} style={{ textDecoration: 'none' }}>Thông báo về giảm giá</Link>
                                </Menu.Item>
                            </SubMenu>
                            <SubMenu key="sub2" title={<span><i class="fas fa-flag-checkered"></i>Thông báo của chủ shop</span>}>
                                <Menu.Item >
                                    <Link to={`${match.url}/`} style={{ textDecoration: 'none' }}>Thông báo đơn hàng</Link>
                                </Menu.Item>
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
        </Fragment>
    )
}
