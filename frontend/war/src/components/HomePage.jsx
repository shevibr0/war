import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router';

const HomePage = () => {
    const nav = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const user = useSelector(state => state.user.connectedUser);

    useEffect(() => {
        console.log(user);
    }, []);

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
                            <div onClick={() => nav('/login')}>התחברות</div>
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
                    <div onClick={() => nav('/soldiers')}>
                        חיפוש
                    </div>
                    <div onClick={() => nav('/homePage')} className='font-bold' >
                        אודות
                    </div>
                    <div className='text-gray-700'>
                        {user !== null && <h2>שלום {user.Name}</h2>}
                    </div>
                </nav>
            )}
            <nav className="hidden lg:flex md:flex sm:flex left-0 top-0 shadow bg-white  justify-center  items-center  text-black lg:text-2xl  lg:h-[47px] md:text-xl md:h-[40px] sm:text-s  sm:h-[20px] mt-4 sm:mt-0 font-normal font-['Alef'] leading-[45px] cursor-pointer space-x-11">
                {!user && (
                    <>
                        <div onClick={() => nav('/register')}>הרשמה</div>
                        <div onClick={() => nav('/login')}>התחברות</div>
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
                <div onClick={() => nav('/soldiers')}>
                    חיפוש
                </div>
                <div onClick={() => nav('/homePage')} className='font-bold'>
                    אודות
                </div>
                <div className='text-gray-700 border border-gray-600 rounded-full p-1'>
                    {user !== null && <h2>שלום {user.Name}</h2>}
                </div>
            </nav>
            <div className='bg-gray-200'>
                <div className='flex items-center mb-1'>
                    <img className="mt-3 ml-5 max-w-[1%] lg:max-w-[1%] lg:mr-15  md:max-w-[1%] sm:max-w-[1%]" src="/חץ חזור.svg" alt="Logo" onClick={() => nav(-1)} />
                </div>
                <div className='flex justify-center'>
                    <h2 className='text-gray-700 text-3xl font-bold'>מנציחים את זכרם</h2><br />
                </div>

                <div className="flex items-center justify-center  flex-wrap ">
                    <div className="ml-8 mr-8 w-[578px] h-[600px] lg:w-[678px] lg:h-96 lg:mr-2 md:w-[678px] md:h-[440px] sm:w-[578px] sm:h-[540px] mt-4   p-1 text-center text-gray-600 text-m font-bold font-['Ploni Yad v2 AAA'] leading-[42.67px] tracking-wider bg-white border border-gray-700 ">
                        המיזם "מנציחים את זכרם" הוקם בעקבות הרצון להכיר את הגיבורים שלנו מקרוב         <br />להשאיר פיסות מידע ואפשרות לחברים וקרובי משפחה להשאיר פיסת זכרון שתהיה פתוחה ונגישה לכל מי שרוצה לזכור, להזכר ולקבל השראה מהקדושים שנהרגו על קידוש ד' רק מעצם היותם יהודים<br />נשמח שתוסיפו מידע על חלל שהכרתם, מתכון שאהב, תמונה שלכם יחד, זכרון מתוק שיש לכם ואתם רוצים לשתף ממנו ולכל אלו שאינם מכירים<br />יש אפשרות לקבל על עצמכם התנדבות ולקרוא פרקי תהילים לעילוי נשמת החללים<br />לכל שאלה, בקשה או הבהרה מוזמנים לכתוב לנו בלשונית יצירת קשר <br />אלישבע ושלומית
                    </div>

                </div>
                <div className="h-1 mt-7  flex items-center justify-center">
                    <button onClick={() => nav('/soldiers')} className="rounded-md text-right pr-6 pl-6 text-indigo-50 text-2xl font-bold font-['Alef']  bg-gray-600  hover:bg-white  hover:text-gray-600 hover:border border-gray-600" style={{ transitionProperty: 'background-color, color' }}>
                        חיפוש חללי חרבות ברזל
                    </button>
                </div>

                <div className="w-full bottom-0 mt-5 left-0  flex justify-center">
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