import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Result } from 'antd';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { Paypall, Header, Footer } from '../index';
import { useCookies } from 'react-cookie';
import { axios } from '../../config/constant';

function ResultPage() {
    const [cookies] = useCookies();
    async function ThanhToanThanhCong() {
        let res = await axios.put('/thanhtoanthanhcong?idUser=' + cookies.userID);
        if (res.data.status === 'success') {
            console.log('thanh toán thành công');
        } else {
            console.log('thanh toán không thành công')
        }
    }
    return (
        <div>
            
            <Result
                status="success"
                title="Đã đặt hàng thành công"
                subTitle={"Vui lòng kiểm tra đơn hàng"}
                extra={[
                    <Link to='/'>
                        <Button
                        onClick={ThanhToanThanhCong}
                        >Trở về Trang Chủ</Button>
                    </Link>
                ]}>

            </Result>
        </div>
    )
}

export default ResultPage
