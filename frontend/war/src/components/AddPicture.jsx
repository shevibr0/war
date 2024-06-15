import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useSelector } from 'react-redux';
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { storage } from "./firebase";
import { v4 as uuidv4 } from "uuid";
import { addPicture } from '../utils/PictureUtil';
import emailjs from 'emailjs-com';
import { FaHome, FaUserAlt, FaGraduationCap, FaLayerGroup, FaStickyNote, FaComments, FaBars } from 'react-icons/fa';

const AddPicture = () => {
    const nav = useNavigate();
    const { id } = useParams();
    const user = useSelector(state => state.user.connectedUser);
    const [isOpen, setIsOpen] = useState(false);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

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
    const [image, setImage] = useState(null);
    const [progresspercent, setProgresspercent] = useState(0);

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
            setAlertMessage('עליך להיות מחובר כדי להוסיף תמונה.');
            nav('/register');
            return;
        }

        if (!image) {
            alert('Please select an image');
            return;
        }

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
            console.log("user", user)
            console.log("user", pictureDetails)
            const response = await addPicture({
                IdSoldier: pictureDetails.Picture.idSoldier,
                IdUser: pictureDetails.Picture.idUser,
                Url: downloadURL,
                Date: pictureDetails.Picture.Date,
                PersonalWords: pictureDetails.Picture.PersonalWords
            });

            console.log('Picture added successfully:', response);
            sendEmailNotification(downloadURL);
            nav(`/soldierInfo/${id}/pictures`);
        } catch (error) {
            console.error('Error saving picture to database:', error);
            setError('Error saving picture. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const sendEmailNotification = (downloadURL) => {
        const templateParams = {
            user_name: user.Name,
            user_email: user.Email,
            user_message: `A new picture has been added. URL: ${downloadURL}`,
        };

        emailjs.send('service_9rnvzfp', 'template_j3x5far', templateParams, "6no79izXNNDe1YECd")
            .then((response) => {
                console.log('SUCCESS!', response.status, response.text);
            }, (error) => {
                console.error('FAILED...', error);
            });
    };

    return (
        <div className="bg-gray-200 h-screen">
            <button className="lg:hidden md:hidden sm:hidden" onClick={() => { setIsOpen(!isOpen) }} >
                <FaBars className="text-white" />
            </button>
            {isOpen && (
                <nav className="lg:hidden md:hidden sm:hidden left-0 top-0 flex shadow bg-gray-200 justify-around items-center text-black lg:text-3xl lg:h-[80px] md:text-2m md:h-[30px] sm:text-sm text-xs mt-4 sm:mt-0 font-normal font-['Alef'] leading-[45px] cursor-pointer">
                    {!user && (
                        <>

                            <div onClick={() => nav('/register')} className="text-2xl text-gray-800 font-bold transition duration-1000 hover:text-yellow-400"> <FaUserAlt /></div>
                            <div onClick={() => nav('/')}> <FaUserAlt /></div>
                        </>
                    )}
                    {user && (
                        <>
                            <div onClick={() => nav('/logOut')}> <FaUserAlt /></div>
                        </>
                    )}
                    <div onClick={() => nav('/contact')}> <FaUserAlt /></div>
                    <div onClick={() => nav('/soldiers')} className='font-bold'> <FaUserAlt /></div>
                    <div onClick={() => nav('/homePage')}> <FaUserAlt /></div>
                </nav>
            )}
            <nav className="hidden lg:flex md:flex sm:flex left-0 top-0 shadow bg-white justify-center items-center text-black lg:text-2xl lg:h-[47px] md:text-xl md:h-[40px] sm:text-s sm:h-[20px] mt-4 sm:mt-0 font-normal font-['Alef'] leading-[45px] cursor-pointer space-x-11">
                {!user && (
                    <>
                        <div onClick={() => nav('/register')}> <FaUserAlt /></div>
                        <div onClick={() => nav('/')}> <FaUserAlt /></div>
                    </>
                )}
                {user && (
                    <>
                        <div onClick={() => nav('/logOut')}> <FaUserAlt /></div>
                    </>
                )}
                <div onClick={() => nav('/contact')}> <FaUserAlt /></div>
                <div onClick={() => nav('/soldiers')} className='font-bold'> <FaUserAlt /></div>
                <div onClick={() => nav('/homePage')}> <FaUserAlt /></div>
            </nav>
            <div className='flex items-center mb-1'>
                <img className="mt-3 ml-5 max-w-[1%] lg:max-w-[1%] lg:mr-15 md:max-w-[1%] sm:max-w-[1%]" src="/חץ חזור.svg" alt="Logo" onClick={() => nav(-1)} />
            </div>
            <h2 className="flex justify-center text-3xl font-bold">הוספת תמונה</h2>
            {alertMessage && <p style={{ color: 'red' }}>{alertMessage}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <div className="flex justify-center bg-gray-200">
                <form onSubmit={handleSubmit} className="bg-gray-400 space-y-4 p-8 border-2 border-black mt-4">
                    <div>
                        <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} required className='p-2 m-2 border border-black' />
                    </div>
                    <div className=''>
                        <h2 className="flex justify-center text-3xl font-bold">בנימה אישית</h2>
                    </div>
                    <div className='flex justify-center'>
                        <textarea name="PersonalWords" value={pictureDetails.Picture.PersonalWords} onChange={handleChange}
                            className="w-full p-2 border"
                            placeholder="כמה מילים אישיות על התמונה"
                            style={{ direction: 'rtl' }} />
                    </div>
                    <div className='flex justify-center'>
                        <button type="submit" disabled={isLoading} className="bg-gray-900 text-white py-2 px-4 rounded">הוסף תמונה</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddPicture;
