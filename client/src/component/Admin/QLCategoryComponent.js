import React, { Fragment, useState, useEffect } from 'react';
import { axios } from '../../config/constant';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col, Button, Pagination } from 'antd';
import { Table } from 'reactstrap';

function QLCategoryComponent() {
    const [dataDanhMuc, setDataDanhMuc] = useState([]);
    const [reloadDatabase, setReloadDatabase] = useState(false);
    const [dataTimKiem, setDataTimKiem] = useState('');
    const [tongSoTrang, setTongSoTrang] = useState(0);
    const [pageNow, setPageNow] = useState(1);
    const [dataThem, setThemDanhMuc] = useState({
        ten: '',
        icon: '',
        trangthai: ''
    });
    const [dataSua, setDataSua] = useState({
        _id: '',
        ten: '',
        icon: '',
        trangthai: ''
    });
    const [dataDanhMucDuocChon, setDataDanhMucDuocChon] = useState({
        _id: '',
        ten: '',
        icon: '',
        trangthai: ''
    });
    // ham them danh muc => post
    async function ThemCategory() { 

        let res = await axios.post('/danhmuc-them', {
            ten: dataThem.ten,
            icon: dataThem.icon,
            trangthai: dataThem.trangthai,
        });

        if (res.data.status === 'success') {
            alert("Thêm thành công");
            setReloadDatabase(true);
        } else {
            alert("Thêm thất bại");
            setReloadDatabase(false);
        }
    }
    async function SuaCategory() {

        let res = await axios.put('/danhmuc-sua', {
            _id: dataSua._id,
            ten: dataSua.ten,
            icon: dataSua.icon,
            trangthai: dataSua.trangthai,
        });
        if (res.data.status === 'success') {
            alert("Sửa thành công");
            setReloadDatabase(true);
        } else {
            alert("Sửa thất bại");
            setReloadDatabase(false);
        }
    }
    async function XoaDanhMuc(id) {
        console.log(id);
        let res = await axios.delete('/danhmuc-xoa?id=' + id);
        if (res.data.status === 'thanhcong') {
            alert('Xóa thành công')
            setReloadDatabase(true);
        } else {
            alert('Xóa thất bại')
            setReloadDatabase(false);
        }
    }
    async function TimKiemSanPham() {
        let res = await axios.get('/danhmuc-timkiem?timkiem=' + dataTimKiem);
        if (res.data.status === 'thanhcong') {
            setDataDanhMuc(res.data.data);
        } else {
            alert('ket noi Api danh muc khong thanh cong');
        }
    }
    async function LayDanhSachDanhMuc(page) {
        let res = await axios.get('/danhmuc/'+page);
        if (res.data.status === 'thanhcong') {
            setDataDanhMuc(res.data.data);
            setTongSoTrang(res.data.soTrang);
        } else {
            alert('ket noi Api danh muc khong thanh cong');
        }
    }
    console.log(dataDanhMuc);
    console.log(tongSoTrang);
    async function LayDataMotDanhMuc(id) {
        let res = await axios.get('/danhmuc-item?id=' + id);
        if (res.data.status === 'thanhcong') {
            setDataDanhMucDuocChon({
                _id: res.data.data._id,
                ten: res.data.data.ten,
                icon: res.data.data.icon,
                trangthai: res.data.data.trangthai
            })
        } else {
            alert('ket noi Api danh muc khong thanh cong');
        }
    }
    async function KhoaCategory(id) {
        let res = await axios.put('/danhmuc-khoa', {
            id: id
        })
        if (res.data.status === 'thanh cong') {
            alert('khoa thanh cong');
        } else {
            alert('khoa that bai');
        }
    }
    useEffect(() => {
        if (reloadDatabase) {
            LayDanhSachDanhMuc();
            setReloadDatabase(false);
        }
    }, [reloadDatabase])
    useEffect(() => {
        LayDanhSachDanhMuc(pageNow - 1);
    }, []);
    //set giá trị default cho giá trị sửa
    useEffect(() => {
        setDataSua({
            _id: dataDanhMucDuocChon._id,
            ten: dataDanhMucDuocChon.ten,
            icon: dataDanhMucDuocChon.icon,
            trangthai: dataDanhMucDuocChon.trangthai
        })
    }, [dataDanhMucDuocChon])
    return (
        <Fragment>
            <div class="container" style={{ marginBottom: '10px' }}>
                <div class="row">
                    <div class="col-sm">
                        <Row justify={'center'}>
                            <Col span={24}>
                                {/* Modal Thêm */}
                                <div className="modal fade" id="exampleModalLong" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
                                    <div className="modal-dialog" role="document">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h5 className="modal-title" id="exampleModalLongTitle">Thêm  danh mục</h5>
                                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                    <span aria-hidden="true">×</span>
                                                </button>
                                            </div>
                                            <div className="modal-body">
                                                <form>
                                                    <div className="form-group">
                                                        <label htmlFor="exampleInputEmail1">Tên</label>
                                                        <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="nhập  tên" onChange={(e) => {
                                                            setThemDanhMuc({
                                                                ...dataThem,
                                                                ten: e.target.value
                                                            })
                                                        }} />
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="exampleInputPassword1">icon</label>
                                                        <input type="text" className="form-control" id="exampleInputPassword1" placeholder="nhập icon" onChange={(e) => {
                                                            setThemDanhMuc({
                                                                ...dataThem,
                                                                icon: e.target.value
                                                            })
                                                        }} />
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="exampleFormControlSelect1">Trạng thái</label>
                                                        <select className="form-control" id="exampleFormControlSelect1" onChange={(e) => {
                                                            setThemDanhMuc({
                                                                ...dataThem,
                                                                trangthai: e.target.value
                                                            })
                                                        }}>
                                                            <option value={true}>Có khóa</option>
                                                            <option value={false}>Không khóa</option>
                                                        </select>
                                                    </div>
                                                </form>
                                            </div>
                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Đóng</button>
                                                <button type="button" className="btn btn-primary" onClick={(e) => {
                                                    e.preventDefault();
                                                    ThemCategory()
                                                }}>Xác nhận</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* Modal Sửa */}
                                <div className="modal fade" id="exampleModalLong2" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
                                    <div className="modal-dialog" role="document">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h5 className="modal-title" id="exampleModalLongTitle">Sửa danh mục</h5>
                                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                    <span aria-hidden="true">×</span>
                                                </button>
                                            </div>
                                            <div className="modal-body">
                                                <form>
                                                    <div className="form-group">
                                                        <label htmlFor="exampleInputEmail1">Tên</label>
                                                        <input value={dataSua.ten} type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="nhập  tên" onChange={(e) => {
                                                            setDataSua({
                                                                ...dataSua,
                                                                ten: e.target.value
                                                            })
                                                        }} />
                                                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="exampleInputPassword1">icon</label>
                                                        <input value={dataSua.icon} type="text" className="form-control" id="exampleInputPassword1" placeholder="nhập icon" onChange={(e) => {
                                                            setDataSua({
                                                                ...dataSua,
                                                                icon: e.target.value
                                                            })
                                                        }} />
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="exampleFormControlSelect1">Trạng thái</label>
                                                        <select value={dataSua.trangthai} className="form-control" id="exampleFormControlSelect1" onChange={(e) => {
                                                            setDataSua({
                                                                ...dataSua,
                                                                trangthai: e.target.value
                                                            })
                                                        }}>
                                                            <option value={true}>Có khóa</option>
                                                            <option value={false}>Không khóa</option>
                                                        </select>
                                                    </div>
                                                </form>
                                            </div>
                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Đóng</button>
                                                <button type="button" className="btn btn-primary" onClick={(e) => {
                                                    e.preventDefault();
                                                    SuaCategory()
                                                }}>Xác nhận</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* form hien thi */}
                                {/* <Form>
                        <Row>
                            <input type="text" onChange={(e) => {
                                setDataTimKiem(e.target.value)
                            }}></input> &nbsp;
                       <button style={{ left: 10 }} onClick={(e) => {
                                e.preventDefault();
                                TimKiemSanPham();
                            }}>Tim kiếm</button>
                       &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                       &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                       &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                       <select className="browser-default custom-select">
                                <option selected>Trạng thái</option>
                                <option value="1">Tất cả</option>
                                <option value="2">Chưa khóa</option>
                                <option value="3">Đã khóa</option>
                            </select>
                       &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                       &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                       &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                        <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModalLong">
                                Thêm
                        </button>
                        </Row>
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th>id</th>
                                    <th>Ten danh muc</th>
                                    <th>icon</th>
                                    <th>Trang thai</th>
                                    <th>Thao tác</th>
                                </tr>
                            </thead>
                            {
                                dataDanhMuc.map((item, index) => {
                                    return <tbody> <tr>
                                        <td>{item._id}</td>
                                        <td>{item.ten}</td>
                                        <td><i className={item.icon}></i></td>
                                        <td>{item.isLock === false ? "Không" : "Có"}</td>
                                        <td>
                                            <button type="button" className="btn btn-default" onClick={() => {
                                                XoaDanhMuc(item._id);
                                            }}>Xóa</button>
                                            <button type="button" className="btn btn-default" data-toggle="modal" data-target="#exampleModalLong2" onClick={() => {
                                                LayDataMotDanhMuc(item._id);
                                            }}>
                                                Sửa
                                                </button>
                                            {
                                                item.isLock === true && (
                                                    <button type="button" className="btn btn-default" >Mở khóa</button>
                                                )
                                            }
                                            {
                                                item.isLock === false && (
                                                    <button type="button" className="btn btn-default" onClick={() => {
                                                        KhoaCategory(item._id) //dang chua khoa === false 
                                                    }}>Khóa</button>
                                                )
                                            }
                                        </td>
                                    </tr> </tbody>
                                })
                            }
                        </table>
                    </Form> */}
                                <Button data-toggle="modal" data-target="#exampleModalLong"> Thêm </Button>
                                <Table bordered style={{ marginTop: '10px' }}>
                                    <thead>
                                        <tr>
                                            <th> Tên danh mục </th>
                                            <th> Ảnh </th>
                                            <th> Trạng thái khóa </th>
                                            <th> Thao tác </th>
                                        </tr>
                                    </thead>
                                    {
                                        dataDanhMuc.map((item, index) => {
                                            return <tbody>
                                                <tr>
                                                    <td>{item.tenDanhMuc}</td>
                                                    <td><img className="img-responsive" src={item.anh} style={{ height: '10%', width: '10%', maxWidth: '100%', objectFit: 'cover' }}></img></td>
                                                    <td>{item.trangThaiKhoa === false ? 'không' : 'có'}</td>
                                                    <td>
                                                        <Button
                                                            style={{ marginLeft: '20px', maxWidth:'50px' }}
                                                            onClick={() => {
                                                                XoaDanhMuc(item._id);
                                                            }}>
                                                            Xóa
                                                        </Button> 
                                                        <Button
                                                            style={{ marginLeft: '20px', maxWidth:'50px' }}
                                                            data-toggle="modal"
                                                            data-target="#exampleModalLong2"
                                                            onClick={() => {
                                                                LayDataMotDanhMuc(item._id);
                                                            }}>
                                                            Sửa
                                                        </Button>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        })
                                    }
                                </Table>

                            <Pagination defaultPageSize={1} current={pageNow} total={tongSoTrang} onChange={(page) => {
                                  setPageNow(page);
                                  LayDanhSachDanhMuc(page - 1);
                            }}></Pagination>
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}
export default QLCategoryComponent;
