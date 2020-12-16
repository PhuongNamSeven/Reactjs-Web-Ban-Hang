import React, { Fragment, useEffect, useState } from 'react'
import { axios } from '../../config/constant';
import { useQueryParams, StringParam, NumberParam } from 'use-query-params';
import { useHistory } from 'react-router-dom';
import { message, Dropdown, Input } from 'antd';
import { useDispatch } from 'react-redux'

const { Search } = Input;
export default function TimKiem() {
    const [DataDanhmuc, setDataDanhmuc] = useState([]);
    const [DataCountDanhMuc, setDataCountDanhMuc] = useState([]);
    const history = useHistory();
    const dispatch = useDispatch();
    const valueSearch = dispatch;
    const [query, setQuery] = useQueryParams({
        data: StringParam,
        order: StringParam,
        rating: NumberParam,
        price: StringParam
    });
    const { data: dataSearch, order: optionOrder, rating: soSao, price: giaTim } = query;
    async function LayDataCategoryTheoSearch() {
        let res = await axios.get('/categorys-search-nguoidung/?search=' + valueSearch);

        if (res.data.status === 'success') {
            setDataDanhmuc(res.data.data);
            setDataCountDanhMuc(res.data.dataCount);
        } else {
            message.error('Lấy data category theo tìm kiếm thất bại');
        }
    }
    useEffect(() => {
        LayDataCategoryTheoSearch();
    }, [dataSearch])
    return (
        <Fragment>
            <div style={{ width: '40%' }} id={'thanhsearch'}>
                <Dropdown trigger={['click']}
                    getPopupContainer={() => document.getElementById('thanhsearch')}>
                    <Search style={{ marginLeft: '10px' }}
                        placeholder="Nhập từ khóa"
                        size="large"
                        onChange={(e) => {
                        }}
                    >
                    </Search>
                </Dropdown>
            </div>
        </Fragment>
    )
}


