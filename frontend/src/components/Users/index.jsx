import React, { useState } from 'react'
import "../../assets/css/users.css"
import { Col, Collapse, Input, Row, Select, Button, Space, Table, Tag, Tooltip } from 'antd';
import { PlusOutlined, EyeTwoTone, EditTwoTone, DeleteTwoTone } from '@ant-design/icons';
import { AddUser } from './modal/addUser';
import { DeleteUserPop } from './modal/deleteUser';
import { DetailUser } from './modal/detailUser';
import { UpdateUser } from './modal/updateUser';

// store
import { useSelector, useDispatch } from 'react-redux';
import { searchUser, resetUser } from '../../store/userSlice';



export const Users = () => {
    const { Panel } = Collapse;
    const [nameSearch, setNameSearch] = useState("");
    const [statusSearch, setStatusSearch] = useState("")
    const [openAdd, setOpenAdd] = useState(false)
    const [openUpdate, setOpenUpdate] = useState(false)
    const [openDelete, setOpenDelete] = useState(false)
    const [openDetail, setOpenDetail] = useState(false)
    const [idItem, setIdItem] = useState()
    // const data = useSelector((state) => state.users.userArr)
    const dataFilter = useSelector((state) => state.users.filterArr)
    const { Option } = Select;

    const dispatch = useDispatch()


    const handleDelete = (record) => {
        setIdItem(record.key)
        setOpenDelete(true)
    }

    const handleChangeStatus = (value) => {
        setStatusSearch(value)
        // console.log(statusSearch)
    }
    const handleDetail = (record) => {
        setIdItem(record)
        setOpenDetail(true)
    }

    const handleUpdate = (item) => {
        setOpenUpdate(true)
        setIdItem(item)
    }

    const handleChoose = () => {
        switch (statusSearch) {
            case 'active':
                return 'Kích hoạt';
            case 'inactive':
                return 'Chưa kích hoạt';
            default:
                return
        }
    }

    // Tìm kiếm
    const handleSearch = () => {
        const searchParams = {
            name: nameSearch,
            tag: handleChoose(),
        }
        dispatch(searchUser(searchParams))
    }

    const reset_data = () => {
        dispatch(resetUser())
        setNameSearch("")
        setStatusSearch("")
    }

    const columns = [
        {
            title: 'Họ và tên',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'SDT',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Địa chỉ',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Trạng thái',
            key: 'tags',
            dataIndex: 'tags',
            render: (_, { tags }) => (
                <>
                    <Tag color={tags === 'Kích hoạt' ? 'green' : 'red'}>
                        {tags.toUpperCase()}
                    </Tag>
                </>
            ),
        },
        {
            title: 'Mô tả',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Chức năng',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Tooltip placement="top" title="Chi tiết">
                        <EyeTwoTone twoToneColor="#531dab" onClick={() => { handleDetail(record) }} />
                    </Tooltip>
                    <Tooltip placement="top" title="Sửa" onClick={() => { handleUpdate(record) }}>
                        <EditTwoTone />
                    </Tooltip>
                    <Tooltip placement="top" title="Xóa">
                        <DeleteTwoTone twoToneColor="#f5222d" onClick={() => { handleDelete(record) }} />
                    </Tooltip>
                </Space>
            ),
        },
    ];
    return (
        <>
            <Col className='col_wrapp'>
                <Collapse>
                    <Panel header="Tìm kiếm" key="1">
                        <Row>
                            <Col span={6} className="input">
                                <Input value={nameSearch} onChange={(e) => setNameSearch(e.target.value)} placeholder="Họ và tên" />
                            </Col>
                            <Col span={6}>
                                <Select
                                    className='select'
                                    value={statusSearch}
                                    onChange={handleChangeStatus}
                                >
                                    <Option value="">Tất cả</Option>
                                    <Option value="active">Kích hoạt</Option>
                                    <Option value="inactive">Chưa kích hoạt</Option>
                                </Select>
                            </Col>
                        </Row>
                        <Row justify="end">
                            <Button type="primary" ghost className='btn' onClick={handleSearch}>Tìm kiếm</Button>
                            <Button danger onClick={reset_data}>Reset bộ lọc</Button>
                        </Row>

                    </Panel>
                </Collapse>
            </Col>
            <Col className='col_wrapp_title'>
                <Row justify="space-between">
                    <h2>Danh sách người dùng <Tag color="#4096ff">{dataFilter.length}</Tag></h2>
                    <Button type="primary" icon={<PlusOutlined />} onClick={() => setOpenAdd(true)}>
                        Thêm mới
                    </Button>
                </Row>
            </Col>

            {/* Table */}
            <Table className='table' columns={columns} dataSource={dataFilter} />;

            <AddUser open={openAdd} setOpen={setOpenAdd} />

            <DeleteUserPop open={openDelete} setOpen={setOpenDelete} id={idItem} />

            <DetailUser open={openDetail} setOpen={setOpenDetail} item={idItem} />

            <UpdateUser open={openUpdate} setOpen={setOpenUpdate} item={idItem} />
        </>

    )
}
