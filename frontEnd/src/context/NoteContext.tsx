import { createContext } from 'react';
import type { NoteContextType } from '../types/@types.note';

export const NoteContext = createContext<NoteContextType | null>(null);