import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { addVolunteeringOption, getVolunteeringOptionByIdAsyncOptionId, updateVolunteeringOption } from '../utils/VolunteeringOptionUtil';
import { useSelector } from 'react-redux';

const AddVolunteer = () => {
    const nav = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [error, setError] = useState('');
    const { id, optionId } = useParams();
    const user = useSelector(state => state.user.connectedUser);
    const [isLoading, setIsLoading] = useState(false);
    const [isEditing, setIsEditing] = useState(Boolean(optionId));

    const initialVolunteeringOptionDetails = {
        volunteeringOption: {
            id: 0,
            IdSoldier: id,
            IdUser: user?.Id || null,
            Description: '',
            Date: new Date().toISOString()
        }
    };
    const [volunteeringOption, setVolunteeringOption] = useState(initialVolunteeringOptionDetails);

    useEffect(() => {
        const fetchVolunteeringOption = async () => {
            if (optionId) {
                try {
                    console.log("optionId", optionId);
                    const volunteeringOptionData = await getVolunteeringOptionByIdAsyncOptionId(id, optionId);
                    console.log("volunteeringOptionData", volunteeringOptionData);
                    if (volunteeringOptionData && volunteeringOptionData.length > 0) {
                        setVolunteeringOption({ volunteeringOption: volunteeringOptionData[0] });
                    } else {
                        console.log("No volunteering option found");
                    }
                } catch (error) {
                    console.error("Error fetching volunteering option data:", error);
                    setError('Error fetching volunteering option data. Please try again.');
                }
            }
        };
        fetchVolunteeringOption();
    }, [id, optionId]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setVolunteeringOption(prev => ({
            ...prev,
            volunteeringOption: {
                ...prev.volunteeringOption,
                [name]: value
            }
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const volunteeringOptionPayload = volunteeringOption.volunteeringOption;
            if (optionId) {
                await updateVolunteeringOption(optionId, volunteeringOptionPayload);
                console.log('Volunteering option updated successfully');
                nav(`/soldierInfo/${id}/volunteering`);
            } else {
                await addVolunteeringOption(volunteeringOptionPayload);
                console.log('Volunteering option added successfully');
                nav(`/soldierInfo/${id}/volunteering`);
            }
        } catch (error) {
            console.error('Error adding/updating volunteering:', error);
            setError('Error adding/updating volunteering. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-gray-200">
            <button className="lg:hidden md:hidden sm:hidden" onClick={() => { setIsOpen(!isOpen) }} >
                <svg className="w-6 h-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 11h16M4 16h16" />
                </svg>
            </button>
            {isOpen && (
                <nav className="lg:hidden md:hidden sm:hidden left-0 top-0 flex shadow bg-white justify-around items-center text-black lg:text-3xl lg:h-[80px] md:text-2m md:h-[30px] sm:text-sm text-xs mt-4 sm:mt-0 font-normal font-['Alef'] leading-[45px] cursor-pointer">
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
            )}
            <nav className="hidden lg:flex md:flex sm:flex left-0 top-0 shadow bg-white justify-center items-center text-black lg:text-2xl lg:h-[47px] md:text-xl md:h-[40px] sm:text-s sm:h-[20px] mt-4 sm:mt-0 font-normal font-['Alef'] leading-[45px] cursor-pointer space-x-11">
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
                <img className="mt-3 ml-5 max-w-[1%] lg:max-w-[1%] lg:mr-15 md:max-w-[1%] sm:max-w-[1%]" src="/חץ חזור.svg" alt="Logo" onClick={() => nav(-1)} />
            </div>
            <h2 className='flex justify-center text-3xl font-bold '>{isEditing ? 'עריכת התנדבות' : 'הוספת התנדבות'}</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <div className="flex justify-center h-screen">
                <div className='text-black mt-3 w-80 text-center'>
                    <form onSubmit={handleSubmit} className='flex flex-col py-6 px-4 border-2 border-black mt-0'>
                        <label className='flex flex-col'>
                            <textarea
                                name="Description"
                                value={volunteeringOption.volunteeringOption.Description}
                                placeholder="הוסיפי קבלה שאת/ה מעוניינים לקבל לעילוי נשמתו/ה"
                                onChange={handleChange}
                                style={{ direction: 'rtl' }}
                                className='text-gray-700 h-60 border border-gray-600 rounded mb-1' />
                        </label>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`bg-gray-700 text-white py-2 px-4 rounded ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-600 transition duration-300'
                                }`}
                        >
                            {isLoading ? 'Adding...' : (isEditing ? 'עריכת התנדבות' : 'הוספת התנדבות')}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddVolunteer;
