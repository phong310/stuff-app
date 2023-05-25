import React, { useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { addUser } from "../../../store/userSlice"
import { Button, Col, Drawer, Form, Input, Row, Select, Space } from 'antd';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';


const { Option } = Select;

export const AddUser = ({ open, setOpen }) => {

    // form state
    const [name, setName] = useState("")
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [tags, setTags] = useState("")
    const [description, setDescription] = useState("")

    const formRef = useRef(null)

    const dispatch = useDispatch()

    const handleChangeStatus = (vl) => {
        setTags(vl)
    }


    const handleAdd = () => {
        const newDate = {
            key: uuidv4(),
            name: name,
            email: email,
            phone: phone,
            address: address,
            tags: tags === "active" ? "Kích hoạt" : "Chưa kích hoạt",
            description: description
        }
        // validate
        formRef.current.validateFields().then(() => {
            dispatch(addUser(newDate));
            toast.success("Thêm người dùng thành công ")
            setOpen(false);
            reset_data()
        })

    }


    const onClose = () => {
        setOpen(false);
        reset_data()
    };

    const reset_data = () => {
        formRef.current.resetFields();
        setName("");
        setEmail("");
        setPhone("");
        setAddress("");
        setTags("");
        setDescription("")
    }




    return (
        <>
            <Drawer
                title="Thêm mới người dùng"
                width={720}
                onClose={onClose}
                open={open}
                bodyStyle={{
                    paddingBottom: 80,
                }}
                extra={
                    <Space>
                        <Button onClick={onClose}>Hủy</Button>
                        <Button onClick={handleAdd} type="primary">
                            Thêm
                        </Button>
                    </Space>
                }
            >
                <Form ref={formRef} layout="vertical" onFinish={handleAdd} >
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="name"
                                label="Họ và Tên"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập họ và tên',
                                    },
                                ]}
                            >
                                <Input value={name} onChange={(e) => { setName(e.target.value) }} placeholder="Nhập họ và tên" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="email"
                                label="Email"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập email',
                                    },
                                ]}
                            >
                                <Input value={email} placeholder="Nhập email" onChange={(e) => { setEmail(e.target.value) }} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="phone"
                                label="SĐT"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập SĐT',
                                    },
                                ]}
                            >
                                <Input value={phone} onChange={(e) => { setPhone(e.target.value) }} type='number' placeholder="Nhập số điện thoại" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="address"
                                label="Địa chỉ"
                            >
                                <Input value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Nhập địa chỉ cư trú" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item
                                name="status"
                                label="Trạng thái"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng chọn trạng thái',
                                    },
                                ]}
                            >
                                <Select placeholder="Chọn trạng thái" onChange={handleChangeStatus}>
                                    <Option value="active">Kích hoạt</Option>
                                    <Option value="inactive">Chưa kích hoạt</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item
                                name="description"
                                label="Mô tả"
                            >
                                <Input.TextArea value={description} onChange={(e) => { setDescription(e.target.value) }} showCount maxLength={300} rows={4} placeholder="Nhập mô tả" />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Drawer>
        </>
    );
}
