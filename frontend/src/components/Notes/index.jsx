import { React } from "react";
import "../../assets/css/note.css"
import { Tooltip } from 'antd';
import { useState, useContext } from "react";
import ListNote from "../../context/listNote";
import Add from "./modal/addModal";
import Delete from "./modal/deleteModal";
import Detail from "./modal/detailModal";
import Edit from "./modal/editModal";
import { EyeOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';



export const Note = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [modalDel, setModalDel] = useState(false);
    const [modalDetail, setModalDetail] = useState(false)
    const [modalEdit, setModalEdit] = useState(false)

    const [idNote, setIdNote] = useState()
    const [itemNote, setItemNote] = useState()

    const [itemEdit, setItemEdit] = useState()


    const ListNoteCtx = useContext(ListNote)
    const { NoteArr, setNoteArr } = ListNoteCtx
    // console.log(NoteArr)

    const handleDelete = (id) => {
        setIdNote(id)
        setModalDel(true)
    }

    const handleDetail = (item) => {
        setItemNote(item)
        setModalDetail(true)
        // console.log(itemNote)
    }

    const handleEdit = (item) => {
        setItemEdit(item)
        setModalEdit(true)
    }

    return (
        <>
            <div className="container" >
                <header>
                    <h1>Notes</h1>
                    <button onClick={() => setModalOpen(true)}>
                        +
                    </button>
                </header>
                <div className="cards-container">
                    {NoteArr.map((item, idx) => {
                        return (
                            <div className="card" key={idx} style={{ backgroundColor: `${item.color}` }}>
                                <p className="main-text">
                                    {item.content}
                                </p>
                                <span className="date">
                                    {item.date}
                                    <p></p>
                                    <Tooltip placement="top" title="Chi tiết">
                                        <EyeOutlined onClick={() => handleDetail(item)} />
                                    </Tooltip>
                                    <Tooltip placement="top" title="Sửa" onClick={() => handleEdit(item)}>
                                        <EditOutlined />
                                    </Tooltip>
                                    <Tooltip placement="top" title="Xóa">
                                        <DeleteOutlined onClick={() => handleDelete(item.id)} />
                                    </Tooltip>
                                </span>
                            </div>
                        )
                    })}


                </div>
            </div >


            {/* Add */}
            <Add modal={modalOpen} setModal={setModalOpen} />

            {/* Delete */}
            <Delete modal={modalDel} setModal={setModalDel} id={idNote} />

            {/* Detail */}
            <Detail modal={modalDetail} setModal={setModalDetail} item={itemNote} />

            {/* Edit */}
            <Edit modal={modalEdit} setModal={setModalEdit} item={itemEdit} />
        </>
    )
}