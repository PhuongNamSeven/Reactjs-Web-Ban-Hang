import React, { Fragment, useState, useEffect } from 'react';
import { axios } from '../../config/constant';
import { useCookies } from 'react-cookie';
import { Col, Row, Container } from 'reactstrap';
import { FaCartPlus } from 'react-icons/fa';
import { Carousel } from 'react-bootstrap';
import 'antd/dist/antd.css';
import { Breadcrumb, Button, InputNumber, Card, Tooltip} from 'antd';
import { HomeOutlined, UserOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { toast } from 'react-toastify';
import ReactImageMagnify from 'react-image-magnify';
import { Image, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function SanPhamDetail(props) {
    const SPID = props.SPID; //lay id cua san pham
    const [cookies, setCookie, removeCookie] = useCookies();
    const [srcHinhLon, setSrcHinhLon] = useState('');
    const [arrao, setarrao] = useState([]); // khai bao fix loi carousel
    const { Meta } = Card;
    const [dataCategorys, setDataCategorys] = useState({
        _id: '',
        ten: ''
    });
    const [datashop, setDataShop] = useState({
        thongtinshop:{
            idShop:'',
            tenShop:'',
            logoShop:''
        }
    });
    const [sanphamShop, setSanPhamShop] = useState([]);
    const [sanpham, setSanPham] = useState({
        _id: '',
        ten: '',
        gia: '',
        thuonghieu: '',
        chiTietSanPham: {
            noiSanXuat: '',
            cheDoBaoHanh: '',
            quaTangKem: ''
        },
        kichThuoc: {
            nang: '',
            rong: '',
            dai: '',
            cao: ''
        },
        anh: {
            chinh: '',
            phu: []
        },
        moTa: '',
        idDanhMuc: '',
        idTinhThanh: '',
        idChuShop: '',
    });
    const [giohang, setGioHang] = useState({
        _id: '',
        ten: '',
        gia: '',
        anh: '',
        soluong: '',
        trangthai: false,
        idUser: cookies.userID,
        
        idChuShop:''
    });
    function format_curency(a) {
        a = a.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
        return a.toString();
    }
    async function LaySanPhamTheoID() {
        
        let res = await axios.get('/SanPham-detail?id3=' + SPID);
        if (res.data.status === 'thanhcong') {
           
            setSanPham({ //lay ve san pham de hien thi 
                _id: res.data.data._id,
                ten: res.data.data.tenSanPham,
                gia: res.data.data.gia,
                thuonghieu: res.data.data.thuongHieu,
                chiTietSanPham: {
                    noiSanXuat: res.data.data.chiTietSanPham.noiSanXuat,
                    cheDoBaoHanh: res.data.data.chiTietSanPham.cheDoBaoHanh,
                    quaTangKem: res.data.data.chiTietSanPham.quaTangKem
                },
                kichThuoc: {
                    nang: res.data.data.kichThuoc.nang,
                    rong: res.data.data.kichThuoc.rong,
                    dai: res.data.data.kichThuoc.dai,
                    cao: res.data.data.kichThuoc.cao
                },
                anh: {
                    chinh: res.data.data.anh.chinh,
                    phu: res.data.data.anh.phu
                },
                moTa: res.data.data.moTa,
                idDanhMuc: res.data.data.ID_DanhMuc,
                idTinhThanh: res.data.data.ID_TinhThanh,
                idChuShop: res.data.data.ID_ChuShop,
            });
            setGioHang({ // luu lai thuoc tinh gio hang 
                ...giohang,
                _id: res.data.data._id,
                ten: res.data.data.tenSanPham,
                gia: res.data.data.gia,
                anh: res.data.data.anh,
                idChuShop: res.data.data.ID_ChuShop,
            })
        } else {
            
            console.log('ket noi chi tiet san pham khong thanh cong');
        }
    }
    console.log(giohang);
    async function ThemSanPhamGioHang() {
        let res = await axios.post('/giohang-them', {
            _id: giohang._id,
            ten: giohang.ten,
            gia: giohang.gia,
            anh: giohang.anh,
            idChuShop:giohang.idChuShop,
            soluong: giohang.soluong,
            trangthai: giohang.trangthai,
           
            idUser: cookies.userID
        });
        if (res.data.status === 'thanhcong') {
            toast.success(`Thêm sản phẩm ${sanpham.ten} vào giỏ hàng thành công`);
        } else {
            console.log('thêm giỏ hàng không thành công');
        }
    }
    function KiemTraMuaHang() {
        if (cookies.userID != undefined) {
            ThemSanPhamGioHang();
        } else {
            toast.error('Bạn cần đăng nhập để mua hàng');
        }
    }
    async function LayDataCategoryTheoIDSanPham(id) {
        let res = await axios.get('danhmuc-theosanpham?id=' + id);
        if (res.data.status === 'thanhcong') {
            setDataCategorys({ // luu lai thuoc tinh gio hang 
                ...dataCategorys,
                _id: res.data.data._id,
                ten: res.data.data.tenDanhMuc,
            })
        } else {
            console.log('Lấy dữ liệu data danh mục sản phẩm thất bại');
        }
    }
     async function LayShopTheoIDSanPham(id) {
        let res = await axios.get('shop-theosanpham?id=' + id);
        if (res.data.status === 'thanhcong') {
            setDataShop({ // luu lai thuoc tinh gio hang 
                ...datashop,
                thongtinshop:{
                    idShop:res.data.data.thongtinshop.idShop,
                    tenShop:res.data.data.thongtinshop.ten,
                    logoShop: res.data.data.thongtinshop.logoShop,
                }
            })
        } else {
            console.log('Lấy dữ liệu data danh mục sản phẩm thất bại');
        }
     }
    async function LaySanPhamShopTheoIDSanPham(id) {
        let res = await axios.get('shop-theoidsanpham?id=' + id);
        if (res.data.status === 'thanhcong') {
            setSanPhamShop(res.data.data);
        } else {
            console.log('Lấy dữ liệu data sản phẩm theo shop thất bại');
        }
    }
    console.log(sanphamShop);
    useEffect(() => {
        LaySanPhamTheoID();
    }, []);
    useEffect(() => {
        setSrcHinhLon(sanpham.anh.chinh);

    }, [sanpham]);

    useEffect(() => {
        if (sanpham._id !== '') {
            LayDataCategoryTheoIDSanPham(sanpham.idDanhMuc);
        }
    }, [sanpham._id])
    useEffect(() => {
        if (sanpham.idChuShop !== '') {
            LayShopTheoIDSanPham(sanpham.idChuShop);
        }
    }, [sanpham._id])
    useEffect(() => {
        if (sanpham.idChuShop !== '') {
            LaySanPhamShopTheoIDSanPham(sanpham.idChuShop);
        }
    }, [sanpham._id])
    return (
        <Fragment>
            <div className="container">
                <Row>
                    <Breadcrumb>
                        <Breadcrumb.Item>
                            <span href="/">Trang Chủ</span>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            {dataCategorys.ten}
                        </Breadcrumb.Item>

                        <Breadcrumb.Item>
                            {sanpham.ten}
                        </Breadcrumb.Item>

                    </Breadcrumb>
                </Row>
                <div className="row">
                    <div className="col-sm-5" style={{ marginTop: '10px' }}>
                        <ReactImageMagnify enlargedImagePosition={'over'} {...{
                            smallImage: {
                                alt: 'Wristwatch by Ted Baker London',
                                isFluidWidth: true,
                                src: srcHinhLon
                            },
                            largeImage: {
                                src: srcHinhLon,
                                width: 1200,
                                height: 1800
                            }
                        }} />
                        <div className="col">
                            <div className="row" style={{ marginTop: 10 }}>
                                <div className="border border-dark showimg_little">
                                    <Image src={sanpham.anh.chinh}
                                        width="50px"
                                        onMouseOver={() => {
                                            setSrcHinhLon(sanpham.anh.chinh);
                                        }}></Image>
                                </div>
                                {
                                    sanpham.anh.phu.map((src, i) => {
                                        return <div
                                            key={i}
                                            className="border border-dark showimg_little"

                                        >
                                            <Image
                                                src={src}
                                                className="img_little"
                                                width="50px"
                                                height="50px"
                                                onMouseOver={() => {
                                                    setSrcHinhLon(src);
                                                }}
                                            ></Image>
                                        </div>
                                    })
                                }

                            </div>
                        </div>
                    </div>
                    <div className="col-sm-7 infor-item" style={{ marginTop: 10 }} >
                        <h2>{sanpham.ten}</h2>
                        <hr></hr>
                        <h3 style={{ color: 'red' }}><strong>{format_curency(sanpham.gia.toString())} VNĐ</strong></h3>
                        <hr></hr>
                        <div className='row'>
                            <div className='col-sm-8' style={{ height: 'auto' }}>
                                <h5>Nơi sản xuất: {sanpham.chiTietSanPham.noiSanXuat}</h5><br />
                                <h5>Bảo hành: {sanpham.chiTietSanPham.cheDoBaoHanh}</h5><br />
                                <h5>Quà tặng : {sanpham.chiTietSanPham.quaTangKem}</h5>
                            </div>
                            <div className='col-sm-4' style={{ height: 'auto' }}>
                                <div style={{ width: 200, height: 'auto', backgroundColor: '#EEEEEE' }}>
                                    <div className='col' style={{ padding: 5 }}>
                                        <div className='row'>
                                            <div className='col-sm-3' style={{ margin: 0 }}>
                                                <img alt='ảnh logo' src={datashop.thongtinshop.logoShop} width='50' height='60' style={{ marginRight: 50 }}></img>
                                     
                                            </div>
                                            <div className='col-sm-9'>
                                                {/* <Link to={'/shop/' + dataShop.idShop + '/' + to_slug(dataShop.tenShop)}>{dataShop.tenShop}</Link><br></br> */}
                                                <h4><strong>{datashop.thongtinshop.tenShop}</strong></h4><br />
                                                <span style={{ fontSize: 10 }}>Cam kết chính hãng 100%</span><br></br>
                                                <span style={{ fontSize: 10 }}>Hợp tác: DRAGON_SHOP</span><br></br>
                                                <span style={{ fontSize: 10 }}>Chứng nhận: DRAGON_SHOP</span>
                                            </div>
                                        </div>

                                        {/* <Link to={'/shop/' + dataShop.idShop + '/' + to_slug(dataShop.tenShop)}> */}
                                        <Button style={{ width: '100%', height: 30, marginTop: 10 }}>Xem shop</Button>
                                        {/* </Link> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr></hr>
                        <div className="row" style={{ display: 'flex' }}>
                            <div className="col-sm-5">
                                <p>Vui lòng nhập số lượng:</p>
                                <InputNumber min={0} style={{ marginLeft: 10 }} defaultValue={0} onChange={(value) => {
                                   
                                        setGioHang({
                                        ...giohang,
                                        soluong: value
                                    })
                                    
                                    
                                }} />
                            </div>
                            <div className="col-sm-7">
                                <Button style={{ width: 200, height: 54, marginTop: 5 }} onClick={KiemTraMuaHang}>
                                    <div className="row" style={{ justifyContent: 'center', alignItems: 'center' }}>
                                        <FaCartPlus size={30}></FaCartPlus>&nbsp;<strong>CHỌN MUA</strong>
                                    </div>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container" style={{ marginTop: '20px' }}>
                    <Row style={{ backgroundColor: '#d5dde6' }}>
                        <Container>
                            <div className={'h4 font-weight-bold text-dark'}>Chi tiết sản phẩm</div>
                        </Container>
                    </Row>
                    <Table className="table-infor-detail-item" bordered style={{ marginTop: '10px' }}>
                        <tbody>
                            <tr>
                                <td className="title" style={{ backgroundColor: '#dcdfdf', width: '250px' }}>Thương hiệu</td>
                                <td>{sanpham.thuonghieu}</td>
                            </tr>
                            <tr>
                                <td className="title" style={{ backgroundColor: '#dcdfdf', width: '250px' }}>Xuất xứ</td>
                                <td>{sanpham.chiTietSanPham.noiSanXuat}</td>
                            </tr>
                            <tr>
                                <td className="title" style={{ backgroundColor: '#dcdfdf', width: '250px' }}>Bảo hành</td>
                                <td>{sanpham.chiTietSanPham.cheDoBaoHanh}</td>
                            </tr>
                            <tr>
                                <td className="title" style={{ backgroundColor: '#dcdfdf', width: '250px' }}>Quà tặng kèm</td>
                                <td>{sanpham.chiTietSanPham.quaTangKem}</td>
                            </tr>
                            <tr>
                                <td className="title" style={{ backgroundColor: '#dcdfdf', width: '250px' }}>Nặng</td>
                                <td>{sanpham.kichThuoc.nang} Kg</td>
                            </tr>
                        </tbody>
                    </Table>

                    <Row style={{ backgroundColor: '#d5dde6' }}>
                        <Container>
                            <div className={'h4 font-weight-bold'} >Mô tả</div>
                        </Container>
                    </Row>
                    <Row>
                        <div className="col-sm-12" style={{ marginTop: '10px', marginBottom: '10px' }}>
                            <div dangerouslySetInnerHTML={{ __html: sanpham.moTa }}></div>
                        </div>
                    </Row>

                    <Row style={{ backgroundColor: '#d5dde6' }}>
                        <Container>
                            <div className={'h4 font-weight-bold text-dark'}>Sản phẩm khác của shop</div>
                        </Container>
                    </Row>
                    <div className="row">
                        {
                            sanphamShop.map((item, i) => {
                                return (
                                    
                                    <Tooltip title={item.tenSanPham} placement={'right'} key={i}>
                                        <div class="col-sm-3" key={item._id} className={'itemDanhMuc h-100 '} style={{ backgroundColor: "white", height: 'auto', marginTop: 10, marginBottom: 10, width: 'auto' }}>
                                            
                                            <Card
                                                hoverable
                                                style={{ height: '300px', width: 240, marginTop: '10px', marginRight: '40px' }}
                                               
                                            >
                                                
                                                {/* truyen id san pham di */}
                                                <Link to={"/ChiTietSanPham/" + item._id} >
                                                    <img alt="hinh anh" src={item.anh.chinh} style={{ width: '100%', height: '100%' }}></img>
                                                    
                                                </Link>
                                                <Meta title={item.tenSanPham} />
                                                <h3 style={{ marginTop: "10px" }}>
                                                    <strong>{format_curency(item.gia.toString())} VNĐ</strong>
                                                </h3>
                                            </Card>
                                        </div>
                                    </Tooltip>
                                )
                            })
                        }
                    </div>
                    
                   
                </div>
            </div>

        </Fragment>
    );
}

