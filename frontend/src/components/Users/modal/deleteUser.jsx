import React from 'react'
import { Modal } from 'antd';
import { toast } from 'react-toastify';

// store
import { useDispatch } from 'react-redux';
import { deleteUser } from '../../../store/userSlice';

export const DeleteUserPop = ({ open, setOpen, id }) => {
    const dispatch = useDispatch();

    const ok = () => {
        dispatch(deleteUser(id))
        toast.success("Xóa người dùng thành công")
        setOpen(false)
    }



    return (
        <>
            <Modal
                title="Delete User"
                centered
                open={open}
                onOk={ok}
                onCancel={() => setOpen(false)}
            >
                <p className='text'>Bạn có chắc muốn xóa người dùng số {id} này ?</p>
            </Modal>
        </>
    );
}
