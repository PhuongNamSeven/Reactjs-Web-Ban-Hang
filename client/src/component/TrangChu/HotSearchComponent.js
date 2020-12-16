import React, { Fragment } from 'react';
import { Carousel } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';

export default function HotSearchComponent(props) {
    const dataDanhMuc = props.dataDanhMuc;
    const history = useHistory();

    return (
        <Fragment>
            <div className='row'>
                <div style={{ width: '100%' }}>
                    <h1 style={{ textAlign: "center" }}>Tìm Kiếm Hot</h1>
                    <Carousel>
                        <Carousel.Item>
                            <div style={{ width: '100%' }}>
                                <div>
                                    <center>
                                        {
                                            dataDanhMuc.map((item, i) => {
                                                if (i < 2) {
                                                    return <Link key={i} to='/' onClick={(e) => {
                                                        e.preventDefault();
                                                        history.push('/timkiem?data=' + item.ten + '&order=newest');
                                                    }}>
                                                        <div className='post' style={{ width: 200, height: 200, marginLeft: 20, backgroundColor: '#99CCFF', display: 'inline-block', borderRadius: 10, textAlign: 'center', padding: 20 }}>
                                                            <h5 style={{ marginTop: '35%', color: 'white' }}>{item.ten}</h5>
                                                        </div>
                                                    </Link>
                                                }
                                            })
                                        }
                                    </center>
                                </div>
                            </div>
                        </Carousel.Item>
                        <Carousel.Item>
                            <div style={{ width: '100%' }}>
                                <div>
                                    <center>
                                        {
                                            dataDanhMuc.map((item, i) => {
                                                if (i < 4 && i > 1) {
                                                    return <Link key={i} to='/' onClick={(e) => {
                                                        e.preventDefault();
                                                        history.push('/timkiem?data=' + item.ten + '&order=newest');
                                                    }}>
                                                        <div className='post' style={{ width: 200, height: 200, marginLeft: 20, backgroundColor: '#99CCFF', display: 'inline-block', borderRadius: 10, textAlign: 'center', padding: 20 }}>
                                                            <h5 style={{ marginTop: '35%', color: 'white' }}>{item.ten}</h5>
                                                        </div>
                                                    </Link>
                                                }
                                            })
                                        }
                                    </center>
                                </div>
                            </div>
                        </Carousel.Item>
                        <Carousel.Item>
                            <div style={{ width: '100%' }}>
                                <div>
                                    <center>
                                        {
                                            dataDanhMuc.map((item, i) => {
                                                if (i < 6 && i > 3) {

                                                    return <Link key={i} to='/' onClick={(e) => {
                                                        e.preventDefault();
                                                        history.push('/timkiem?data=' + item.ten + '&order=newest');
                                                    }}>
                                                        <div className='post' style={{ width: 200, height: 200, marginLeft: 20, backgroundColor: '#99CCFF', display: 'inline-block', borderRadius: 10, textAlign: 'center', padding: 20 }}>
                                                            <h5 style={{ marginTop: '35%', color: 'white' }}>{item.ten}</h5>
                                                        </div>
                                                    </Link>
                                                }
                                            })
                                        }
                                    </center>
                                </div>
                            </div>
                        </Carousel.Item>
                    </Carousel>
                </div>
            </div>
        </Fragment>
    )
}

