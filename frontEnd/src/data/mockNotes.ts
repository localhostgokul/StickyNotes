import type { Note } from '../types/@types.note';

export const mockNotes: Note[] = [
    {
        id: "random-id-1",
        title: "Note 1",
        content: "Hi, I am a note. You can edit me, move me around, and change my color. I will save automatically.",
        color: {
            "id": "color-yellow",
            "colorHeader": "#FFEFBE",
            "colorBody": "#FFF5DF",
            "colorText": "#18181A"
        },
        position: {
            x: 800,
            y: 500
        },
    },{
        id: "random-id-2",
        title: "Note 2",
        content: "Halloween is coming! Time to decorate your notes with spooky colors.",
        color: {
            id: "color-purple",
            colorHeader: "#FED0FD",
            colorBody: "#FEE5FD",
            colorText: "#18181A",
        },
        position: {
            x: 150,
            y: 253
        },
    },
];

export default mockNotes;