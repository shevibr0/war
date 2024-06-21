import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { addVolunteeringOption, getVolunteeringOptionByIdAsyncOptionId, updateVolunteeringOption } from '../utils/VolunteeringOptionUtil';
import { useSelector } from 'react-redux';
import emailjs from 'emailjs-com';
import Sidebar from './Sidebar';

const AddVolunteer = () => {
    const nav = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
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
            alert("על מנת להוסיף התנדבות יש להרשם/להתחבר לאתר");
            nav('/register');
            return;
        }
        setIsLoading(true);

        try {
            const volunteeringOptionPayload = volunteeringOption.volunteeringOption;
            if (optionId) {
                await updateVolunteeringOption(optionId, volunteeringOptionPayload);
                console.log('Volunteering option updated successfully');
                sendEmailNotification(volunteeringOptionPayload);
                setSuccessMessage('ההתנדבות עודכנה בהצלחה!');
                setTimeout(() => {
                    setSuccessMessage('');
                    nav(`/soldierInfo/${id}/volunteering`);
                }, 3000);
            } else {
                await addVolunteeringOption(volunteeringOptionPayload);
                console.log('Volunteering option added successfully');
                sendEmailNotification(volunteeringOptionPayload);
                setSuccessMessage('ההתנדבות נוספה בהצלחה');
                setTimeout(() => {
                    setSuccessMessage('');
                    nav(`/soldierInfo/${id}/volunteering`);
                }, 3000);
            }
        } catch (error) {
            console.error('Error adding/updating volunteering:', error);
            setError('Error adding/updating volunteering. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const sendEmailNotification = (volunteeringData) => {
        const templateParams = {
            name: user.Name,
            email: user.Email,
            subject: 'New Volunteering Option Added',
            message: `A new volunteering option has been added. Description: ${volunteeringData.Description}. View it at: https://matrysofwar.onrender.com/soldierInfo/${id}/volunteering`
        };

        console.log('Sending email with params:', templateParams);

        emailjs.send('service_9rnvzfp', 'template_j3x5far', templateParams, "6no79izXNNDe1YECd")
            .then((response) => {
                console.log('SUCCESS!', response.status, response.text);
            }, (error) => {
                console.error('FAILED...', error);
            });
    };

    return (
        <div className="bg-gray-200 h-screen">
            <Sidebar />
            <div className="flex justify-center h-screen">
                <div className='text-gray-800 mt-4 mr-2 ml-2 text-center bg-gray-200'>
                    <form onSubmit={handleSubmit} className='space-y-4 p-6 rounded-2xl bg-gray-400 shadow-xl shadow-gray-800 w-full max-w-4xl'>
                        <label className='flex flex-col'>
                            <textarea
                                name="Description"
                                value={volunteeringOption.volunteeringOption.Description}
                                placeholder="הוסיפי קבלה שאת/ה מעוניין/ת לקבל לעילוי נשמתו/ה"
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
                        {isLoading && <div className="flex justify-center mt-4">
                            <div className="w-12 h-12 border-4 border-t-4 border-gray-200 border-t-gray-600 rounded-full animate-spin"></div>
                        </div>}
                        {error && <span className="text-red-500">{error}</span>}
                        {successMessage && <span className="text-red-500 font-bold">{successMessage}</span>}                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddVolunteer;
