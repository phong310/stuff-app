import { useState } from 'react'
import HeaderMain from './components/layout/menu'
import ListNote from './context/listNote'
import { ToastContainer } from 'react-toastify';


function App() {
  const getRandomColor = () => {
    const color = "hsl(" + Math.random() * 360 + ", 100%, 75%)";
    return color;
  };
  const [NoteArr, setNoteArr] = useState([
    {
      id: Math.floor(Math.random() * 10),
      content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
      date: new Date().toLocaleDateString("Vi"),
      color: getRandomColor()
    },
    {
      id: Math.floor(Math.random() * 10),
      content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      date: new Date().toLocaleDateString("Vi"),
      color: getRandomColor()
    }
  ])

  return (
    <>
      <ListNote.Provider value={{
        NoteArr: NoteArr,
        setNoteArr: setNoteArr
      }}>
        <ToastContainer autoClose={2000} theme="colored" />
        <HeaderMain />
      </ListNote.Provider>
    </>
  )
}

export default App
