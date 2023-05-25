import { Modal } from 'antd';
import "../../../assets/css/note.css"
import { Input } from 'antd';
import { useState, useContext, useEffect } from 'react';
import ListNote from '../../../context/listNote';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const { TextArea } = Input;


const Edit = ({ modal, setModal, item }) => {
    const [textEdit, setTextEdit] = useState("")
    const [error, setError] = useState('');

    const ListCtx = useContext(ListNote)
    const { NoteArr } = ListCtx;

    // console.log(item)

    useEffect(() => {
        if (item) {
            setTextEdit(item.content)
        }
    }, [item])

    const handleChange = (e) => {
        setTextEdit(e.target.value)
    }

    const handleUpdate = () => {
        if (textEdit === "") {
            setError("Vui lòng nhập ghi chú")
        } else {
            NoteArr.filter((data) => {
                if (data.id === item.id) {
                    return data.content = textEdit
                }
            })
            setModal(false)
            toast.success("Sửa ghi chú thành công")
        }

    }

    const close = () => {
        setModal(false)
        setError("")
        setTextEdit(item.content)
    }
    return (
        <>
            <Modal
                title="Update"
                width={1000}
                centered
                open={modal}
                onOk={handleUpdate}
                onCancel={close}
            >
                <TextArea showCount type="text" value={textEdit} onChange={handleChange} rows={4} placeholder="maxLength is 150" maxLength={150} style={{ marginBottom: 40 }} />
                {error && <div style={{ color: 'red', margin: 10 }}>{error}</div>}

            </Modal>
        </>
    );
};
export default Edit;