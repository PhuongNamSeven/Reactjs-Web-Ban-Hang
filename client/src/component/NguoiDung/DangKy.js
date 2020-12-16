import React, { Fragment, useState } from 'react';
import { axios } from '../../config/constant';

export default function DangKy() {
    const [dangkytaikhoan, setdangkytaikhoan] = useState({
        ten: '',
        taikhoan: {
            email: '',
            password: ''
        },
        vaitro: ''
    });

    async function KiemTraDangKy() {
        let res = await axios.post('/dangky', {
            ten: dangkytaikhoan.ten,
            email: dangkytaikhoan.email,
            password: dangkytaikhoan.password
        })
        if (res.data.status === 'thanhcong') {
            alert('dang ky thanh cong');
            window.location.pathname = '/';
        } else {
            alert('dang ky that bai');
        }
    }

    return (
        <Fragment>
            <div className="container">
                <h1 className="text-center"> ĐĂNG KÝ</h1>
                <div className="row">
                    <div className="col-xs-12 col-sm-12 col-md-4 well well-sm col-md-offset-4">
                        <legend>
                            <a href="http://hocwebgiare.com/"><i className="glyphicon glyphicon-globe" /></a>
                            Đăng ký thành viên!
                        </legend>
                        <form >
                            <div className="row">
                                <div className="col-xs-6 col-md-6"> <input className="form-control" name="lastname" placeholder="Tên" required type="text" onChange={(e) => {
                                    setdangkytaikhoan({
                                        ...dangkytaikhoan,
                                        ten: e.target.value
                                    })
                                }} />
                                </div>
                            </div> <input className="form-control" name="youremail" placeholder="Email" type="email" onChange={(e) => {
                                setdangkytaikhoan({
                                    ...dangkytaikhoan,
                                    email: e.target.value
                                })
                            }} />
                            <input className="form-control" name="password" placeholder="Mật khẩu" type="password" onChange={(e) => {
                                setdangkytaikhoan({
                                    ...dangkytaikhoan,
                                    password: e.target.value
                                })
                            }} />
                            <br />
                            <br />
                            <button className="btn btn-lg btn-primary btn-block" onClick={(e) => {
                                e.preventDefault();
                                KiemTraDangKy()
                            }}> Đăng ký</button>
                        </form>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

