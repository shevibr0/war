import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUnConnectedUser } from '../features/userSlice';

const LogOut = () => {
    const dispatch = useDispatch();
    const nav = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('user'); // מחיקת המשתמש מ-localStorage
        dispatch(setUnConnectedUser()); // מחיקת המשתמש מה-Redux store
        nav('/soldiers'); // ניווט חזרה לדף הבית או לדף ההתחברות
    };

    return (
        <div className="bg-gray-200 h-screen flex justify-center items-center">
            <div className="text-center">
                <h1 className="text-2xl font-bold mb-4">?האם אתה בטוח שברצונך להתנתק</h1>
                <button onClick={handleLogout} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                    התנתק
                </button>
            </div>
        </div>
    );
}

export default LogOut;
