import { useContext, useEffect } from 'react';
import Control from '../components/note/Control';
import NoteCard from '../components/note/NoteCard';
import { NoteContext } from '../context/NoteContext';
import type { NoteContextType } from '../types/@types.note';

import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants/constants';
import { jwtDecode } from 'jwt-decode';
import ApiService from '../api/ApiService';

const NotePage = () => {
    const { notes, setNotes, accessToken, setAccessToken } = useContext(NoteContext) as NoteContextType;

    const auth = async () => {
        const token = localStorage.getItem(ACCESS_TOKEN);

        if(!token) {
            setAccessToken(null);
            return;
        }
        const decode = jwtDecode(token);
        const tokenExpiration = decode.exp;
        function getTimestamp(): number {
            return Date.now();
        }
        const now = getTimestamp() / 1000;

        if (tokenExpiration && tokenExpiration < now) {
            await refreshToken();
        } else {
            setAccessToken(localStorage.getItem(ACCESS_TOKEN));
        }
    };

    const refreshToken = async () => {
        const refreshToken = localStorage.getItem(REFRESH_TOKEN);
        try {
            const response = await ApiService.postWithToken("/api/user/login/token/refresh/", {
                'refresh': refreshToken,
            });
            // console.log('response', response);

            if (response.status === 200) {
                localStorage.setItem(ACCESS_TOKEN, response.access);
                setAccessToken(localStorage.getItem(ACCESS_TOKEN));
            } else {
                setAccessToken(null);
            }
        } catch (error) {
            console.log(error);
            setAccessToken(null);
        }
    };

    const getNotes = () => {
        ApiService.get('/notes/').then((response) => {
            setNotes(response);
        })
    };

    useEffect(() => {
        if (accessToken) {
            auth().catch(() => {
                setAccessToken(localStorage.getItem(ACCESS_TOKEN));
            })
            if (accessToken) { getNotes() }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [accessToken])

    return (
        <>
            <div style={{zIndex: "9999", }}>
                {/* { accessToken !== null ? <LoggedInProfile /> : <DefaultProfile /> } */}
            </div>

            <div>
                {
                    notes.map((note) => (
                        <NoteCard key={note.id} note={note} />))
                }
                <Control />
            </div>
        </>
    );
}

export default NotePage;