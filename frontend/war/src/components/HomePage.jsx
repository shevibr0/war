import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router';
import Sidebar from './Sidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faGithub, faFacebook } from '@fortawesome/free-brands-svg-icons';


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
                    <div className="max-w-lg w-full mx-4  mt-4 p-1 text-center text-gray-600 text-2xl font-light tracking-wider bg-white shadow-lg shadow-gray-800 rounded-2xl">
                        המיזם "מנציחים את זכרם" נוצר מתוך רצון להכיר את גיבורינו מקרוב ולהשאיר פיסות זיכרון פתוחות ונגישות לכולם<br />
                        אנו מזמינים אתכם להוסיף מידע על חללים שהכרתם, כמו מתכון אהוב, תמונה משותפת או זיכרון מתוק שתרצו לשתף<br />
                        בנוסף, ישנה אפשרות להתנדב לקריאת פרקי תהילים לעילוי נשמת החללים<br />
                    </div>


                </div>
            </div>
            <div className="flex justify-center">
                <button onClick={() => nav('/soldiers')} className="btn bg-gray-900 text-white py-2 px-4 rounded-md hover:animate-button-push">
                    חיפוש</button>
            </div>

            <div className="w-full bottom-0 mt-7 left-0  flex justify-center bg-gray-200">
                <div className="flex items-center gap-4">
                    <div className="relative">
                        <img className="w-[20.15px] h-[26.55px] transition-opacity duration-300 ease-in-out opacity-100 hover:opacity-0" src="/לינקדאין.svg" alt="LinkedIn" />
                        <a href="https://www.linkedin.com/in/elisheva-einhoren-43b1b3220/" target="_blank" rel="noopener noreferrer">
                            <img className="w-[20.15px] h-[26.55px] absolute inset-0 transition-opacity duration-300 ease-in-out opacity-0 hover:opacity-100" src="/לינקדאין מעבר עכבר.svg" alt="LinkedIn Hover" />
                        </a>
                        <a href="https://www.linkedin.com/in/elisheva-einhoren-43b1b3220/" className="home__social-link text-gray-800 text-xl transition duration-300 hover:text-yellow-400" target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faLinkedin} />
                        </a>
                    </div>

                    <div className="relative">
                        <img className="w-[26.55px] h-[26.55px] transition-opacity duration-300 ease-in-out opacity-100 hover:opacity-0" src="/מייל.svg" alt="Email" />
                        <a href="mailto:mepe.leos@gmail.com">
                            <img className="w-[26.55px] h-[26.55px] absolute inset-0 transition-opacity duration-300 ease-in-out opacity-0 hover:opacity-100" src="/מייל מעבר עכבר.svg" alt="Email" />
                        </a>
                        <a href="https://www.facebook.com/profile.php?id=100014888320823" className="home__social-link text-gray-800 text-xl transition duration-300 hover:text-yellow-400" target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faFacebook} />
                        </a>
                    </div>
                    <div className="relative">
                        <img className="w-[18.96px] h-[26.55px] transition-opacity duration-300 ease-in-out opacity-100 hover:opacity-0" src="/אינסטגרם.svg" alt="Instagram" />
                        <a href="https://www.instagram.com/elisheva_einhoren/" target="_blank" rel="noopener noreferrer">
                            <img className="w-[18.96px] h-[26.55px] absolute inset-0 transition-opacity duration-300 ease-in-out opacity-0 hover:opacity-100" src="/אינסטגרם מעבר עכבר.svg" alt="Instagram" />
                        </a>
                        <a href="https://github.com/shevibr0" className="home__social-link text-gray-800 text-xl transition duration-300 hover:text-yellow-400" target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faGithub} />
                        </a>
                    </div>
                </div>
            </div>
        </div>


    )
}

export default HomePage