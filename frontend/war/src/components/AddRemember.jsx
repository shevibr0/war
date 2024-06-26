import React, { useEffect, useState, useCallback } from 'react';
import { addMemory, getMemoryByIdAsyncRecipyId, updateMemory } from '../utils/MemoryUtil';
import { useNavigate, useParams, useLocation } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import emailjs from 'emailjs-com';
import { getSoldiersById } from '../utils/SoldierUtil';
import { addPageToHistory } from '../features/userSlice';

const Sidebar = React.lazy(() => import('./Sidebar'));

const AddRemember = () => {
    const nav = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const { id, memoryId } = useParams();
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const user = useSelector(state => state.user.connectedUser);
    const [isEditing, setIsEditing] = useState(Boolean(memoryId));
    const [soldier, setSoldier] = useState(null);

    const initialMemoryDetails = {
        Memory: {
            id: 0,
            IdSoldier: id,
            IdUser: user?.Id || null,
            Remember: '',
            Date: new Date().toISOString()
        }
    };
    const [memory, setMemory] = useState(initialMemoryDetails);

    const fetchMemoryDetails = useCallback(async () => {
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
    }, [id, memoryId]);

    const fetchSoldierDetails = useCallback(async () => {
        try {
            const soldierData = await getSoldiersById(id);
            setSoldier(soldierData);
        } catch (error) {
            console.error('Error fetching soldier details:', error);
        }
    }, [id]);

    useEffect(() => {
        fetchMemoryDetails();
    }, [fetchMemoryDetails]);

    useEffect(() => {
        fetchSoldierDetails();
    }, [fetchSoldierDetails]);

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
            dispatch(addPageToHistory(location.pathname));
            nav('/register');
            return;
        }
        setIsLoading(true);
        try {
            const memoryPayload = memory.Memory;
            if (memoryId) {
                await updateMemory(memoryId, memoryPayload);
                sendEmailNotification(memoryPayload);
                setSuccessMessage('הזכרון עודכן בהצלחה!');
            } else {
                await addMemory(memoryPayload);
                sendEmailNotification(memoryPayload);
                setSuccessMessage('הזכרון נוסף בהצלחה');
            }
            setTimeout(() => {
                setSuccessMessage('');
                nav(`/soldierInfo/${id}/memories`);
            }, 3000);
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

        emailjs.send('service_9rnvzfp', 'template_j3x5far', templateParams, "PfoRzhpOYEmi5Zxch")
            .then((response) => {
                console.log('SUCCESS!', response.status, response.text);
            }, (error) => {
                console.error('FAILED...', error);
            });
    };

    return (
        <div className="bg-gray-200 h-screen relative">
            <React.Suspense fallback={<div>Loading Sidebar...</div>}>
                <Sidebar />
                <div className='flex items-center mb-1'>
                    <img className="mt-3 ml-5 w-[10px] mr-15 " src="/חץ חזור.svg" alt="Logo" onClick={() => nav(`/soldierInfo/${id}/memories`)} />
                </div>
            </React.Suspense>
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
