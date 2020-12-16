import React, { Fragment, useState } from 'react';
import { axios } from '../../config/constant';
import { storage } from '../../firebase/firebase'
import { useCookies } from 'react-cookie';
import { Form, Input, Button, Row, Col, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

export default function GianHangTaoSanPham() {
    const [sanphamshop, setsanphamshop] = useState({
        ten: '',
        gia: '',
        mota: '',
        hinhanhsanphamshop: '',
        hienthi: false
    });
    const [cookies, setCookie, removeCookie] = useCookies();
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
                        setsanphamshop({
                            ...sanphamshop,
                            hinhanhsanphamshop: fireBaseUrl
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
    // tao san pham shop
    async function TaoSanPhamShop() {
        let res = await axios.post('/sanphamshop', {
            id: cookies.userID,
            ten: sanphamshop.ten,
            gia: sanphamshop.gia,
            mota: sanphamshop.mota,
            hinhanhsanphamshop: sanphamshop.hinhanhsanphamshop,
            hienthi: sanphamshop.hienthi
        })
        if (res.data.status === 'thanhcong') {
            //alert(res.data.message);
            message.success('tạo sản phẩm shop thành công');
            window.location.pathname = '/';
        } else {
            alert('tạo sản phẩm shop thất bại');
            message.error('tạo sản phẩm shop không thành công');
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
                <Col span={2}> </Col>
                <Col span={15}>
                    <h1 className="text-center"
                        style={{ marginTop: '10px', textTransform: 'uppercase', color: 'blue', fontFamily: 'Times New Roman' }}>
                        Tạo sản phẩm cho Shop
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
                            label="Tên sản phẩm"
                            name="tensanpham"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your username!',
                                },
                            ]}
                        >
                            <Input onChange={(e) => {
                                setsanphamshop({
                                    ...sanphamshop,
                                    ten: e.target.value
                                })
                            }} />
                        </Form.Item>
                        <Form.Item
                            label="gia"
                            name="giasanpham"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your address shop!',
                                },
                            ]}
                        >
                            <Input onChange={(e) => {
                                setsanphamshop({
                                    ...sanphamshop,
                                    gia: e.target.value
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
                                setsanphamshop({
                                    ...sanphamshop,
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
                            <Upload {...props} name="logo 2" action="handleFireBaseUpload" listType="picture"  >
                                <Button icon={<UploadOutlined />} src={sanphamshop.hinhanhsanphamshop} >Click to upload</Button>
                            </Upload>
                        </Form.Item>
                        <Form.Item {...tailLayout}>
                            <Button type="primary" htmlType="submit" onClick={(e) => {
                                e.preventDefault();
                                TaoSanPhamShop();
                            }}>
                                Tạo sản phẩm
                            </Button>
                        </Form.Item>
                    </Form>
                </Col>
                <Col span={6}> </Col>
            </Row>
        </Fragment>
    )
}

