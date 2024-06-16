import React, { useEffect, useState } from 'react';
import { addMemory, getMemoryByIdAsyncRecipyId, updateMemory } from '../utils/MemoryUtil';
import { useNavigate, useParams } from 'react-router';
import { useSelector } from 'react-redux';
import Sidebar from './Sidebar';

const AddRemember = () => {
    const nav = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [error, setError] = useState('');
    const { id, memoryId } = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const user = useSelector(state => state.user.connectedUser);
    const [isEditing, setIsEditing] = useState(Boolean(memoryId));

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
            alert("על מנת להוסיף זכרון יש להרשם ולהתחבר לאתר");
            nav('/register');
            return;
        }
        setIsLoading(true);
        try {
            const memoryPayload = memory.Memory;
            if (memoryId) {
                await updateMemory(memoryId, memoryPayload);
                console.log('Memory updated successfully');
                nav(`/soldierInfo/${id}/memories`);
            } else {
                await addMemory(memoryPayload);
                console.log('Memory added successfully');
                nav(`/soldierInfo/${id}/memories`);
            }
        } catch (error) {
            console.error('Error adding/updating memory:', error);
            setError('Error adding/updating memory. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-gray-200 h-screen">
            <Sidebar />
            <div className="flex justify-center h-screen">
                <div className='text-black mt-4 mr-2 ml-2 text-center'>
                    <form onSubmit={handleSubmit} className='space-y-4 p-8 rounded-2xl bg-gray-400 shadow-xl shadow-gray-800 max-w-lg w-full mx-4'>
                        <label className='flex flex-col'>
                            <textarea
                                name="Remember"
                                value={memory.Memory.Remember}
                                placeholder="הוסף זכרון אישי"
                                onChange={handleChange}
                                style={{ direction: 'rtl' }}
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
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddRemember;
