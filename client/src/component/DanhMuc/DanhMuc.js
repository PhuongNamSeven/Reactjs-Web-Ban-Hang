import React, { useEffect, useState, Fragment } from 'react'
import { axios } from '../../config/constant';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Image, Button } from 'react-bootstrap';
import { Paypall, Header, Footer } from '../index';
import { StringParam, useQueryParams, NumberParam } from 'use-query-params';
import { FaStar } from 'react-icons/fa';
import { Card, Col, Row, Tooltip, Input, } from "antd";

function DanhMuc(props) {
    const categoryID = props.match.params.id;
    const { Meta } = Card;
    const [dataProduct, setDataProduct] = useState([]);
    const [dataCategory, setDataCategory] = useState({
        _id: '',
        ten: ''
    });
    const [query, setQuery] = useQueryParams({
        rating: NumberParam,
        price: StringParam
    });
    function format_curency(a) {
        a = a.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
        return a;
    }
    async function LayCategoryTheoID(categoryID) {
        let res = await axios.get('danhmuc-sanpham?id=' + categoryID);
        if (res.data.status === 'success') {
            setDataCategory({
                _id: res.data.data._id,
                ten: res.data.data.tenDanhMuc
            })
        } else {
            alert('Lấy data danh mục sản phẩm thất bại');
        }
    }
    async function SanPhamThuocDanhMuc(id) {
        let res = await axios.get('sanphamtheodanhmuc?id=' + id);
        if (res.data.status === 'success') {
            setDataProduct(res.data.data);
        } else {
            alert('Lấy sản phẩm theo danh mục thất bại');
        }
    }
    useEffect(() => {
        LayCategoryTheoID(categoryID);
    }, [])
    useEffect(() => {
        if (dataCategory._id !== null) {
            SanPhamThuocDanhMuc(dataCategory._id);
        }

    }, [dataCategory._id])
    return (
        <Fragment>
            <Header></Header>
            <div className="container" style={{ marginTop: '50px' }}>
                <div className="row">
                    <div className="col-sm-3 sidebar">
                        <div className="danhmuc-sidebar">
                            <h5>DANH MỤC SẢN PHẨM</h5>
                            <div className="danhmucchinh-sidebar">
                                <h5><strong><Link to='#'>{dataCategory.ten}</Link></strong></h5>
                            </div>
                        </div>
                        <hr></hr>
                        <div className="danhgia-sidebar">
                            <h5>ĐÁNH GIÁ</h5>
                            <div className="danhgia-5sao-sidebar">
                                <Link to='/' style={{ textDecoration: 'none' }} onClick={(e) => {
                                    e.preventDefault();
                                    setQuery({
                                        ...query,
                                        rating: 5
                                    }, 'push');

                                }}>
                                    {[...Array(5)].map((item, i) => {
                                        return <FaStar key={i} color={"#ffc107"} style={{ marginLeft: 2 }} size={15}></FaStar>
                                    })}
                                    <span style={{ color: "gray", fontSize: 14, marginLeft: 5 }}>(từ 5 sao)</span>
                                </Link>
                            </div>
                            <div className="danhgia-4sao-sidebar">
                                <Link to='/' style={{ textDecoration: 'none', color: 'black' }} onClick={(e) => {
                                    e.preventDefault();
                                    setQuery({
                                        ...query,
                                        rating: 4
                                    }, 'push');
                                }}>
                                    {[...Array(4)].map((item, i) => {
                                        return <FaStar key={i} color={"#ffc107"} style={{ marginLeft: 2 }} size={15}></FaStar>
                                    })}
                                    <FaStar style={{ marginLeft: 2 }} size={15}></FaStar>
                                    <span style={{ color: "gray", fontSize: 14, marginLeft: 5 }}>(từ 4 sao)</span>
                                </Link>

                            </div>
                            <div className="danhgia-3sao-sidebar">
                                <Link to='/' style={{ textDecoration: 'none', color: 'black' }} onClick={(e) => {
                                    e.preventDefault();
                                    setQuery({
                                        ...query,
                                        rating: 3
                                    }, 'push');
                                }}>
                                    {[...Array(3)].map((item, i) => {
                                        return <FaStar key={i} color={"#ffc107"} style={{ marginLeft: 2 }} size={15}></FaStar>
                                    })}
                                    <FaStar style={{ marginLeft: 2 }} size={15}></FaStar>
                                    <FaStar style={{ marginLeft: 2 }} size={15}></FaStar>
                                    <span style={{ color: "gray", fontSize: 14, marginLeft: 5 }}>(từ 3 sao)</span>
                                </Link>

                            </div>
                        </div>
                        <hr></hr>
                        <div className="thuonghieu-sidebar">
                            <h5>GIÁ</h5>
                            <div className='col'>
                                <div className='row'>
                                    Chọn khoảng giá
                            </div>
                                <div className='row'>
                                    <Input style={{ width: 100 }}
                                    ></Input>
                                &nbsp;_&nbsp;
                                <Input style={{ width: 100 }}

                                    ></Input>
                                </div>
                                <div className='row'>
                                    <Button style={{ marginTop: 10, width: 100 }}
                                    >Tìm kiếm</Button>
                                </div>

                            </div>
                        </div>

                    </div>
                    <div className="col-sm-9">
                        <div className="row">
                            {
                                dataProduct.map((item, i) => {
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
                        </div>
                    </div>





                </div>
            </div>
        </Fragment>
    )
}

export default DanhMuc
