import { Modal } from 'antd';
import { useState, useContext } from "react"
import ListNote from '../../../context/listNote';
import { Input } from 'antd';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const { TextArea } = Input;


const Add = ({ modal, setModal }) => {
    const [textInput, setTextInput] = useState("")
    const listCtx = useContext(ListNote);
    const { NoteArr, setNoteArr } = listCtx

    const [error, setError] = useState('');


    const handleText = (e) => {
        // console.log(e.target.value)
        e.preventDefault();
        setTextInput(e.target.value)

    }

    const getRandomColor = () => {
        const color = "hsl(" + Math.random() * 360 + ", 100%, 75%)";
        return color;
    };

    const handleAdd = () => {
        if (textInput === "") {
            setError("Vui lòng nhập ghi chú")
        } else {
            const newItem = {
                id: Math.floor(Math.random() * 10),
                content: textInput,
                date: new Date().toLocaleDateString("Vi"),
                color: getRandomColor()
            }
            setNoteArr([...NoteArr, newItem])
            toast.success("Thêm ghi chú thành công");
            setModal(false);
            setTextInput("")
        }



    }

    const close = () => {
        setModal(false)
        setTextInput("");
        setError("")
    }


    return (
        <>
            <Modal
                title="Add Notes"
                width={1000}
                centered
                open={modal}
                onOk={handleAdd}
                onCancel={close}
            >
                <TextArea showCount value={textInput} onChange={handleText} rows={4} placeholder="maxLength is 150" maxLength={150} style={{ marginBottom: 40 }} />
                {error && <div style={{ color: 'red', margin: 10 }}>{error}</div>}
            </Modal>
        </>
    );
};
export default Add;