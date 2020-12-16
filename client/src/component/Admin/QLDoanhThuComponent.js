import React, { Fragment, useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { axios } from '../../config/constant';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function QLDoanhThuComponent() {
    const [doanhThu, setDoanhThu] = useState(0);
    // tao 1 bien, bien nay chua thuoc tinh api khi tra ve
    const [dataChartTuanNay, setDataChartTuanNay] = useState({
        labels: ['VietNam', 'My', 'ThaiLan', 'VietNam', 'My', 'ThaiLan', ''],
        datasets: [{
            label: 'danso',
            data: [10000, 20000, 30000, 40000, 50000, 60000],
            backgroundColor: ['rgba(255,99,132,0.6)', 'rgba(54,162,235,0.6)']
        }]
    })

    const [dataChartTuanTruoc, setDataChartTuanTruoc] = useState({
        labels: ['VietNam', 'My', 'ThaiLan', 'VietNam', 'My', 'ThaiLan', ''],
        datasets: [{
            label: 'danso',
            data: [10000, 20000, 30000, 40000, 50000, 60000],
            backgroundColor: ['rgba(255,99,132,0.6)', 'rgba(54,162,235,0.6)']
        }]
    })
    // ham goi api lay danh sach doanh thu hom nay
    async function LayDoanhThuHomNayAdmin() {
        let res = await axios.get('/doanhthu-homnay');

        if (res.data.status === 'thanhcong') {
            setDoanhThu(res.data.data);
        } else {
            alert('Lay data doanh thu hom nay that bai');
        }
    }

    async function LayDoanhThuTuanNayAdmin() {
        let res = await axios.get('/doanhthu-tuannay');

        if (res.data.status === 'thanhcong') {
            setDataChartTuanNay({
                labels: res.data.dataNgay,
                datasets: [{
                    label: 'Doanh thu',
                    data: res.data.data,
                    backgroundColor: 'rgba(255,99,132,0.6)'
                }]
            })
        } else {
            alert('Lay data doanh thu tuan nay that bai');
        }
    }

    async function LayDoanhThuTuanTruocAdmin() {
        let res = await axios.get('/doanhthu-tuantruoc');

        if (res.data.status === 'thanhcong') {
            setDataChartTuanTruoc({
                labels: res.data.dataNgay,
                datasets: [{
                    label: 'Doanh thu',
                    data: res.data.data,
                    backgroundColor: 'rgba(54,162,235,0.6)'
                }]
            })
        } else {
            alert('Lay data doanh thu tuan nay that bai');
        }
    }

    useEffect(() => {
        LayDoanhThuHomNayAdmin();
        LayDoanhThuTuanNayAdmin();
        LayDoanhThuTuanTruocAdmin();
    }, [])

    return (
        <Fragment>
            <div className="col-sm-8" style={{ padding: 39, left: 10 }}>
                <h6>Doanh thu hôm nay : {doanhThu}</h6>
                <div className='col'>
                    <h6>Doanh thu tuần này</h6>
                    <Bar
                        data={dataChartTuanNay}>
                    </Bar>
                </div>

                <div className='col'>
                    <h6>Doanh thu tuần trước</h6>
                    <Bar
                        data={dataChartTuanTruoc}>
                    </Bar>
                </div>
            </div>
        </Fragment>
    );
}



