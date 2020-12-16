import React, { Fragment, lazy, Suspense } from 'react';
import './App.css';
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom';
import { ChiTietSanPham, GioHang, DangKy, ThanhToan, TrangChuAdmin, DangKyGianHang, Thongbao, TKnguoidung, ShopCuaBan,Footer,CheckoutShipping,CheckoutPayment,ResultPage,BaiViet,DanhMuc,TimKiem } from '../src/component/index';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const TrangChu = lazy(() => import('./component/TrangChu/TrangChu'));

function App() {
  return (
    <Router>
      <Fragment>
        <ToastContainer/>
        <Switch>
          <Suspense fallback={<div>Loading...</div>}>
            <Route exact path="/" component={TrangChu}></Route>
            <Route path="/chitietsanpham/:id" component={ChiTietSanPham}></Route>
            <Route path="/baiviet/:id" component={BaiViet}></Route>
            <Route path="/danhmuc/:id" component={DanhMuc}></Route>
            <Route path="/GioHang/cart" component={GioHang}></Route>
            <Route path="/GioHang/shipping" component={CheckoutShipping}></Route>
            <Route path="/GioHang/payment" component={CheckoutPayment}></Route>
            <Route path="/GioHang/success" component={ResultPage}></Route>
            <Route path="/DangKy" component={DangKy}></Route>
            <Route path="/ThanhToan" component={ThanhToan}></Route>
            <Route path="/Admin" component={TrangChuAdmin}></Route>
            <Route path="/DangKyGianHang" component={DangKyGianHang}></Route>
            <Route path="/timkiem" component={TimKiem}></Route>
            <Route path="/thongbao" component={Thongbao}></Route>
            <Route path="/nguoidung" component={TKnguoidung}></Route>
            <Route path="/ShopCuaBan" component={ShopCuaBan}></Route>
          </Suspense>
        </Switch>
        
      </Fragment>
    </Router>
  );
}

export default App;
