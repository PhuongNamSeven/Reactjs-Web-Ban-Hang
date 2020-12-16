import React, { useEffect, useState } from 'react'
import { axios } from '../../config/constant';
import { Card, Typography, Row } from 'antd';
const { Meta } = Card;

function BlogPage() {
    const [blogs, setBlogs] = useState([])
    async function LayDanhSachBlog() {
        let res = await axios.get('/blog');
        if (res.data.status === 'thanhcong') {
            setBlogs(res.data.data);
        } else {
            alert('ket noi Api danh muc khong thanh cong');
        }
    }
    useEffect(() => {
        LayDanhSachBlog();
    }, []);
    const renderCards = blogs.map((blog, index) => {
        return <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2">
            <Card
                hoverable
                style={{ width: 300 }}
                actions={[
                ]}
            >
                <Meta
                    description="Phuong Nam Seven"
                />
                <div style={{ height: 150, overflowY: 'scroll', marginTop: 10 }}>
                    <div dangerouslySetInnerHTML={{ __html: blog.content }} />
                </div>
            </Card>
        </div>
    })
    return (
        <div style={{ width: '85%', margin: '3rem auto' }}>
            <Row gutter={[32, 16]}>
                {renderCards}
            </Row>
        </div>
    )
}

export default BlogPage