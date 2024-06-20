import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useSelector } from 'react-redux';
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { storage } from "./firebase";
import { v4 as uuidv4 } from "uuid";
import { addPicture } from '../utils/PictureUtil';
import emailjs from 'emailjs-com';
import Sidebar from './Sidebar';

const AddPicture = () => {
    const nav = useNavigate();
    const { id } = useParams();
    const user = useSelector(state => state.user.connectedUser);
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
            setAlertMessage('על מנת להוסיף תמונה יש להרשם/להתחבר לאתר"');
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

    return (
        <div className="bg-gray-200 h-screen">
            <Sidebar />
            <div className="text-center">
                <div className='w-full text-center'>
                    {alertMessage && <p style={{ color: 'red' }}>{alertMessage}</p>}
                    {error && <p style={{ color: 'red' }}>{error}</p>}
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
                        <div>
                            <h2 className="flex justify-center text-3xl font-bold">בנימה אישית</h2>
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
                            <button type="submit" disabled={isLoading} className="btn bg-gray-900 text-white py-2 px-4 rounded-md hover:animate-button-push">הוסף תמונה</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddPicture;
