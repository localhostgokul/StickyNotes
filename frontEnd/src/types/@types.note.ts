import React from 'react';

export interface Note {
    id: number;
    title: string;
    content: string;
    color: Tcolor;
    position: pos;
    // createdAt: string;
    // updatedAt: string;
}

export interface Tcolor {
    id: string;
    colorHeader: string;
    colorBody: string;
    colorText: string;
}

export interface pos {
    x: number;
    y: number;
}

export type NoteContextType = {
    notes: Note[];
    setNotes: React.Dispatch<React.SetStateAction<Note[]>>;
    selectedNote: Note | null;
    setSelectedNote: React.Dispatch<React.SetStateAction<Note | null>>;
    accessToken: string | null;
    setAccessToken: React.Dispatch<React.SetStateAction<string | null>>;
}