import React, { Fragment, useState } from 'react';
import { Form, Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { storage } from '../../firebase/firebase'

export default function QLBaiVietComponent() {
    const [dataBaiViet, setdataBaiViet] = useState({
        tieude: '',
        hinhanh: '',
        loaibaiviet: '',
        mota: ''
    });

    const handleFireBaseUpload = e => {
        var file = '',
            file = e.target.files[0];
        console.log('start of upload')
        // async magic goes here...
        if (file === '') {
            console.error(`not an image, the image file is a ${typeof (imageAsFile)}`)
        }
        const uploadTask = storage.ref(`/images/${file.name}`).put(file)
        //initiates the firebase side uploading 
        uploadTask.on('state_changed',
            (snapShot) => {
                //takes a snap shot of the process as it is happening
                console.log(snapShot)
            }, (err) => {
                //catches the errors
                console.log(err)
            }, () => {
                // gets the functions from storage refences the image storage in firebase by the children
                // gets the download url then sets the image from firebase as the value for the imgUrl key:
                storage.ref('images').child(file.name).getDownloadURL()
                    .then(fireBaseUrl => {
                        setdataBaiViet({
                            ...dataBaiViet,
                            hinhanh: fireBaseUrl
                        })
                    })
            })
    }

    return (
        <Fragment>
            <div className="col-sm-8" style={{ padding: 10, left: 10 }}>
                {/* Modal Thêm Bài Viết*/}
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
                                        <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="nhập  tên bài viết" />
                                    </div>
                                    <input type="file" name="myImage" accept="image/x-png,image/gif,image/jpeg" onChange={handleFireBaseUpload} />

                                    <div className="form-group">
                                        <label htmlFor="exampleFormControlSelect1">Loại bài viết</label>
                                        <select className="form-control" id="exampleFormControlSelect1" >
                                            <option value={true}>Sự kiện</option>
                                            <option value={false}>Giới thiệu</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="exampleInputEmail1">Mô tả</label>
                                        <input type="text" className="form-control" placeholder="nhập  mô tả" />
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Đóng</button>
                                <button type="button" className="btn btn-primary">Xác nhận</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-sm-8" style={{ padding: 10, left: 10 }}>
                    <Form>
                        <Row>
                            <input type="text" ></input> &nbsp;
                            <button style={{ left: 10 }} >Tim kiếm</button>
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
                                    <th>Ten bai viet</th>
                                    <th>hinh anh</th>
                                    <th>Loai bai viet</th>
                                    <th>Chức năng</th>
                                </tr>
                            </thead>
                        </table>
                    </Form>
                </div>
            </div>
        </Fragment>
    );
}

 
