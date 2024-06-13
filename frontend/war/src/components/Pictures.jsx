import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router';
import { deletePicture, getPictureById } from '../utils/PictureUtil';
import { useSelector } from 'react-redux';
import { ref, deleteObject } from "firebase/storage";
import { storage } from "./firebase";

const Pictures = () => {
    const nav = useNavigate()
    const { id } = useParams();
    const [isOpen, setIsOpen] = useState(false);
    const [images, setImages] = useState([]);
    const user = useSelector(state => state.user.connectedUser);
    useEffect(() => {

        const fetchPictures = async () => {
            if (!id) {
                console.error('No soldier ID provided');
                return;
            }
            try {
                const pictures = await getPictureById(id);
                console.log("pic", pictures)
                setImages(pictures);
            } catch (error) {
                console.error('Error fetching pictures:', error);
            }
        };

        fetchPictures();
    }, [id]); // תלוי ב-id של החייל



    const handleDelete = async (id, imageUrl) => {
        if (window.confirm("האם אתה בטוח שברצונך למחוק את המתכון?")) {
            try {
                console.log("iddd", id);

                // Create a reference to the file to delete
                const imageRef = ref(storage, imageUrl);

                // Delete the file from Firebase Storage
                await deleteObject(imageRef);

                // Now delete the record from the database
                const data = await deletePicture(id);
                console.log("data", data);

                setImages(currentImages => currentImages.filter(image => image.Id !== id));
            } catch (error) {
                console.error("Error deleting picture:", error);
            }
        } else {
            // המשתמש בחר לא למחוק את המתכון
            console.log("מחיקת התמונה בוטלה");
        }
    };

    return (
        <div className="bg-gray-200 h-screen">
            <button className="lg:hidden md:hidden sm:hidden" onClick={() => { setIsOpen(!isOpen) }} >
                <svg className="w-6 h-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 11h16M4 16h16" />
                </svg>
            </button>
            {isOpen && (
                <nav className="lg:hidden md:hidden sm:hidden left-0 top-0 flex shadow bg-white  justify-around items-center text-black lg:text-3xl lg:h-[80px] md:text-2m md:h-[30px] sm:text-sm  text-xs mt-4 sm:mt-0 font-normal font-['Alef'] leading-[45px] cursor-pointer">
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
                    <div onClick={() => nav('/homePage')} >
                        אודות
                    </div>
                </nav>
            )}
            <nav className="hidden lg:flex md:flex sm:flex left-0 top-0 shadow bg-white  justify-center  items-center  text-black lg:text-2xl  lg:h-[47px] md:text-xl md:h-[40px] sm:text-s  sm:h-[20px] mt-4 sm:mt-0 font-normal font-['Alef'] leading-[45px] cursor-pointer space-x-11">
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
                <img className="mt-3 ml-5 max-w-[1%] lg:max-w-[1%] lg:mr-15  md:max-w-[1%] sm:max-w-[1%]" src="/חץ חזור.svg" alt="Logo" onClick={() => nav(-1)} />
            </div>
            <div className='flex justify-center cursor-pointer' onClick={() => nav(`/soldierInfo/${id}/addPicture`)}>
                + הוסף תמונה
            </div>
            <div className="flex flex-wrap justify-center bg-gray-200">
                {images.map((image, index) => (
                    <div key={index} className="bg-yellow-100 shadow-lg h-50  lg:w-1/5 md:w-1/4 sm:w-1/3 w-1/2 m-1 p-4 my-4  text-gray-400 rounded-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col justify-between cursor-pointer">
                        <img
                            className="w-full object-cover rounded-t-lg" // Ensures the image covers the full width and rounded top corners
                            loading="lazy"
                            src={image.Url}
                            alt={`Image ${index}`}
                        />
                        <h3 className='font-bold text-black'>בנימה אישית</h3>
                        {image.PersonalWords && <p className='text-sm italic text-gray-500 mb-2'>{image.PersonalWords}</p>}
                        <div className="flex justify mt-0"> {/* Container for buttons */}
                            {/* <button onClick={() => handleEdit(image.Id)} className="text-black hover:text-red-700">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21H3v-3.5L14.732 3.732z"></path></svg>
                            </button> */}
                            <button onClick={() => handleDelete(image.Id, image.Url)} className="text-black hover:text-red-700">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                            </button>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    )
}

export default Pictures