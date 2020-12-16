import React, { Fragment } from 'react';
import { Container } from 'reactstrap'
import { Card, Row, Tooltip } from "antd";
import { Link } from "react-router-dom";
import Slider from "react-slick";
const { Meta } = Card;

export default function MarketingController(props) {
    const dataDanhMuc = props.dataDanhMuc;

    const settings = {
        dots: false,
        slidesToShow: 7,
        slidesToScroll: 2,
        speed: 200,
        //swipeToSlide: true,
        responsive: [
            {
                breakpoint: 1324,
                settings: {
                    slidesToShow: 6,
                    slidesToScroll: 2,
                    speed: 200,

                }
            },
            {
                breakpoint: 800,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 2,
                    speed: 200,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    arrows: false,
                    slidesToShow: 4,
                    slidesToScroll: 1,
                    speed: 200,
                }
            }
        ]
    };

    return (
        <Fragment>
            <div className="col-sm" style={{ marginTop: '10px' }}>
                <Row>
                    <div className='row' style={{ marginLeft: '10px' }}>
                        <i className="fa fa-bell fa-2x" style={{ marginTop: '15px' }}></i>

                        <div style={{ border: '2px solid Tomato' }} className='col'>
                            <mark >Sự lựa chọn của bạn</mark>
                            <h2 style={{ color: '#FF8C00', fontFamily: 'Sofia' }}> DANH MỤC </h2>
                        </div>
                    </div>
                </Row>
                <Slider {...settings}>
                    {
                        dataDanhMuc.map((item,i) => {
                            return (
                                <Tooltip title={item.tenDanhMuc} placement={'right'} key={i}>
                                   
                                        <div key={item._id} className={'itemDanhMuc h-100 '}>
                                        <Link to={"/danhmuc/" + item._id} style={{textDecoration:'none'}}>
                                                <Card
                                                    hoverable
                                                    cover={<img style={{ height: '140px',width:'auto' }} alt="example"
                                                        src={item.anh} />}
                                                >

                                                    <Meta title={item.tenDanhMuc} />

                                                </Card>
                                            </Link>
                                        </div>
                                   
                                </Tooltip>
                            )
                        })
                    }
                </Slider>
            </div>
        </Fragment>
    )
}

