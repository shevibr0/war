import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router';
import Sidebar from './Sidebar';

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

                <div className="flex items-center justify-center  flex-wrap ">
                    <div className="ml-9 mr-9 w-[578px] h-[650px] lg:w-[678px] lg:h-96 lg:mr-2 md:w-[678px] md:h-[440px] sm:w-[578px] sm:h-[540px] mt-4 p-1 text-center text-gray-600 text-m font-light leading-[42.67px] tracking-wider bg-white shadow-lg shadow-black">
                        המיזם "מנציחים את זכרם" נוצר מתוך רצון להכיר את גיבורינו מקרוב ולהשאיר פיסות זיכרון פתוחות ונגישות לכולם.<br /><br />
                        אנו מזמינים אתכם להוסיף מידע על חללים שהכרתם, כמו מתכון אהוב, תמונה משותפת או זיכרון מתוק שתרצו לשתף.<br /><br />
                        בנוסף, ישנה אפשרות להתנדב לקריאת פרקי תהילים לעילוי נשמת החללים.<br /><br />
                        לכל שאלה או הבהרה, אנא פנו אלינו דרך לשונית "יצירת קשר".
                    </div>


                </div>
                <div className="h-1 mt-10  flex items-center justify-center">
                    <button onClick={() => nav('/soldiers')} className="rounded-md text-right pr-6 pl-6 text-2xl font-bold  bg-gray-600  hover:bg-white  hover:text-gray-600 hover:border border-gray-600" style={{ transitionProperty: 'background-color, color' }}>
                        חיפוש חללי חרבות ברזל
                    </button>
                </div>

                <div className="w-full bottom-0 mt-7 left-0  flex justify-center bg-gray-200">
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <img className="w-[20.15px] h-[26.55px] transition-opacity duration-300 ease-in-out opacity-100 hover:opacity-0" src="/לינקדאין.svg" alt="LinkedIn" />
                            <a href="https://www.linkedin.com/in/elisheva-einhoren-43b1b3220/" target="_blank" rel="noopener noreferrer">
                                <img className="w-[20.15px] h-[26.55px] absolute inset-0 transition-opacity duration-300 ease-in-out opacity-0 hover:opacity-100" src="/לינקדאין מעבר עכבר.svg" alt="LinkedIn Hover" />
                            </a>
                        </div>
                        <div className="relative">
                            <img className="w-[26.55px] h-[26.55px] transition-opacity duration-300 ease-in-out opacity-100 hover:opacity-0" src="/מייל.svg" alt="Email" />
                            <a href="mailto:mepe.leos@gmail.com">
                                <img className="w-[26.55px] h-[26.55px] absolute inset-0 transition-opacity duration-300 ease-in-out opacity-0 hover:opacity-100" src="/מייל מעבר עכבר.svg" alt="Email" />
                            </a>
                        </div>
                        <div className="relative">
                            <img className="w-[18.96px] h-[26.55px] transition-opacity duration-300 ease-in-out opacity-100 hover:opacity-0" src="/אינסטגרם.svg" alt="Instagram" />
                            <a href="https://www.instagram.com/elisheva_einhoren/" target="_blank" rel="noopener noreferrer">
                                <img className="w-[18.96px] h-[26.55px] absolute inset-0 transition-opacity duration-300 ease-in-out opacity-0 hover:opacity-100" src="/אינסטגרם מעבר עכבר.svg" alt="Instagram" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default HomePage