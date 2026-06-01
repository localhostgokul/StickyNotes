import { useRef, useEffect, useState, useContext, useCallback } from "react";
import type { RefObject } from "react";
import type { Note, NoteContextType } from "../../types/@types.note";
import Draggable from "react-draggable";
import type { DraggableData, DraggableEventHandler } from "react-draggable";
import DeleteButton from "./DeleteButton";
import { NoteContext } from "../../context/NoteContext";
import Spinner from "../../icons/Spinner";
import { saveData } from "../../utils/storage";

interface Props {
    note: Note;
}

const NoteCard = ({ note }: Props) => {
    const { setSelectedNote } = useContext(NoteContext) as NoteContextType;
    const colors = note.color;
    const [position, setPosition] = useState(note.position);
    const [saving, setSaving] = useState<boolean>(false);

    const cardRef = useRef<HTMLDivElement>(null);
    const keyUpTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    const autoGrow = (ref: RefObject<HTMLTextAreaElement | null>) => {
        const { current } = ref;
        if (current) {
            current.style.height = "auto";
            current.style.height = `${current.scrollHeight}px`;
        }
    };

    const setZIndex = useCallback(
        (selectedCard: HTMLDivElement | null) => {
            if (!selectedCard) return;
            setSelectedNote(note);
            selectedCard.style.zIndex = "999";
            Array.from(
                document.getElementsByClassName("card") as HTMLCollectionOf<HTMLElement>
            ).forEach((card) => {
                if (card !== selectedCard) {
                    card.style.zIndex = String(parseInt(selectedCard.style.zIndex) - 1);
                }
            });
        },
        [note, setSelectedNote]
    );

    useEffect(() => {
        autoGrow(textAreaRef);
        setZIndex(cardRef.current);
    }, [setZIndex]);

    const handleStop: DraggableEventHandler = (_e, data: DraggableData) => {
        const pos = { x: data.x, y: data.y };
        setPosition(pos);
        saveData(note.id, "position", pos);
    };

    const handleSave = () => {
        setSaving(true);
        if (keyUpTimer.current) {
            clearTimeout(keyUpTimer.current);
        }
        keyUpTimer.current = setTimeout(() => {
            saveData(note.id, "content", textAreaRef.current?.value ?? "");
            setSaving(false);
        }, 2000);
    };

    return (
        <Draggable
            handle="strong"
            nodeRef={cardRef}
            bounds="body"
            position={position}
            onStart={() => setZIndex(cardRef.current)}
            onStop={handleStop}
        >
            <div
                ref={cardRef}
                className="card"
                style={{ backgroundColor: colors.colorBody }}
            >
                <strong className="cursor">
                    <div className="card-header" style={{ backgroundColor: colors.colorHeader }}>
                        <DeleteButton noteId={note.id} />
                        {saving && (
                            <div className="card-saving">
                                <Spinner color={colors.colorText} />
                                <span style={{ color: colors.colorText }}>Saving...</span>
                            </div>
                        )}
                    </div>
                </strong>
                <div className="card-body">
                    <textarea
                        ref={textAreaRef}
                        style={{ color: colors.colorText }}
                        defaultValue={note.content}
                        onFocus={() => setZIndex(cardRef.current)}
                        onInput={() => autoGrow(textAreaRef)}
                        onKeyUp={handleSave}
                    />
                </div>
            </div>
        </Draggable>
    );
};

export default NoteCard;