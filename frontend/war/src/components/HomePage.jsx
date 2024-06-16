import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router';
import Sidebar from './Sidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faInstagram, faEmail } from '@fortawesome/free-brands-svg-icons';


const HomePage = () => {
    const nav = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const user = useSelector(state => state.user.connectedUser);

    return (
        <div className="bg-gray-200 h-screen font-sans">
            <Sidebar />
            <div className='bg-gray-200'>
                <div className='flex justify-center'>
                    <h2 className='text-gray-700 text-3xl font-bold'>מנציחים את זיכרם</h2><br />
                </div>

                <div className="flex items-center justify-center  flex-wrap ">
                    <div className="max-w-lg w-full mx-4  mt-4 p-1 text-center text-gray-600 text-xl font-light tracking-wider bg-white shadow-lg shadow-gray-800 rounded-2xl">
                        המיזם "מנציחים את זכרם" נוצר מתוך רצון להכיר את גיבורינו מקרוב ולהשאיר פיסות זיכרון פתוחות ונגישות לכולם<br />
                        אנו מזמינים אתכם להוסיף מידע על חללים שהכרתם, כמו מתכון אהוב, תמונה משותפת או זיכרון מתוק שתרצו לשתף<br />
                        בנוסף, ישנה אפשרות להתנדב לקריאת פרקי תהילים לעילוי נשמת החללים<br />
                    </div>
                </div>
            </div>
            <div className="flex justify-center mt-1">
                <button onClick={() => nav('/soldiers')} className="btn bg-gray-900 text-white py-2 px-4 rounded-md hover:animate-button-push">
                    חיפוש</button>
            </div>

            <div className="w-full bottom-0 mt-7 left-0  flex justify-center bg-gray-200">
                <div className="flex items-center gap-4">
                    <div className="relative">
                        <FontAwesomeIcon icon={faLinkedin} />                        <a href="https://www.linkedin.com/in/elisheva-einhoren-43b1b3220/" target="_blank" rel="noopener noreferrer">
                            <img className="w-[20.15px] h-[26.55px] absolute inset-0 transition-opacity duration-300 ease-in-out opacity-0 hover:opacity-100" src="/לינקדאין מעבר עכבר.svg" alt="LinkedIn Hover" />
                        </a>
                    </div>

                    <div className="relative">
                        <img className="w-[26.55px] h-[26.55px] transition-opacity duration-300 ease-in-out opacity-100 hover:opacity-0" src="/מייל.svg" alt="Email" />
                        <a href="mailto:mepe.leos@gmail.com">
                            <FontAwesomeIcon icon={faEmail} />
                        </a>
                    </div>
                    <div className="relative">
                        <img className="w-[18.96px] h-[26.55px] transition-opacity duration-300 ease-in-out opacity-100 hover:opacity-0" src="/אינסטגרם.svg" alt="Instagram" />
                        <a href="https://www.instagram.com/elisheva_einhoren/" target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faInstagram} />
                        </a>
                    </div>
                </div>
            </div>
        </div>


    )
}

export default HomePage