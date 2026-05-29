import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import type { FC, ReactNode } from 'react';
import Spinner from '../icons/Spinner';
import type { Note, NoteContextType } from '../types/@types.note';
import mockNotes from '../data/mockNotes';
import { ACCESS_TOKEN } from '../constants/constants';
import { NoteContext } from './NoteContext';

const NotesProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [loading, setLoading] = useState<boolean>(true);
    const [notes, setNotes] = useState<Note[]>(mockNotes);
    const [selectedNote, setSelectedNote] = useState<Note | null>(mockNotes[0] ?? null);

    const [accessToken, setAccessToken] = useState<string | null>(localStorage.getItem(ACCESS_TOKEN));
    
    const hasInitialized = useRef(false);

    const InitNotes = useCallback(() => {
        try {
            setNotes(mockNotes);
            setSelectedNote(mockNotes[0] ?? null);
        } catch (error) {
            console.error('Failed to initialize notes:', error instanceof Error ? error.message : error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (hasInitialized.current) {
            InitNotes();
        } else {
            hasInitialized.current = true;
            InitNotes();
        }
    }, [accessToken, InitNotes]);



    const contextValue = useMemo<NoteContextType>(() => ({
        notes,
        setNotes,
        selectedNote,
        setSelectedNote,
        accessToken,
        setAccessToken
    }), [notes, selectedNote, accessToken]);

    if (loading) {
        return (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
                <Spinner size="100" />
            </div>
        );
    };

    return (
        <NoteContext.Provider value={contextValue}>
            {children}
        </NoteContext.Provider>
    );
};

export default NotesProvider;