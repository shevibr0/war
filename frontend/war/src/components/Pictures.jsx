import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router';
import { ref, getDownloadURL, uploadBytesResumable, deleteObject } from "firebase/storage";
import { storage } from "./firebase";
import { v4 as uuidv4 } from "uuid";
import { addPicture, getPictureById, deletePicture } from '../utils/PictureUtil';
import { getSoldiersById } from '../utils/SoldierUtil';
import Sidebar from './Sidebar';
import { useDispatch, useSelector } from 'react-redux';
import { addPageToHistory } from '../features/userSlice';
import emailjs from 'emailjs-com';

const Pictures = () => {
    const nav = useNavigate();
    const { id } = useParams();
    const location = useLocation();
    const dispatch = useDispatch();
    const user = useSelector(state => state.user.connectedUser);
    const pageHistory = useSelector(state => state.user.pageHistory);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [images, setImages] = useState([]);
    const [soldier, setSoldier] = useState(null);
    const [image, setImage] = useState(null);
    const [progresspercent, setProgresspercent] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const initialPictureDetails = {
        Picture: {
            idSoldier: id,
            idUser: user?.Id,
            Url: '',
            Date: new Date().toISOString(),
            PersonalWords: ''
        }
    };
    const [pictureDetails, setPictureDetails] = useState(initialPictureDetails);

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

        const fetchSoldierDetails = async () => {
            try {
                const soldierData = await getSoldiersById(id);
                setSoldier(soldierData);
            } catch (error) {
                console.error('Error fetching soldier details:', error);
            }
        };

        fetchPictures();
        fetchSoldierDetails();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPictureDetails(prevPictureDetails => ({
            ...prevPictureDetails,
            Picture: {
                ...prevPictureDetails.Picture,
                [name]: value
            }
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!user) {
            setAlertMessage('על מנת להוסיף תמונה יש להרשם/להתחבר לאתר');
            dispatch(addPageToHistory(location.pathname));
            nav('/register');
            return;
        }

        if (!image) {
            alert('Please select an image');
            return;
        }

        setIsLoading(true);
        const imageName = `images/${image.name + uuidv4()}`;
        const storageRef = ref(storage, imageName);
        const uploadTask = uploadBytesResumable(storageRef, image);

        uploadTask.on("state_changed",
            (snapshot) => {
                const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                setProgresspercent(progress);
            },
            (error) => {
                console.error('Upload error:', error);
                setError('Error uploading image. Please try again.');
                setIsLoading(false);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log('File available at', downloadURL);
                    handleSaveToDatabase(downloadURL);
                });
            }
        );
    };

    const handleSaveToDatabase = async (downloadURL) => {
        try {
            const response = await addPicture({
                IdSoldier: pictureDetails.Picture.idSoldier,
                IdUser: pictureDetails.Picture.idUser,
                Url: downloadURL,
                Date: pictureDetails.Picture.Date,
                PersonalWords: pictureDetails.Picture.PersonalWords
            });

            console.log('Picture added successfully:', response);
            sendEmailNotification(downloadURL);
            setSuccessMessage('התמונה נוספה בהצלחה');
            setTimeout(() => {
                setSuccessMessage('');
                nav(`/soldierInfo/${id}/pictures`);
            }, 3000);
        } catch (error) {
            console.error('Error saving picture to database:', error);
            setError('Error saving picture. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const sendEmailNotification = (downloadURL) => {
        const templateParams = {
            name: user.Name,
            email: user.Email,
            subject: 'New Picture Added',
            message: `A new picture has been added by ${user.Name}. URL: ${downloadURL}, Personal Words: ${pictureDetails.Picture.PersonalWords}. View at: https://matrysofwar.onrender.com/soldierInfo/${id}/pictures`
        };

        emailjs.send('service_9rnvzfp', 'template_j3x5far', templateParams, "6no79izXNNDe1YECd")
            .then((response) => {
                console.log('SUCCESS!', response.status, response.text);
            }, (error) => {
                console.error('FAILED...', error);
            });
    };

    const handleDelete = async (imageId, imageUrl) => {
        if (window.confirm("האם אתה בטוח שברצונך למחוק את התמונה?")) {
            try {
                console.log("Deleting image with id:", imageId);

                const imageRef = ref(storage, imageUrl);
                await deleteObject(imageRef);

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
            <div className='mt-4 flex justify-center'>
                <button
                    className='btn bg-white font-bold cursor-pointer p-2 rounded-lg shadow-top shadow-gray-500 hover:animate-button-push'
                    onClick={() => {
                        if (!user) {
                            dispatch(addPageToHistory(location.pathname));
                            nav('/register');
                        } else {
                            document.getElementById("addPictureForm").scrollIntoView({ behavior: "smooth" });
                        }
                    }}
                >
                    + הוסף תמונה
                </button>
            </div>
            <div className="flex flex-wrap justify-center bg-gray-200">
                {images.map((image, index) => (
                    <div key={index} className="bg-yellow-100 shadow-lg h-50 lg:w-1/5 md:w-1/4 sm:w-1/3 w-1/2 m-1 p-4 my-4 text-gray-400 rounded-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col justify-between cursor-pointer">
                        <img
                            className="w-full object-cover rounded-t-lg"
                            loading="lazy"
                            src={image.Url}
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

            <div id="addPictureForm" className="text-center">
                <div className='w-full text-center'>
                    {alertMessage && <p style={{ color: 'red' }}>{alertMessage}</p>}
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    {successMessage && <span className="text-red-500 font-bold">{successMessage}</span>}
                </div>
                <div className="flex justify-center bg-gray-200 mt-4 mr-2 ml-2">
                    <form onSubmit={handleSubmit} className="bg-gray-400 space-y-4 p-8 rounded-2xl shadow-xl shadow-gray-700 text-center w-full max-w-lg mx-4">
                        <div className='text-center'>
                            <input
                                className="rounded-2xl text-center p-3 m-3 border border-black w-full"
                                type="file"
                                accept="image/*"
                                onChange={(e) => setImage(e.target.files[0])}
                                required
                            />
                        </div>

                        <div className="flex justify-center">
                            <textarea
                                name="PersonalWords"
                                value={pictureDetails.Picture.PersonalWords}
                                onChange={handleChange}
                                className="w-full p-2 border rounded-2xl"
                                placeholder="כמה מילים אישיות על התמונה"
                                style={{ direction: 'rtl', wordWrap: 'break-word', whiteSpace: 'pre-wrap' }}
                            />
                        </div>
                        <div className="flex justify-center">
                            <button type="submit" disabled={isLoading} className="btn bg-gray-900 text-white py-2 px-4 rounded-md hover:animate-button-push">
                                {isLoading ? 'טוען...' : 'הוסף תמונה'}
                            </button>
                        </div>
                        {isLoading && <div className="flex justify-center mt-4">
                            <div className="w-12 h-12 border-4 border-t-4 border-gray-200 border-t-gray-600 rounded-full animate-spin"></div>
                        </div>}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Pictures;
