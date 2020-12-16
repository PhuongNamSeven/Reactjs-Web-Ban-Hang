import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Container } from 'reactstrap'
import { Card, Col, Button, Row, Tooltip } from "antd";

export default function ProductController(props) {
    var dataSanPham = props.dataSanPham;
    const { Meta } = Card;
    function format_curency(a) {
        a = a.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
        return a;
    }
    return (
        <Fragment>
            {/* danh sach san pham hot */}
            <div className="row" style={{ height: 'auto', backgroundColor: '#F8F9FA', marginTop: 40, borderRadius: 10, color: 'black', fontWeight: 'lighter', padding: 10 }}>
                <Col>
                    <Row>
                        <div className='row'
                            style={{ marginLeft: '10px' }}>
                            <i className="fa fa-book fa-2x"
                                style={{ marginTop: '15px' }}></i>
                            <div style={{ border: '2px solid Tomato' }} className='col'>
                                <mark>Các sản phẩm tốt nhất dành cho bạn</mark>
                                <h2 style={{ color: 'MediumSeaGreen', fontFamily: 'Sofia' }}> SẢN PHẨM DÀNH CHO BẠN </h2>
                            </div>
                        </div>
                    </Row>
                    <Row>
                        {
                            dataSanPham.map((item, i) => {
                                return (
                                    <Tooltip title={item.tenSanPham} placement={'right'} key={i}>
                                        <div class="col-sm-3" key={item._id} className={'itemDanhMuc h-100 '} style={{ backgroundColor: "white", height: 'auto', marginTop: 10, marginBottom: 10, width: 'auto' }}>
                                            <Card
                                                hoverable
                                                style={{ height: '300px', width: 240, marginTop: '10px', marginRight: '40px' }}
                                            >
                                                {/* truyen id san pham di */}
                                                <Link to={"/ChiTietSanPham/" + item._id}>
                                                    <img alt="hinh anh" src={item.anh.chinh} style={{ width: '100%', height: '100%' }}></img>
                                                </Link>
                                                <Meta title={item.tenSanPham} />
                                                <h3 style={{ marginTop: "10px" }}>
                                                    <strong>{format_curency(item.gia.toString())} VNĐ</strong>
                                                </h3>
                                            </Card>
                                        </div>
                                    </Tooltip>
                                )
                            })
                        }
                    </Row>
                    <Row >
                        <div className="col-sm-6 offset-5">
                            <Link to={'/'}>
                                <Button> Xem Thêm </Button>
                            </Link>
                        </div>
                    </Row>
                </Col>
            </div>
            {/* danh sach san pham danh cho ban */}
            <div className="row" style={{ height: 'auto', backgroundColor: '#F8F9FA', marginTop: 40, borderRadius: 10, color: 'black', fontWeight: 'lighter', padding: 10 }}>
                <Col>
                    <Row>
                        <div className='row'
                            style={{ marginLeft: '10px' }}>
                            <i className="fa fa-book fa-2x"
                                style={{ marginTop: '15px' }}></i>
                            <div style={{ border: '2px solid Tomato' }} className='col'>
                                <mark>Các sản phẩm tốt nhất dành cho bạn</mark>
                                <h2 style={{ color: 'MediumSeaGreen', fontFamily: 'Sofia' }}> SẢN PHẨM DÀNH CHO BẠN </h2>
                            </div>
                        </div>
                    </Row>
                    <Row>
                        {
                            dataSanPham.map((item, i) => {
                                return (
                                    <Tooltip title={item.tenSanPham} backgroundColor={'dark'} placement={'right'} key={i}>
                                        <div class="col-sm-3" key={item._id} className={'itemDanhMuc h-100 '} style={{ backgroundColor: "white", height: 'auto', marginTop: 10, marginBottom: 10, width: 'auto' }}>
                                            <Card
                                                hoverable
                                                style={{ height: '300px', width: 240, marginTop: '10px', marginRight: '40px' }}
                                            >
                                                {/* truyen id san pham di */}
                                                <Link to={"/ChiTietSanPham/" + item._id}>
                                                    <img alt="hinh anh" src={item.anh.chinh} style={{ width: '100%', height: '100%' }}></img>
                                                </Link>
                                                <Meta title={item.tenSanPham} />
                                                <h3 style={{ marginTop: "10px" }}>
                                                    <strong>{format_curency(item.gia.toString())} VNĐ</strong>
                                                </h3>
                                            </Card>
                                        </div>
                                    </Tooltip>
                                )
                            })
                        }
                    </Row>
                    <Row >
                        <div className="col-sm-6 offset-5">
                            <Link to={'/'}>
                                <Button> Xem Thêm </Button>
                            </Link>
                        </div>
                    </Row>
                </Col>
            </div>
        </Fragment>
    )
}


