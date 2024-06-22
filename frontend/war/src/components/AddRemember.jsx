import React, { useEffect, useState } from 'react';
import { addMemory, getMemoryByIdAsyncRecipyId, updateMemory } from '../utils/MemoryUtil';
import { useNavigate, useParams } from 'react-router';
import { useSelector } from 'react-redux';
import emailjs from 'emailjs-com';
import Sidebar from './Sidebar';
import { getSoldiersById } from '../utils/SoldierUtil';

const AddRemember = () => {
    const nav = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [error, setError] = useState('');
    const { id, memoryId } = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const user = useSelector(state => state.user.connectedUser);
    const [isEditing, setIsEditing] = useState(Boolean(memoryId));
    const [soldier, setSoldier] = useState(null);

    console.log('Connected user:', user); // Debugging line to check the user object

    const initialMemoryDetails = {
        Memory: {
            id: 0,
            IdSoldier: id,
            IdUser: user?.Id || null, // Ensure user ID is set correctly
            Remember: '',
            Date: new Date().toISOString()
        }
    };
    const [memory, setMemory] = useState(initialMemoryDetails);

    useEffect(() => {
        const fetchMemory = async () => {
            if (memoryId) {
                try {
                    const memoryData = await getMemoryByIdAsyncRecipyId(id, memoryId);
                    if (memoryData && memoryData.length > 0) {
                        setMemory({ Memory: memoryData[0] });
                    } else {
                        console.log("No memory found");
                    }
                } catch (error) {
                    console.error("Error fetching memory:", error);
                    setError('Error fetching memory. Please try again.');
                }
            }
        };
        fetchMemory();
    }, [id, memoryId]);

    useEffect(() => {
        const fetchSoldierDetails = async () => {
            try {
                const soldierData = await getSoldiersById(id);
                setSoldier(soldierData);
            } catch (error) {
                console.error('Error fetching soldier details:', error);
            }
        };
        fetchSoldierDetails();
    }, [id]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setMemory(prev => ({
            ...prev,
            Memory: {
                ...prev.Memory,
                [name]: value
            }
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!user) {
            alert("על מנת להוסיף זכרון יש להרשם/להתחבר לאתר");
            nav('/register');
            return;
        }
        setIsLoading(true);
        try {
            const memoryPayload = memory.Memory;
            if (memoryId) {
                await updateMemory(memoryId, memoryPayload);
                console.log('Memory updated successfully');
                sendEmailNotification(memoryPayload);
                setSuccessMessage('הזכרון עודכן בהצלחה!');
                setTimeout(() => {
                    setSuccessMessage('');
                    nav(`/soldierInfo/${id}/memories`);
                }, 3000);
            } else {
                await addMemory(memoryPayload);
                console.log('Memory added successfully');
                sendEmailNotification(memoryPayload);
                setSuccessMessage('הזכרון נוסף בהצלחה');
                setTimeout(() => {
                    setSuccessMessage('');
                    nav(`/soldierInfo/${id}/memories`);
                }, 3000);
            }
        } catch (error) {
            console.error('Error adding/updating memory:', error);
            setError('Error adding/updating memory. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const sendEmailNotification = (memoryPayload) => {
        const templateParams = {
            name: user.Name,
            email: user.Email,
            subject: 'New Memory Added',
            message: `A new memory has been added. Memory: ${memoryPayload.Remember}. View it at: https://matrysofwar.onrender.com/soldierInfo/${id}/memories`
        };

        emailjs.send('service_9rnvzfp', 'template_j3x5far', templateParams, "6no79izXNNDe1YECd")
            .then((response) => {
                console.log('SUCCESS!', response.status, response.text);
            }, (error) => {
                console.error('FAILED...', error);
            });
    };

    return (
        <div className="bg-gray-200 h-screen relative">
            <Sidebar />
            {soldier && (
                <div className="fixed top-20 right-4">
                    {soldier.Image ? (
                        <img className='h-12 w-12 object-cover rounded-full border-2 border-black' src={soldier.Image} alt={`${soldier.FirstName} ${soldier.LastName}`} />
                    ) : (
                        <div className='h-12 w-12 rounded-full border-2 border-black'></div>
                    )}
                </div>
            )}
            <div className="flex justify-center">
                <div className='text-gray-800 mt-4 mr-2 ml-2 text-center bg-gray-200'>
                    <form onSubmit={handleSubmit} className='space-y-4 p-6 rounded-2xl bg-gray-400 shadow-xl shadow-gray-800 w-full max-w-4xl'>
                        <label className='flex flex-col'>
                            <textarea
                                name="Remember"
                                value={memory.Memory.Remember}
                                placeholder="הוסף זכרון אישי"
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
                                {isLoading ? 'Adding...' : (isEditing ? 'עריכת זכרון' : 'הוספת זכרון')}
                            </button>
                        </div>
                        {isLoading && <div className="flex justify-center mt-4">
                            <div className="w-12 h-12 border-4 border-t-4 border-gray-200 border-t-gray-600 rounded-full animate-spin"></div>
                        </div>}
                        {error && <span className="text-red-500">{error}</span>}
                        {successMessage && <span className="text-red-500 font-bold">{successMessage}</span>}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddRemember;
