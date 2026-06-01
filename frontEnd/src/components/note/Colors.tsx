import { useContext } from 'react';
import type { NoteContextType, Tcolor } from '../../types/@types.note';
import { NoteContext } from '../../context/NoteContext';
import { saveData } from '../../utils/storage';

interface props {
    color: Tcolor;
}

const Color = ({ color }: props) => {
    const { notes, setNotes, selectedNote, accessToken } = useContext(NoteContext) as NoteContextType;

    const changeColor = () => {
        try {
            const currentNoteIndex = notes.findIndex((note) => note.id === selectedNote?.id);

            const updatedNote = {
                ...notes[currentNoteIndex],
                colors: color,
            };

            const newNotes = [...notes];
            newNotes[currentNoteIndex] = updatedNote;
            setNotes(newNotes);

            if (accessToken && selectedNote) {
                saveData(selectedNote.id, 'colors', color);
            }

        } catch (error) {
            alert('You must select a note before changing colors');
            console.error('Error changing color:', error);
        }
    };

    return (
        <div onClick={changeColor} style={{ backgroundColor: color.colorHeader }} className="color">
        </div>
    );
};

export default Color;