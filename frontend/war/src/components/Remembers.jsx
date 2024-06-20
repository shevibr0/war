import React, { useEffect, useState } from 'react';
import { deleteMemory, getMemoriesById } from '../utils/MemoryUtil';
import { useNavigate, useParams } from 'react-router';
import { useSelector } from 'react-redux';
import Sidebar from './Sidebar';

const Remembers = () => {
    const nav = useNavigate();
    const { id } = useParams();
    const [isOpen, setIsOpen] = useState(false);
    const [remembers, setRemembers] = useState([]);
    const user = useSelector(state => state.user.connectedUser);

    const fetchRemembers = async () => {
        try {
            const data = await getMemoriesById(id); // Implement the getRemembers function
            setRemembers(data);
            console.log('Remembers data:', data);
        } catch (error) {
            console.error('Error fetching remembers:', error);
            // Handle error
        }
    };

    useEffect(() => {
        // Fetch remembers data from your API
        fetchRemembers();
    }, [id]);

    const handleEdit = async (memoryId) => {
        nav(`${memoryId}/editMemory`);
    }

    const handleDelete = async (id) => {
        // חלון אישור עם אפשרות מחיקה או ביטול
        if (window.confirm("האם אתה בטוח שברצונך למחוק את הזיכרון?")) {
            try {
                const data = await deleteMemory(id);
                // עדכון המערך לאחר המחיקה
                setRemembers(currentRemembers => currentRemembers.filter(memory => memory.Id !== id));
            } catch (error) {
                console.error("Error deleting memory:", error);
            }
        } else {
            // המשתמש בחר לא למחוק את הזיכרון
            console.log("מחיקת הזיכרון בוטלה");
        }
    }

    return (
        <div className="bg-gray-200 h-screen text-gray-800">
            <Sidebar />
            <div className='mt-4 flex justify-center'>
                <button className='btn bg-white font-bold cursor-pointer p-2 rounded-lg shadow-top shadow-gray-500  hover:animate-button-push' onClick={() => nav(`/soldierInfo/${id}/addMemory`)}>
                    + הוסף זכרון
                </button>
            </div>
            <div className="mt-3">
                <ul style={{ direction: 'rtl' }} className="flex flex-wrap justify-center bg-gray-200">
                    {remembers.map((remember, index) => (
                        <li key={index} className="bg-yellow-100 shadow-lg p-4 m-2 rounded-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col justify-between  w-60">
                            <strong className="break-words whitespace-pre-wrap">{remember.Remember}</strong><br />
                            <p className='text-gray-400 text-sm'>נכתב בתאריך {new Date(remember.Date).toLocaleDateString()}</p>
                            <p className='text-gray-400'>ע"י {remember.IdUserNavigation.Name}</p>
                            {user && user.Id === remember.IdUser && (
                                <div className="flex mt-0 pt-2 justify-end">
                                    <button onClick={() => handleEdit(remember.Id)} className="hover:text-red-700">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21H3v-3.5L14.732 3.732z"></path></svg>
                                    </button>
                                    <button onClick={() => handleDelete(remember.Id)} className="hover:text-red-700">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                                    </button>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default Remembers;
