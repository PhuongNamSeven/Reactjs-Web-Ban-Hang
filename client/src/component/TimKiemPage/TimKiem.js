import React, { useState, useEffect, Fragment } from 'react';
import { FaStar } from 'react-icons/fa';
import { Image, Button } from 'react-bootstrap';
import { axios } from '../../config/constant';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { SmileOutlined } from '@ant-design/icons';
import { Result, message, Input, Pagination, Tooltip,Card } from 'antd';
import { StringParam, useQueryParams, NumberParam } from 'use-query-params';
import { toast } from 'react-toastify';
import { Paypall, Header, Footer } from '../index';

function TimKiem() {
    const dispatch = useDispatch();
    const { Meta } = Card;
    const history = useHistory();
    const [dataProduct, setDataProduct] = useState([]);
    const [loadding, setLoadding] = useState(false);
    const [query, setQuery] = useQueryParams({
        data: StringParam,
       
    });

    const { data: dataSearch} = query;
    function format_curency(a) {
        a = a.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
        return a;
    }
    async function LayDataProductTheoSearch() {
        setLoadding(true);
        let res = await axios.get('products-search-nguoidung?search=' + dataSearch);

        if (res.data.status === 'success') {
            setLoadding(false);
            setDataProduct(res.data.data);
        } else {
            setLoadding(false);
            toast.warning('Search thất bại');
        }
    }
    console.log(dataProduct);
    useEffect(() => {
        LayDataProductTheoSearch();
        
    }, [dataSearch]);
   
    return (
        <Fragment>
            <Header></Header>
            <div className="container" style={{ marginTop: '50px' }}>
                <div className="row">
                    <div className="col-sm-3 sidebar">
                        <div className="danhmuc-sidebar">
                            <h5>DANH MỤC SẢN PHẨM</h5>
                            <h4>(chưa hiển thị)</h4>
                        </div>
                   
                    <hr></hr>

                    <div className="danhgia-sidebar">
                        <h5>ĐÁNH GIÁ</h5>
                        <h4>(chưa hiển thị)</h4>
                    </div>
                    <hr></hr>

                    <div className="thuonghieu-sidebar">
                        <h5>GIÁ</h5>
                        <h4>(chưa hiển thị)</h4>
                    </div>


                    </div>
                    <div className="col-sm-9">
                        <h5>Ấn Frefresh hoặc F5 để load lại sản phẩm</h5>
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

export default TimKiem
