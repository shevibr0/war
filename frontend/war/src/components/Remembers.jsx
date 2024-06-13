import React, { useEffect, useState } from 'react';
import { deleteMemory, getMemoriesById } from '../utils/MemoryUtil';
import { useNavigate, useParams } from 'react-router';
import { useSelector } from 'react-redux';


const Remembers = () => {
    const nav = useNavigate()
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
        if (window.confirm("האם אתה בטוח שברצונך למחוק את המתכון?")) {
            try {
                const data = await deleteMemory(id);
                // עדכון המערך לאחר המחיקה
                setRemembers(currentRecipes => currentRecipes.filter(memory => memory.Id !== id));
            } catch (error) {
                console.error("Error deleting recipe:", error);
            }
        } else {
            // המשתמש בחר לא למחוק את המתכון
            console.log("מחיקת המתכון בוטלה");
        }
    }
    return (
        <div className="bg-gray-200 h-screen">
            <button className="lg:hidden md:hidden sm:hidden" onClick={() => { setIsOpen(!isOpen) }} >
                <svg className="w-6 h-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 11h16M4 16h16" />
                </svg>
            </button>
            {isOpen && (
                <nav className="lg:hidden md:hidden sm:hidden left-0 top-0 flex shadow bg-white  justify-around items-center text-black lg:text-3xl lg:h-[80px] md:text-2m md:h-[30px] sm:text-sm  text-xs mt-4 sm:mt-0 font-normal font-['Alef'] leading-[45px] cursor-pointer">
                    {!user && (
                        <>
                            <div onClick={() => nav('/register')}>הרשמה</div>
                            <div onClick={() => nav('/')}>התחברות</div>
                        </>
                    )}
                    {user && (
                        <>
                            <div onClick={() => nav('/logOut')}>התנתקות</div>
                        </>
                    )}

                    <div onClick={() => nav('/contact')}>
                        צור קשר
                    </div>
                    <div onClick={() => nav('/soldiers')} className='font-bold'>
                        חיפוש
                    </div>
                    <div onClick={() => nav('/homePage')} >
                        אודות
                    </div>
                </nav>
            )}
            <nav className="hidden lg:flex md:flex sm:flex left-0 top-0 shadow bg-white  justify-center  items-center  text-black lg:text-2xl  lg:h-[47px] md:text-xl md:h-[40px] sm:text-s  sm:h-[20px] mt-4 sm:mt-0 font-normal font-['Alef'] leading-[45px] cursor-pointer space-x-11">
                {!user && (
                    <>
                        <div onClick={() => nav('/register')}>הרשמה</div>
                        <div onClick={() => nav('/')}>התחברות</div>
                    </>
                )}
                {user && (
                    <>
                        <div onClick={() => nav('/logOut')}>התנתקות</div>
                    </>
                )}
                <div onClick={() => nav('/contact')}>
                    צור קשר
                </div>
                <div onClick={() => nav('/soldiers')} className='font-bold'>
                    חיפוש
                </div>
                <div onClick={() => nav('/homePage')}>
                    אודות
                </div>
            </nav>
            <div className='flex items-center mb-1'>
                <img className="mt-3 ml-5 max-w-[1%] lg:max-w-[1%] lg:mr-15  md:max-w-[1%] sm:max-w-[1%]" src="/חץ חזור.svg" alt="Logo" onClick={() => nav(-1)} />
            </div>
            <div className='flex justify-center cursor-pointer' onClick={() => nav(`/soldierInfo/${id}/addMemory`)}>
                + הוסף זכרון
            </div>
            <div className="mt-3">
                <ul style={{ direction: 'rtl' }} className="flex flex-wrap justify-center  bg-gray-200">
                    {remembers.map((remember, index) => (
                        <li key={index} className="bg-yellow-100 shadow-l lg:w-1/5 md:w-1/4 sm:w-1/3 w-1/2 p-4 m-2 rounded-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col justify-between">
                            <strong className="text-black"> {remember.Remember} </strong><br />
                            <p className='text-gray-400 text-sm'>נכתב בתאריך {new Date(remember.Date).toLocaleDateString()}</p>
                            <p className=' text-gray-400'>ע"י {remember.IdUserNavigation.Name}</p>
                            <div className="flex mt-0 pt-2 justify-end">
                                <button onClick={() => handleEdit(remember.Id)} className="text-black hover:text-red-700">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21H3v-3.5L14.732 3.732z"></path></svg>
                                </button>
                                <button onClick={() => handleDelete(remember.Id)} className="text-black hover:text-red-700">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                                </button>
                            </div>
                        </li>

                    ))}

                </ul>

            </div>

        </div>

    )
}

export default Remembers;