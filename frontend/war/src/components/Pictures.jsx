import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router';
import { deletePicture, getPictureById } from '../utils/PictureUtil';
import { useSelector, useDispatch } from 'react-redux';
import { ref, deleteObject } from "firebase/storage";
import { storage } from "./firebase";
import Sidebar from './Sidebar';
import { getSoldiersById } from '../utils/SoldierUtil';
import { addPageToHistory } from '../features/userSlice';

const Pictures = () => {
    const nav = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const { id } = useParams();
    const [isOpen, setIsOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [images, setImages] = useState([]);
    const [soldier, setSoldier] = useState(null);
    const user = useSelector(state => state.user.connectedUser);

    const fetchSoldierDetails = async () => {
        try {
            const soldierData = await getSoldiersById(id);
            setSoldier(soldierData);
        } catch (error) {
            console.error('Error fetching soldier details:', error);
        }
    };

    useEffect(() => {
        const fetchPictures = async () => {
            if (!id) {
                console.error('No soldier ID provided');
                return;
            }
            try {
                const pictures = await getPictureById(id);
                console.log("Fetched pictures:", pictures);
                setImages(pictures);
            } catch (error) {
                console.error('Error fetching pictures:', error);
            }
        };

        fetchPictures();
        fetchSoldierDetails();
    }, [id]);

    const handleDelete = async (imageId, imageUrl) => {
        if (window.confirm("האם אתה בטוח שברצונך למחוק את התמונה?")) {
            try {
                console.log("Deleting image with id:", imageId);

                // Create a reference to the file to delete
                const imageRef = ref(storage, imageUrl);

                // Delete the file from Firebase Storage
                await deleteObject(imageRef);

                // Now delete the record from the database
                const data = await deletePicture(imageId);
                console.log("Picture deleted from database:", data);

                setImages(currentImages => currentImages.filter(image => image.Id !== imageId));
            } catch (error) {
                console.error("Error deleting picture:", error);
            }
        } else {
            console.log("מחיקת התמונה בוטלה");
        }
    };

    const openModal = (image) => {
        setSelectedImage(image);
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
        setSelectedImage(null);
    };

    const handleAddPicture = () => {
        if (!user) {
            dispatch(addPageToHistory(location.pathname));
            nav('/register');
        } else {
            nav(`/soldierInfo/${id}/addPicture`);
        }
    };

    return (
        <div className="bg-gray-200 h-screen relative">
            <Sidebar />
            <div className='flex items-center mb-1'>
                <img className="mt-3 ml-5 w-[10px] mr-15 " src="/חץ חזור.svg" alt="Logo" onClick={() => nav(`/soldierInfo/${soldier.Id}`)} />
            </div>
            {soldier && (
                <div className="fixed top-20 right-4">
                    {soldier.Image ? (
                        <img className='h-12 w-12 object-cover rounded-full border-2 border-black' src={soldier.Image} alt={`${soldier.FirstName} ${soldier.LastName}`} />
                    ) : (
                        <div className='h-12 w-12 rounded-full border-2 border-black'></div>
                    )}
                </div>
            )}
            <div className='mt-4 flex justify-center'>
                <button className='btn bg-white font-bold cursor-pointer p-2 rounded-lg shadow-top shadow-gray-500 hover:animate-button-push' onClick={handleAddPicture}>
                    + הוסף תמונה
                </button>
            </div>
            <div className="flex flex-wrap justify-center bg-gray-200">
                {images.map((image, index) => (
                    <div key={index} className="bg-yellow-100 shadow-lg h-50 lg:w-1/5 md:w-1/4 sm:w-1/3 w-1/2 m-1 p-4 my-4 text-gray-400 rounded-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col justify-between cursor-pointer">
                        <img
                            className="w-full object-cover rounded-t-lg"
                            loading="lazy"
                            src={image.ThumbnailUrl || image.Url} // השתמש ב-thumbnail אם קיים
                            alt={`Image ${index}`}
                            onClick={() => openModal(image)}
                        />
                        <h3 className='font-bold text-gray-800'>בנימה אישית</h3>
                        {image.PersonalWords && <p className='text-sm italic text-gray-500 mb-2 break-words whitespace-pre-wrap'>{image.PersonalWords}</p>}
                        {user && user.Id === image.IdUser && (
                            <div className="flex justify-start mt-2">
                                <button onClick={() => handleDelete(image.Id, image.Url)} className="text-gray-800 hover:text-red-700">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                                    </svg>
                                </button>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {isOpen && selectedImage && (
                <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center">
                    <div className="bg-white p-4 rounded-lg shadow-lg">
                        <button className="text-red-500 hover:text-red-700 font-bold" onClick={closeModal}>סגור</button>
                        <img src={selectedImage.Url} alt="Enlarged Image" className="mt-4 max-h-96 object-contain" />
                        <h3 className='font-bold text-gray-800'>בנימה אישית</h3>
                        {selectedImage.PersonalWords && <p className='text-sm italic text-gray-500 mb-2 break-words whitespace-pre-wrap'>{selectedImage.PersonalWords}</p>}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Pictures;
