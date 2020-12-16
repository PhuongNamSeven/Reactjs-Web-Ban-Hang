import React, { Fragment, useState } from 'react';
import { axios } from '../../config/constant';
import { storage } from '../../firebase/firebase'
import { useCookies } from 'react-cookie';
import { Form, Input, Button, Row, Col, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

export default function DangKyGianHang() {
    // tao bien de dang ky gian hang
    const [dataTaiKhoanGianHang, setdataTaiKhoanGianHang] = useState({
        ten: '',
        diachi: '',
        mota: '',
        logoShop: '',
        trangthai: false
    });

    // goi lai bien cookie de su dung
    const [cookies] = useCookies();
    const [arrURLChinh, setArrURLChinh] = useState([]);

    // form antd
    const layout = {
        labelCol: {
            span: 8,
        },
        wrapperCol: {
            span: 16,
        },
    };
    const tailLayout = {
        wrapperCol: {
            offset: 8,
            span: 16,
        },
    };

    const onFinish = (values) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    // hàm upload hình
    const normFile = (e) => {
        console.log('Upload event:', e);

        if (Array.isArray(e)) {
            return e;
        }

        return e && e.fileList;
    };
    // code cua firebase
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
                // set datataikhoangianhang cho logoshop len firebase
                storage.ref('images').child(file.name).getDownloadURL()
                    .then(fireBaseUrl => {
                        setdataTaiKhoanGianHang({
                            ...dataTaiKhoanGianHang,
                            logoShop: fireBaseUrl
                        })
                    })
            })
    }
    // code firebase upload nhiều hình
    const handleFireBaseUpload2 = e => {
        var files = [];
        var arrUrl = [];
        for (let index = 0; index < e.target.files.length; index++) {
            files.push(e.target.files[index]);
        }
        console.log('start of upload')
        // async magic goes here...
        if (files.length === 0) {
            console.error(`not an image, the image file is a ${typeof (imageAsFile)}`)
        }
        for (let index = 0; index < files.length; index++) {
            const uploadTask = storage.ref(`/images/${files[index].name}`).put(files[index])
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
                    storage.ref('images').child(files[index].name).getDownloadURL()
                        .then(fireBaseUrl => {
                            arrUrl.push(fireBaseUrl);
                        })
                })
        }
        setArrURLChinh(arrUrl);
    }
    // ham dang ky gian hang
    async function KiemTraDangKyGianHang() {
        let res = await axios.put('/dangkygianhang', {
            id: cookies.userID,
            ten: dataTaiKhoanGianHang.ten,
            diachi: dataTaiKhoanGianHang.diachi,
            moTa: dataTaiKhoanGianHang.mota,
            logoShop: dataTaiKhoanGianHang.logoShop
        })
        if (res.data.status === 'thanhcong') {
            //alert(res.data.message);
            message.success('đăng ký thành công');
            window.location.pathname = '/';
        } else {
            alert('dang ky gian hang that bai');
            message.error('đăng ký không thành công');
        }
    }

    const props = {
        // name: 'upload',
        // action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
        // headers: {
        //   authorization: 'authorization-text',
        // },
        onChange(info) {
            if (info.file.status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (info.file.status === 'error') {
                message.success(`${info.file.name} file uploaded successfully`);
            } else if (info.file.status === 'done') {
                message.error(`${info.file.name} file upload failed.`);
            }
        }
    }

    return (
        <Fragment>
            <Row style={{ marginTop: '10px' }}>
                <Col span={6}> </Col>
                <Col span={12}>
                    <h1 className="text-center"
                        style={{ marginTop: '10px', textTransform: 'uppercase', color: 'blue', fontFamily: 'Times New Roman' }}>
                        ĐĂNG KÝ GIAN HÀNG
                    </h1>
                    <Form
                        style={{ marginTop: '20px' }}
                        {...layout}
                        name="basic"
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                    >
                        <Form.Item
                            label="Tên Shop"
                            name="username"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your username!',
                                },
                            ]}
                        >
                            <Input onChange={(e) => {
                                setdataTaiKhoanGianHang({
                                    ...dataTaiKhoanGianHang,
                                    ten: e.target.value
                                })
                            }} />
                        </Form.Item>

                        <Form.Item
                            label="Địa chỉ Shop"
                            name="diachishop"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your address shop!',
                                },
                            ]}
                        >
                            <Input onChange={(e) => {
                                setdataTaiKhoanGianHang({
                                    ...dataTaiKhoanGianHang,
                                    diachi: e.target.value
                                })
                            }} />
                        </Form.Item>
                        <Form.Item
                            label="Mô tả"
                            name="mota"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your shop description!',
                                },
                            ]}
                        >
                            <Input onChange={(e) => {
                                setdataTaiKhoanGianHang({
                                    ...dataTaiKhoanGianHang,
                                    mota: e.target.value
                                })
                            }} />
                        </Form.Item>
                        <Form.Item
                            name="upload"
                            label="Upload"
                            valuePropName="fileList"
                            getValueFromEvent={normFile}
                            extra="Phuong Nam Seven"

                        >
                            <Upload {...props} name="logo" action="handleFireBaseUpload" listType="picture"  >
                                <Button icon={<UploadOutlined />} src={dataTaiKhoanGianHang.logoShop} >Click to upload</Button>
                            </Upload>
                        </Form.Item>
                        <Form.Item {...tailLayout}>
                            <Button type="primary" htmlType="submit" onClick={(e) => {
                                e.preventDefault();
                                KiemTraDangKyGianHang();

                            }}>
                                Đăng ký
                            </Button>
                        </Form.Item>
                    </Form>
                </Col>
                <Col span={6}> </Col>
            </Row>
        </Fragment>
    );
}

