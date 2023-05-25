import { Modal } from 'antd';
import "../../../assets/css/note.css"
import { useContext } from 'react';
import ListNote from '../../../context/listNote';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const Delete = ({ modal, setModal, id }) => {

    const ListCtx = useContext(ListNote)
    const { NoteArr, setNoteArr } = ListCtx

    const handleDelete = () => {
        setModal(false)
        const result = NoteArr.filter((item) => item.id !== id)
        toast.warn("Xóa ghi chú thành công")
        setNoteArr(result)
    }

    return (
        <>
            <Modal
                title="Delete Notes"
                centered
                open={modal}
                onOk={handleDelete}
                onCancel={() => setModal(false)}
            >
                <p className='text'>Bạn có chắc muốn xóa ghi chú số {id} ?</p>
            </Modal>
        </>
    );
};
export default Delete;