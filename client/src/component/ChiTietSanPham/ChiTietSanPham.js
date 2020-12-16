import React, { Fragment, useState, useEffect } from 'react';
import { axios } from '../../config/constant';
import { Header, } from '../index';
import { useCookies } from 'react-cookie';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { SanPhamDetail,  Footer } from '../index'
import { useParams } from 'react-router-dom';

export default function ChiTietSanPham(props) {
    const SPID = props.match.params.id; //lay id cua san pham
    // const [cookies] = useCookies();
    // const [sanpham, setSanPham] = useState({
    //     ten: '',
    //     gia: '',
    //     anh: ''
    // });
    // const [giohang, setGioHang] = useState({
    //     ten: '',
    //     gia: '',
    //     anh: '',
    //     soluong: '',
    //     trangthai: false,
    //     idUser: cookies.userID
    // });
    // /**
    //  * TODO : Lay san pham hien thi theo id
    //  */
    // async function LaySanPhamTheoID() {
    //     let res = await axios.get('/SanPham-detail?id3=' + SPID);
    //     if (res.data.status === 'thanhcong') {
    //         setSanPham({ //lay ve san pham de hien thi 
    //             ten: res.data.data.tenSanPham,
    //             gia: res.data.data.gia,
    //             anh: res.data.data.anh,
    //             ctsanpham: res.data.data.chiTietSanPham
    //         });
    //         setGioHang({ // luu lai thuoc tinh gio hang 
    //             ...giohang,
    //             ten: res.data.data.tenSanPham,
    //             gia: res.data.data.gia,
    //             anh: res.data.data.anh
    //         })
    //     } else {
    //         console.log('ket noi chi tiet san pham khong thanh cong');
    //     }
    // }

    // useEffect(() => {
    //     LaySanPhamTheoID();
    // }, []);
    
    return (
        <Fragment>
            <Header></Header>
            <div className="container" style={{ marginTop: '20px' }}>
                <SanPhamDetail SPID={SPID}></SanPhamDetail>
               
            </div>
            <Footer></Footer>
        </Fragment>
    );
}

