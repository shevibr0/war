import React from 'react'
import { useNavigate } from 'react-router';
import Sidebar from './Sidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faLinkedin, faInstagram } from '@fortawesome/free-brands-svg-icons';


const HomePage = () => {
    const nav = useNavigate();

    return (
        <div className="bg-gray-200 h-screen font-sans">
            <>
                <nav className="flex left-0 top-0  bg-gray-200 justify-center items-center text-3xl text-gray-800 h-[80px]  cursor-pointer space-x-11">
                    {!user && (
                        <>
                            <div onClick={() => nav('/login')} className='transition duration-100 hover:text-yellow-400'> <IoMdLogIn /></div>
                        </>
                    )}
                    {user && (
                        <>
                            <div onClick={() => nav('/logOut')} className='transition duration-100 hover:text-yellow-400' > <BiLogOutCircle /></div>
                        </>
                    )}
                    <div onClick={() => nav('/contact')} className='transition duration-100 hover:text-yellow-400'> <FaComments /></div>
                    <div onClick={() => nav('/soldiers')} className='transition duration-100 hover:text-yellow-400' > <FaSearch /></div>
                    <div onClick={() => nav('/homePage')} className='transition duration-100 hover:text-yellow-400'><FaHome /></div>
                </nav>
                <h3 className='flex justify-center mt-2 mb-2 text-red-600 text-xs'>"המידע אודות הנופלים מתעדכן מידי יום מהאתר "דבר</h3>
                <h3 className='flex justify-center text-red-600 text-xs underline'><a href="https://www.davar1.co.il/" target="_blank" rel="noopener noreferrer">קרדיט לאתר דבר </a></h3>
                <div className='flex justify-center mt-2 mb-2'>
                    {user && (
                        <div className="text-lg text-gray-800 font-semibold text-center">
                            {user.Name}  שלום
                        </div>
                    )}
                </div>
            </>
            <div className='bg-gray-200'>
                <div className='flex justify-center'>
                    <h2 className='text-gray-700 text-3xl font-bold'>מנציחים את זכרם</h2><br />
                </div>

                <div className="flex items-center justify-center  flex-wrap">
                    <div className="max-w-lg w-full mx-4  mt-4 p-5 text-center text-gray-600 text-xl font-light bg-white shadow-lg shadow-gray-800 rounded-2xl">
                        המיזם הוקם מתוך רצון להכיר מקרוב את גיבורינו שנפלו, להנציח את זכרם ולהשאיר אותו חקוק בלב כולם<br /><br />
                        לחלוק איתנו סיפורים, תמונות, מתכונים שאהבו וזכרונות מתוקים<br /><br />
                        אנו מזמינים אתכם לקחת חלק במסע מרגש זה, להקדיש מעשה טוב או פרק תהלים לעילוי נשמתם
                        <br />
                    </div>
                </div>
            </div>
            <div className="flex justify-center mt-8">
                <button onClick={() => nav('/soldiers')} className="btn bg-gray-800 text-white py-2 px-4 rounded-md hover:animate-button-push">
                    חיפוש</button>
            </div>

            <div className="w-full bottom-0 mt-7 left-0  flex justify-center bg-gray-200 text-gray-800">
                <div className="flex items-center gap-4 rounded-lg">
                    <div className="relative transition duration-100 hover:text-yellow-400 rounded-2xl text-2xl ">
                        <a href="https://www.linkedin.com/in/elisheva-einhoren-43b1b3220/" target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faLinkedin} className='rounded-full' />
                        </a>
                    </div>

                    <div className="relative transition duration-100 hover:text-yellow-400  text-2xl">
                        <a href="mailto:mepe.leos@gmail.com" className='rounded-full'>
                            <FontAwesomeIcon icon={faEnvelope} />
                        </a>
                    </div>
                    <div className="relative">
                        <a className='transition duration-100 hover:text-yellow-400 text-2xl' href="https://www.instagram.com/elisheva_einhoren/" target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faInstagram} className='rounded-full' />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomePage