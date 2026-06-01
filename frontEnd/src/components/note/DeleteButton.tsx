import Trash from "../../icons/Trash";
import { useContext } from "react";
import { NoteContext } from "../../context/NoteContext";
import type { NoteContextType } from "../../types/@types.note";
import ApiService from "../../api/ApiService";

interface Props {
    noteId: string;
}

const DeleteButton = ({ noteId }: Props) => {
    const { setNotes, accessToken } = useContext(NoteContext) as NoteContextType;

    const handleDelete = async () => {
        setNotes((prev) => prev.filter((note) => note.id !== noteId));
        if (accessToken) {
            try {
                await ApiService.delete(`/notes/delete/${noteId}/`);
            } catch (error) {
                if (error instanceof Error) {
                    console.error(`Failed to delete note ${noteId}:`, error.message);
                }
            }
        }
    };

    return (
        <div onClick={handleDelete}>
            <Trash />
        </div>
    );
};

export default DeleteButton;