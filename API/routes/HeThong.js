var express = require('express'); //
var router = express.Router(); // 

const SanPhamController = require('../controller/SanPhamController');
const AuthController = require('../controller/AuthController');
const DangKyController = require('../controller/DangKyController');
const GioHangController = require('../controller/GioHangController');
const DonHangController = require('../controller/DonHangController');
const DanhMucController = require('../controller/DanhMucController');
const ChiTietDonHangController = require('../controller/ChiTietDonHangController');
const DangKyGianHangController = require('../controller/DangKyGianHangController');
const UserController = require('../controller/UserController');
const BlogController = require('../controller/BlogController');
const CarouselController = require('../controller/CarouselController');
const ThongbaoController = require('../controller/ThongbaoController');
//Carousel
router.get('/Carousel', CarouselController.LayDanhSachCarousel);
router.get('/baiviet-item', CarouselController.LayBaiVietTheoID);
//sanpham
router.get('/sanpham', SanPhamController.LayDanhSachSanPham); //
router.get('/SanPham-detail', SanPhamController.LaySanPhamTheoID);
router.post('/sanphamshop', SanPhamController.TaoSanPhamShop);
router.get('/sanpham-baiviet', SanPhamController.LayDanhSachProductTheoIDBaiViet);

//giohang
router.get('/giohang', GioHangController.LayDanhSachGioHang);
router.post('/giohang-them', GioHangController.ThemGioHang);


//donhang
router.post('/donhang', DonHangController.ThemDonHang);
router.post('/donhangpaypall', DonHangController.ThemDonHang2);
router.put('/thanhtoanthanhcong', DonHangController.ThanhToanThanhCong);
router.get('/donhang', DonHangController.LayDanhSachDonHang);

//taikhoan Auth
router.post('/dangnhap', AuthController.KiemTraAccount);
router.post('/dangky', DangKyController.ThemUser);

//danh muc
router.get('/danhmuc/:page', DanhMucController.LayDanhSachDanhMuc);
router.get('/danhmuc-sanpham', DanhMucController.LayDanhMucTheoID);
router.get('/sanphamtheodanhmuc', DanhMucController.LaySanPhamTheoDanhMuc);
// router.get('/categorys-search-nguoidung', DanhMucController.LayDanhSachCategory_Search_NguoiDung);
router.get('/danhmuc_trangchu', DanhMucController.LayDanhSachDanhMucTrangChu);
router.get('/danhmuc-timkiem', DanhMucController.LayDanhSachDanhMucTheoTimKiem);
router.get('/danhmuc-item', DanhMucController.LayDataMotDanhMucTheoID);
router.post('/danhmuc-them', DanhMucController.ThemCategory);
router.put('/danhmuc-sua', DanhMucController.SuaCategory);
router.delete('/danhmuc-xoa', DanhMucController.XoaCategory);
router.put('/danhmuc-khoa', DanhMucController.KhoaCategory);
router.get('/danhmuc-theosanpham', DanhMucController.LayCategoryTheoIDSanPham);
//chitietdonhang
router.get('/doanhthu-homnay', ChiTietDonHangController.LayDoanhThu_HomNay_Admin);
router.get('/doanhthu-tuannay', ChiTietDonHangController.LayDoanhThu_TuanNay_Admin);
router.get('/doanhthu-tuantruoc', ChiTietDonHangController.LayDoanhThu_TuanTruoc_Admin);

//shop
router.put('/dangkygianhang', DangKyGianHangController.DangKyGianHang);
router.get('/thongtinshop', DangKyGianHangController.LayThongTinShopTheoID);
router.get('/shop-theosanpham', DangKyGianHangController.LayShopTheoIDSanPham);

router.get('/shop-theoidsanpham', DangKyGianHangController.LaySanPhamShopTheoIDSanPham);
//user
router.get('/users-item', UserController.LayThongTinMotUserTheoID);
//blog 
router.post('/post-them', BlogController.ThemBaiViet);
router.get('/blog', BlogController.LayDanhSachBlog);

//thongbao
router.get('/thongbao', ThongbaoController.LayDanhSachThongBao);

//tim kiem
router.get('/datasearch-lichsutimkiem', SanPhamController.LayDanhSachDataSearchLichSuTimKiem);
router.post('/datasearch-capnhat', SanPhamController.CapNhatTimKiem);
router.get('/products-search-nguoidung', SanPhamController.LayTatCaSanPham_Search_NguoiDung_TheoTrang);
module.exports = router;
