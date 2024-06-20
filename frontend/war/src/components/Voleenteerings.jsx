import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router';
import { deleteVolunteeringOption, getVolunteeringOptionById } from '../utils/VolunteeringOptionUtil';
import { useSelector } from 'react-redux';
import Sidebar from './Sidebar';

const Voleenteerings = () => {
    const nav = useNavigate()
    const [isOpen, setIsOpen] = useState(false);
    const { id } = useParams();
    const user = useSelector(state => state.user.connectedUser);
    const [volunteeringOptions, setVolunteeringOptions] = useState([]);

    const fetchVolunteeringOptions = async () => {
        try {
            const options = await getVolunteeringOptionById(id);
            setVolunteeringOptions(options);
            console.log("volunteeringOptions", volunteeringOptions)
        } catch (error) {
            console.error('Error fetching volunteering options:', error);
        };
    }

    useEffect(() => {
        fetchVolunteeringOptions();
    }, [id]);

    const handleEdit = async (optionId) => {
        nav(`${optionId}/editVolunteering`);
    }

    const handleDelete = async (id) => {
        // חלון אישור עם אפשרות מחיקה או ביטול
        if (window.confirm("האם אתה בטוח שברצונך למחוק את ההתנדבות?")) {
            try {
                const data = await deleteVolunteeringOption(id);
                // עדכון המערך לאחר המחיקה
                setVolunteeringOptions(currentVolunteeringOptions => currentVolunteeringOptions.filter(option => option.Id !== id));
            } catch (error) {
                console.error("Error deleting volunteering option:", error);
            }
        } else {
            // המשתמש בחר לא למחוק את ההתנדבות
            console.log("מחיקת ההתנדבות בוטלה");
        }
    }

    return (
        <div className="bg-gray-200 h-screen">
            <Sidebar />
            <div className='mt-4 flex justify-center'>
                <button className='btn bg-white font-bold cursor-pointer p-2 rounded-lg shadow-top shadow-gray-500  hover:animate-button-push' onClick={() => nav(`/soldierInfo/${id}/addVolunteer`)}>
                    + הוסף התנדבות
                </button>
            </div>
            <div className="mt-3">
                <ul style={{ direction: 'rtl' }} className="flex flex-wrap justify-center bg-gray-200">
                    {volunteeringOptions.map(option => (
                        <li key={option.Id} className="bg-yellow-100 shadow-lg p-4 m-2 rounded-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col justify-between  w-60">
                            <strong className="break-words whitespace-pre-wrap"> {option.Description} </strong><br />
                            <p className='text-gray-400 text-sm'>נכתב בתאריך {new Date(option.Date).toLocaleDateString()}</p>
                            <p className=' text-gray-400'>ע"י {option.IdUserNavigation.Name}</p>
                            {user && user.Id === option.IdUser && (
                                <div className="flex mt-0 pt-2 justify-end">
                                    <button onClick={() => handleEdit(option.Id)} className="text-black hover:text-red-700">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21H3v-3.5L14.732 3.732z"></path></svg>
                                    </button>
                                    <button onClick={() => handleDelete(option.Id)} className="text-black hover:text-red-700">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
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

export default Voleenteerings;
