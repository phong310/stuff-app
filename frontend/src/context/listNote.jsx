import { createContext } from "react";

const ListNote = createContext({
    NoteArr: [],
    setNoteArr: () => { },
});

export default ListNote;
