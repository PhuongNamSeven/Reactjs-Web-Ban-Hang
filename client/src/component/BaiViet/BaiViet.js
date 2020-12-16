import React, { useEffect, useState, Fragment } from 'react'
import { axios } from '../../config/constant';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Image, Button } from 'react-bootstrap';
import { Paypall, Header, Footer } from '../index';

import { Card, Col, Row, Tooltip } from "antd";

function BaiViet(props) {
    const id = props.match.params.id;
    const [dataBaiViet, setDataBaiViet] = useState({
        tieuDe: '',
        img: '',
        ngayTao: new Date(),
        loaiBaiViet: '',
        idProducts: '',
        content: '',
        luotXem: '',
        isLock: false,
        isDelete: false
    });
    const [dataProduct, setDataProduct] = useState([]);
    function format_curency(a) {
        a = a.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
        return a;
    }
    const { Meta } = Card;
    async function LayDataBaiVietTheoID() {
        let res = await axios.get('baiviet-item?id=' + id);

        if (res.data.status === 'success') {
            setDataBaiViet({
                tieuDe: res.data.data.tieuDe,
                img: res.data.data.img,
                loaiBaiViet: res.data.data.loaiBaiViet,
                ngayTao: res.data.data.ngayTao,
                content: res.data.data.content,
                luotXem: 0,
                isLock: false,
                isDelete: false
            });
        } else {
            alert('Lấy data bài viết thất bại !');
        }

    }
    async function LayDataProductTheoIDBaiViet() {
        let res = await axios.get('sanpham-baiviet?id=' + id);

        if (res.data.status === 'success') {
            setDataProduct(res.data.data);
        } else {
            alert('Lấy data sản phẩm liên quan thất bại !');
        }
    }
    useEffect(() => {
        LayDataBaiVietTheoID();
        LayDataProductTheoIDBaiViet();
    }, [])
    return (
        <Fragment>
            <Header></Header>
            <div className='container baiviet'>
                <div dangerouslySetInnerHTML={{ __html: dataBaiViet.content }}>
                </div>
                {
                    dataBaiViet.loaiBaiViet === 0 && (
                        <div className="row" style={{ height: 'auto', backgroundColor: '#F8F9FA', marginTop: 40, borderRadius: 10, color: 'black', fontWeight: 'lighter', padding: 10 }}>
                            <div className="col">
                                <h5 style={{ color: 'orange' }}><strong>Các sản phẩm liên quan</strong></h5>
                                <hr></hr>
                                {/* <div className="row">
                                    {
                                        dataProduct.map((item, i) => {
                                            if (i < soProductShow) {
                                                if (item.giaTriGiamGia === 0) {
                                                    return <div className="col-sm-3 item" style={{ backgroundColor: "white", height: 350, marginTop: 20, width: '95%' }}>
                                                        <Link to={'detail/' + item._id + '/' + to_slug(item.ten)} className="a_item">
                                                            <div className="row">
                                                                <Image style={{ width: '100%', height: 180 }} src={item.img.chinh} />
                                                            </div>
                                                            <div className="row item-ten">
                                                                <span><strong>{setLongString(item.ten)}</strong></span>
                                                            </div>
                                                            <div className="row item-gia">
                                                                <h5><strong>{format_curency(item.gia.toString())} VNĐ</strong></h5>
                                                            </div>
                                                        </Link>
                                                    </div>
                                                } else {
                                                    return <div className="col-sm-3 item" style={{ backgroundColor: "white", height: 350, marginTop: 20, width: '95%' }}>
                                                        <Link to={'detail/' + item._id + '/' + to_slug(item.ten)} className="a_item">
                                                            <div className="row">
                                                                <Image style={{ width: '100%', height: 180 }} src={item.img.chinh} />
                                                            </div>
                                                            <div className="row item-ten">
                                                                <span><strong>{setLongString(item.ten)}</strong></span>
                                                            </div>
                                                            <div className="row item-gia">
                                                                <h5><strong>{format_curency(tinh_tien(item.gia, item.giaTriGiamGia))} VNĐ</strong></h5>&nbsp;<span className="percent">{
                                                                    item.giaTriGiamGia > 100 ? '-' + format_curency(item.giaTriGiamGia.toString()) + 'VNĐ' : '-' + item.giaTriGiamGia + '%'
                                                                }</span>
                                                            </div>
                                                            <div className="row item-giagoc">
                                                                <strike><span className="original">{format_curency(item.gia.toString())} VNĐ</span></strike>
                                                            </div>
                                                        </Link>
                                                    </div>
                                                }
                                            }
                                        })
                                    }
                                </div> */}
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


                                {

                                    <div className="row" style={{ marginTop: 20, alignItems: 'center', justifyContent: 'center' }}>
                                        <Button variant="outline-primary" onClick={() => {
                                            // setSoProductShow(prev => prev + 4);
                                        }}>Xem Thêm</Button>
                                    </div>

                                }
                            </div>
                        </div>
                    )
                }
            </div>
            <Footer></Footer>
        </Fragment>
    )
}

export default BaiViet
