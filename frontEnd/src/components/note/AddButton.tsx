import { useContext, useRef } from "react";
import { NoteContext } from "../../context/NoteContext";
import type { NoteContextType } from "../../types/@types.note";
import colors from "../../assets/data/colors.json";

import ApiService from "../../api/ApiService";
import Plus from "../../icons/Plus";

const AddButton = () => {
    const startingPosition = useRef(10);

    const { setNotes, accessToken } = useContext(NoteContext) as NoteContextType;

    const AddNote = async () => {
        const payload = {
            title: `test1`,
            content: `test`,
            position: {
                x: startingPosition.current,
                y: startingPosition.current
            },
            color: colors[0],
        };

        startingPosition.current += 10;

        if (accessToken !== null) {
            try {
                ApiService.post('/notes/', JSON.stringify(payload)).then((response) => {
                    setNotes((prevNotes) => [response, ...prevNotes]);
                });
            } catch (error) {
                console.error("Error adding note:", error);
            }
        } else {
            alert("Please log in to add a note.");
        }
    }

    return (
        <div id="add-btn" onClick={AddNote}>
            <Plus />
        </div>
    );
};

export default AddButton;