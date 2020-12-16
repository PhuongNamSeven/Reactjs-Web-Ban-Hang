import React, { Fragment, useState, useEffect } from 'react';
import { axios } from '../../config/constant';
import { Header, MarketingController, ProductController, CarouselComponent, Footer } from '../index';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch } from 'react-redux';

export default function TrangChu() {
    const [dataSanPham, setDataSanPham] = useState([]);
    const [dataDanhMuc, setDataDanhMuc] = useState([]);
    const [dataCarousel, setDataCarousel] = useState([]);
    const [statusDangNhap, setStatusDangNhap] = useState(false);
    const dispatch = useDispatch();
    // ham lay danh sach san pham

    async function LayDanhSachSanPham() { // viet ham request dên api lay danh sach san pham 
        let res = await axios.get('/sanpham'); // ham pi
        if (res.data.status === 'success') { // 
            setDataSanPham(res.data.data2);

        } else {
            alert('ket noi Api san pham khong thanh cong');
        }
    }
    console.log(dataSanPham);

    async function LayDanhSachDanhMuc() { // viet ham request dên api lay danh sach san pham 
        let res = await axios.get('/danhmuc_trangchu'); // ham pi
        if (res.data.status === 'success') { // 
            setDataDanhMuc(res.data.data);

        } else {
            alert('ket noi Api danh muc khong thanh cong');
        }
    }

    async function LayDanhSachCarousel() {
        let res = await axios.get('/Carousel');
        if (res.data.status === 'thanhcong') {
            setDataCarousel(res.data.data);
        } else {
            alert('lay danh sach carousel that bai');
        }
    }

    /**
     * TODO : Quản lí sự thay đổi sản phẩm , dùng useEffect
     * 
     */

    useEffect(() => {
        LayDanhSachSanPham();
        LayDanhSachDanhMuc();
        LayDanhSachCarousel();
        window.scrollTo(0, 0);
        dispatch({ type: 'Layout_Khachhang' });
    }, [])

    return (
        <Fragment>
            <Header></Header>
            <div className="container" style={{ marginTop: '20px' }}>
                <CarouselComponent dataCarousel={dataCarousel} ></CarouselComponent>
                <MarketingController dataDanhMuc={dataDanhMuc} ></MarketingController>
                <ProductController dataSanPham={dataSanPham}></ProductController>
            </div>
            <Footer></Footer>
        </Fragment >
    );
}



