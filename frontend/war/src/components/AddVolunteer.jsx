import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { addVolunteeringOption, getVolunteeringOptionByIdAsyncOptionId, updateVolunteeringOption } from '../utils/VolunteeringOptionUtil';
import { useSelector } from 'react-redux';
import Sidebar from './Sidebar';

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
                    const volunteeringOptionData = await getVolunteeringOptionByIdAsyncOptionId(id, optionId);
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
        if (!user) {
            alert("על מנת להוסיף התנדבות יש להרשם ולהתחבר לאתר");
            nav('/register');
            return;
        }
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
        <div className="bg-gray-200 h-screen">
            <Sidebar />
            <div className="flex justify-center h-screen">
                <div className='text-black mt-4 mr-2 ml-2 text-center'>
                    <form onSubmit={handleSubmit} className='space-y-4 p-6 rounded-2xl bg-gray-400 shadow-xl shadow-gray-800 w-full max-w-4xl'>
                        <label className='flex flex-col'>
                            <textarea
                                name="Description"
                                value={volunteeringOption.volunteeringOption.Description}
                                placeholder="הוסיפי קבלה שאת/ה מעוניינים לקבל לעילוי נשמתו/ה"
                                onChange={handleChange}
                                style={{ direction: 'rtl', wordWrap: 'break-word', whiteSpace: 'pre-wrap' }}
                                className='text-gray-700 h-60 border border-gray-600 space-y-4 p-8 rounded-2xl mb-1'
                            />
                        </label>
                        <div className='flex justify-center'>
                            <button type="submit"
                                disabled={isLoading}
                                className={`btn bg-gray-900 text-white py-2 px-4 rounded-md ${isLoading ? 'opacity-50 cursor-not-allowed' : ' hover:animate-button-push'
                                    }`}
                            >
                                {isLoading ? 'Adding...' : (isEditing ? 'עריכת התנדבות' : 'הוספת התנדבות')}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddVolunteer;
