import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router';
import { deleteVolunteeringOption, getVolunteeringOptionById } from '../utils/VolunteeringOptionUtil';
import { useSelector } from 'react-redux';

const Voleenteerings = () => {
    const nav = useNavigate()
    const [isOpen, setIsOpen] = useState(false);
    const { id } = useParams();
    const user = useSelector(state => state.user.connectedUser);
    const [volunteeringOptions, setVolunteeringOptions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        const fetchVolunteeringOptions = async () => {
            try {
                setIsLoading(true);
                const options = await getVolunteeringOptionById(id);
                setVolunteeringOptions(options);
                console.log("volunteeringOptions", volunteeringOptions)
            } catch (error) {
                console.error('Error fetching volunteering options:', error);
            } finally {
                setIsLoading(false);
            }
        };

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
                console.error("Error deleting recipe:", error);
            }
        } else {
            // המשתמש בחר לא למחוק את המתכון
            console.log("מחיקת ההתנדבות בוטלה");
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
            <div className='flex justify-center cursor-pointer' onClick={() => nav(`/soldierInfo/${id}/addVolunteer`)}>
                + הוסף התנדבות
            </div>
            <div className=''>

                {isLoading ? (
                    <p>Loading...</p>
                ) : (
                    <div className="mt-3 bg-gray-200">
                        <ul style={{ direction: 'rtl' }} className="flex flex-wrap justify-center  bg-gray-200">
                            {volunteeringOptions.map(option => (
                                <li key={option.Id} className="bg-yellow-100 shadow-l lg:w-1/5 md:w-1/4 sm:w-1/3 w-1/2 p-4 m-2 rounded-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col justify-between">
                                    <strong className="text-black"> {option.Description} </strong><br />
                                    <p className='text-gray-400 text-sm'>נכתב בתאריך {new Date(option.Date).toLocaleDateString()}</p>
                                    <p className=' text-gray-400'>ע"י {option.IdUserNavigation.Name}</p>
                                    <div className="flex mt-0 pt-2 justify-end">
                                        <button onClick={() => handleEdit(option.Id)} className="text-black hover:text-red-700">
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21H3v-3.5L14.732 3.732z"></path></svg>
                                        </button>
                                        <button onClick={() => handleDelete(option.Id)} className="text-black hover:text-red-700">
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

            </div>
        </div >
    )
}

export default Voleenteerings
