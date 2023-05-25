import { Modal } from 'antd';
import "../../../assets/css/note.css"

const Detail = ({ modal, setModal, item }) => {


    return (
        <>
            <Modal
                title="Detail"
                centered
                open={modal}
                onOk={() => setModal(false)}
                onCancel={() => setModal(false)}
            >
                <div>
                    {JSON.stringify(item)}
                </div>

            </Modal>
        </>
    );
};
export default Detail;