import React, { Fragment, useState, useEffect } from 'react'
import { axios } from '../../config/constant';
import { useCookies } from 'react-cookie';
import { Drawer, Divider, PageHeader, Row, Col, Timeline } from 'antd';
import { ClockCircleOutlined } from '@ant-design/icons';
import './ThongTinGianHang.css';

export default function ThongTinGianHang() {
    const [datathongtinnguoidung, setdatathongtinnguoidung] = useState({
        _id: '',
        ten: '',
        vaiTro: '',
        email: '',
        anh: ''
    });
    const [cookies] = useCookies();
    // hien thi thong tin 
    const [hienthi, sethienthi] = useState(false);
    const showDrawer = () => {
        sethienthi(true);
    };

    const onClose = () => {
        sethienthi(false);
    };

    async function LayThongTinShopTheoID() {
        let res = await axios.get('/thongtinshop?id=' + cookies.userID);
        if (res.data.status === 'thanhcong') {
            setdatathongtinnguoidung({
                _id: res.data.data._id,
                ten: res.data.data.ten,
                vaiTro: res.data.data.vaitro,
                email: res.data.data.taikhoan.email,
                anh: res.data.data.anh
            })
        } else {
            alert('lay thong tin shop khong thanh cong');
        }
    }

    // mo ta thong tin 
    const DescriptionItem = ({ title, content }) => (
        <div className="site-description-item-profile-wrapper">
            <p className="site-description-item-profile-p-label">{title}:</p>
            {content}
        </div>
    );

    console.log(datathongtinnguoidung);
    useEffect(() => {
        LayThongTinShopTheoID();
    }, [])

    return (
        <Fragment>
            <div className="container">
                <div className="Infor_User">
                    <Row>
                        <Col>
                            <PageHeader
                                title={datathongtinnguoidung.ten}
                                className="site-page-header"
                                subTitle=""
                                avatar={{ src: 'https://avatars1.githubusercontent.com/u/8186664?s=460&v=4' }}
                            ></PageHeader>
                            <p onClick={() => {
                                showDrawer();
                            }}>
                                View Profile
                            </p>
                            <img
                                src="https://gw.alipayobjects.com/zos/antfincdn/K%24NnlsB%26hz/pageHeader.svg"
                                alt="content"
                                width="40%"
                            />
                        </Col>
                    </Row>
                </div>
                <Row>
                    <Timeline mode="alternate">
                        <Timeline.Item>Phuong Nam Seven 12/6/1996</Timeline.Item>
                        <Timeline.Item color="green">Skill Reactjs</Timeline.Item>
                        <Timeline.Item dot={<ClockCircleOutlined style={{ fontSize: '16px' }} />}>
                            Description : Student
                        </Timeline.Item>
                    </Timeline>
                </Row>
                <Drawer
                    width={640}
                    placement="right"
                    closable={false}
                    onClose={onClose}
                    visible={hienthi}
                >
                    <p className="site-description-item-profile-p" style={{ marginBottom: 24 }}>
                        User Profile
                    </p>
                    <p className="site-description-item-profile-p">Personal</p>
                    <Row>
                        <Col span={12}>
                            <DescriptionItem title="Full Name" content="Lily" />
                        </Col>
                        <Col span={12}>
                            <DescriptionItem title="Account" content="AntDesign@example.com" />
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <DescriptionItem title="City" content="HangZhou" />
                        </Col>
                        <Col span={12}>
                            <DescriptionItem title="Country" content="China🇨🇳" />
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <DescriptionItem title="Birthday" content="February 2,1900" />
                        </Col>
                        <Col span={12}>
                            <DescriptionItem title="Website" content="-" />
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <DescriptionItem
                                title="Message"
                                content="Make things as simple as possible but no simpler."
                            />
                        </Col>
                    </Row>
                    <Divider />
                    <p className="site-description-item-profile-p">Company</p>
                    <Row>
                        <Col span={12}>
                            <DescriptionItem title="Position" content="Programmer" />
                        </Col>
                        <Col span={12}>
                            <DescriptionItem title="Responsibilities" content="Coding" />
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <DescriptionItem title="Department" content="XTech" />
                        </Col>
                        <Col span={12}>
                            <DescriptionItem title="Supervisor" content={<a>Lin</a>} />
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <DescriptionItem
                                title="Skills"
                                content="C / C + +, data structures, software engineering, operating systems, computer networks, databases, compiler theory, computer architecture, Microcomputer Principle and Interface Technology, Computer English, Java, ASP, etc."
                            />
                        </Col>
                    </Row>
                    <Divider />
                    <p className="site-description-item-profile-p">Contacts</p>
                    <Row>
                        <Col span={12}>
                            <DescriptionItem title="Email" content="AntDesign@example.com" />
                        </Col>
                        <Col span={12}>
                            <DescriptionItem title="Phone Number" content="+86 181 0000 0000" />
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <DescriptionItem
                                title="Github"
                                content={
                                    <a href="http://github.com/ant-design/ant-design/">
                                        github.com/ant-design/ant-design/
                                    </a>
                                }
                            />
                        </Col>
                    </Row>
                </Drawer>
            </div>
        </Fragment>
    )
}

 
