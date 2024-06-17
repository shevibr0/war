import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router';
import Sidebar from './Sidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faLinkedin, faInstagram } from '@fortawesome/free-brands-svg-icons';


const HomePage = () => {
    const nav = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const user = useSelector(state => state.user.connectedUser);

    return (
        <div className="bg-gray-200 h-screen font-sans">
            <Sidebar />
            <div className='bg-gray-200'>
                <div className='flex justify-center'>
                    <h2 className='text-gray-700 text-3xl font-bold'>מנציחים את זכרם</h2><br />
                </div>

                <div className="flex items-center justify-center  flex-wrap">
                    <div className="max-w-lg w-full mx-4  mt-4 p-5 text-center text-gray-600 text-xl font-light tracking-wider bg-white shadow-lg shadow-gray-800 rounded-2xl">
                        המיזם הוקם מתוך רצון עמוק להכיר מקרוב את גיבורינו שנפלו, להנציח את זיכרונם ולהשאיר אותו פתוח ונגיש לכולם<br /><br />
                        אנו מזמינים אתכם לקחת חלק במסע מרגש זה, להקדיש מעשה טוב או פרק תהלים לעילוי נשמתם<br /><br />
                        לחלוק איתנו סיפורים, תמונות, מתכונים שאהבו וזכרונות מתוקים<br />
                    </div>
                </div>
            </div>
            <div className="flex justify-center mt-8">
                <button onClick={() => nav('/soldiers')} className="btn bg-gray-800 text-white py-2 px-4 rounded-md hover:animate-button-push">
                    חיפוש</button>
            </div>

            <div className="w-full bottom-0 mt-7 left-0  flex justify-center bg-gray-200 text-gray-800">
                <div className="flex items-center gap-4">
                    <div className="relative transition duration-100 hover:text-yellow-400  text-2xl">
                        <a href="https://www.linkedin.com/in/elisheva-einhoren-43b1b3220/" target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faLinkedin} />
                        </a>
                    </div>

                    <div className="relative transition duration-100 hover:text-yellow-400  text-2xl">
                        <a href="mailto:mepe.leos@gmail.com">
                            <FontAwesomeIcon icon={faEnvelope} />
                        </a>
                    </div>
                    <div className="relative">
                        <a className='transition duration-100 hover:text-yellow-400 text-2xl' href="https://www.instagram.com/elisheva_einhoren/" target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faInstagram} />
                        </a>
                    </div>
                </div>
            </div>
        </div>


    )
}

export default HomePage