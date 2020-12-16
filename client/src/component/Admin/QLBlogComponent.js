import React, { Fragment, useState } from 'react';
import QuillEditor from './QuillEditor';
import { Typography, Button, Form } from 'antd';
import { axios } from '../../config/constant';
const { Title } = Typography;

export default function QLBlogComponent(props) {
    const [files, setFiles] = useState([])
    const [noidung, setNoidung] = useState({
        content: ''
    })
    const onEditorChange = (value) => {
        setNoidung({
            ...noidung,
            content: value
        })
    }
    const onFilesChange = (files) => {
        setFiles(files)
    }

    async function ThemBlog() {
        let res = await axios.post('/post-them', {
            data: noidung
        });
        if (res.data.status === 'success') {
            window.location.pathname = '/';
            alert("Thêm thành công");
        } else {
            alert("Thêm thất bại");
        }
    }

    return (
        <Fragment>
            <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
                <div style={{ textAlign: 'center' }}>
                    <Title level={2} > Trang tạo Blog </Title>
                </div>
                <QuillEditor
                    placeholder={"Start Posting Something"}
                    onEditorChange={onEditorChange}
                    onFilesChange={onFilesChange}
                />
                <Form >
                    <div style={{ textAlign: 'center', margin: '2rem', }}>
                        <Button
                            size="large"
                            htmlType="submit"
                            className=""
                            onClick={(e) => {
                                e.preventDefault();
                                ThemBlog();
                            }}
                        >
                            Submit
                </Button>
                    </div>
                </Form>
            </div>
        </Fragment>

    );
}
