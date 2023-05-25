import React from 'react'
import { Modal } from 'antd';


export const DetailUser = ({ open, setOpen, item }) => {

    return (
        <>
            <Modal
                title="Detail User"
                centered
                open={open}
                onOk={() => setOpen(false)}
                onCancel={() => setOpen(false)}
            >
                {JSON.stringify(item)}
            </Modal>
        </>
    );
}
