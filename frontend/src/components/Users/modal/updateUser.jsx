import React, { useState, useEffect } from 'react'
import { Button, Col, Drawer, Form, Input, Row, Select, Space } from 'antd';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { updateUser } from '../../../store/userSlice';


const { Option } = Select;

export const UpdateUser = ({ open, setOpen, item }) => {
    const [placement, setPlacement] = useState('left');
    const [form] = Form.useForm()
    const dispatch = useDispatch()

    // form state
    const [name, setName] = useState("")
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [tags, setTags] = useState("")
    const [description, setDescription] = useState("")


    const handleChangeStatus = (vl) => {
        setTags(`${vl}`)
    }


    useEffect(() => {
        if (item) {
            form.setFieldsValue({
                name: item?.name,
                email: item?.email,
                phone: item?.phone,
                address: item?.address,
                tags: item?.tags,
                description: item?.description
            })
            setName(item?.name);
            setEmail(item?.email);
            setPhone(item?.phone);
            setAddress(item?.address);
            setTags(item?.tags);
            setDescription(item?.description)
        }
    }, [item, form])


    const handleUpdate = () => {
        const newData = {
            key: item.key,
            name: name,
            email: email,
            phone: phone,
            address: address,
            tags: tags === "active" ? "Kích hoạt" : "Chưa kích hoạt",
            description: description
        }
        // console.log(newData)
        // validate
        form.validateFields().then(() => {
            dispatch(updateUser(newData))
            toast.success("Cập nhật người dùng thành công ")
            setOpen(false);
        })


    }


    const onClose = () => {
        setOpen(false);
    };


    return (
        <>
            <Drawer
                title="Update người dùng"
                width={720}
                onClose={onClose}
                placement={placement}
                open={open}
                bodyStyle={{
                    paddingBottom: 80,
                }}
                extra={
                    <Space>
                        <Button onClick={onClose}>Hủy</Button>
                        <Button onClick={handleUpdate} type="primary">
                            Cập nhật
                        </Button>
                    </Space>
                }
            >
                <Form form={form} layout="vertical"  >
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
                                <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Nhập họ và tên" />
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
                                <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Nhập email" />
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
                                <Input value={phone} onChange={(e) => setPhone(e.target.value)} type='number' placeholder="Nhập số điện thoại" />
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
                                name="tags"
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
                                <Input.TextArea value={description} onChange={(e) => setDescription(e.target.value)} showCount maxLength={300} rows={4} placeholder="Nhập mô tả" />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Drawer>
        </>
    );
}
