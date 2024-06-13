import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { getSoldiersById } from '../utils/SoldierUtil'; // Import the getSoldiersById function
import { useSelector } from 'react-redux';


const SoldierInfo = () => {
    const location = useLocation();
    const nav = useNavigate()
    const { id } = useParams(); // Assuming you're using React Router's useParams hook
    const [soldier, setSoldier] = useState(null); // State to store the soldier's data
    const [isOpen, setIsOpen] = useState(false);
    const [copySuccess, setCopySuccess] = useState('');
    const user = useSelector(state => state.user.connectedUser);

    useEffect(() => {
        const fetchSoldierDetails = async () => {
            try {
                // Fetch the soldier's data using the id
                const soldierData = await getSoldiersById(id);
                setSoldier(soldierData);
                console.log("soldier", soldier)
            } catch (error) {
                console.error('Error fetching soldier details:', error);
                // Handle error
            }
        };
        console.log("soldier", soldier)
        fetchSoldierDetails();
    }, [id]);

    // if (!soldier) {
    //     return <p>Loading...</p>;
    // }
    const handleCopyLink = () => {
        const fullUrl = window.location.origin + location.pathname;
        navigator.clipboard.writeText(fullUrl).then(() => {
            setCopySuccess('הקישור הועתק');
            setTimeout(() => setCopySuccess(''), 3000);
        }, (err) => {
            setCopySuccess('Failed to copy the link');
            console.error('Failed to copy the link: ', err);
        });
    };


    return (

        <div className=" bg-gray-200">
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
            <div className='grid lg:grid-cols-5  md:grid-cols-3 sm:grid-cols-2 gap-2  items-center mt-0 font-bold'>
                <div className='flex cursor-pointer border border-gray-600  p-2   rounded-lg justify-center' onClick={() => nav(`/soldierInfo/${id}/recepies`)} >מתכונים </div>
                <div className='flex cursor-pointer border border-gray-600  p-2  rounded-lg justify-center' onClick={() => nav(`/soldierInfo/${id}/memories`)} >פתקי זכרון</div>
                <div className='flex cursor-pointer border border-gray-600  p-2  rounded-lg justify-center' onClick={() => nav(`/soldierInfo/${id}/pictures`)} >תמונות</div>
                <div className='flex cursor-pointer border border-gray-600  p-2  rounded-lg justify-center' onClick={() => nav(`/soldierInfo/${id}/theilim`)} >אמירת תהילים לעילוי נשמתו</div>
                <div className='flex cursor-pointer border border-gray-600  p-2  rounded-lg justify-center' onClick={() => nav(`/soldierInfo/${id}/volunteering`)} >התנדבויות לעילוי נשמתו</div>
            </div>
            <div className='flex justify-center items-center'>
                <div className="bg-white p-8 rounded-lg text-black mt-4 border border-black">
                    {soldier !== null ? (
                        <div className="">
                            <h1 className='text-center text-2xl mb-2'>{`${soldier.FirstName} ${soldier.LastName}`}</h1>
                            <div className="flex justify-center mb-2 ">
                                <img className='h-40 w-40' src={soldier.Image} alt={`${soldier.FirstName} ${soldier.LastName}`} />
                            </div>
                            <div className='flex flex-col items-center'>
                                <div className='flex justify-center'>
                                    <a onClick={handleCopyLink} className="flex text-black hover:text-black cursor-pointer">
                                        <img className='w-5 h-5 bg-white mr-3 mt-1' src="/share.png" alt="share" />
                                        <span>לחץ לשתף אנשים בקישור זה</span>
                                    </a>
                                </div>
                                <div >
                                    {copySuccess && <p className="text-red-700">{copySuccess}</p>}
                                </div>

                            </div>
                            <div class="flex justify-center">
                                <span class="bg-black w-56 h-[0.2px] mt-5"></span>
                            </div>
                            <div className='text-center mt-4'>
                                <p><strong>גיל:</strong> {soldier.Age}</p>
                                {/* <p>{soldier.Gender}<strong> :מין</strong></p> */}
                                <p><strong>עיר:</strong> {soldier.City}</p>
                                <p>{new Date(soldier.DateOfDeath).toDateString()}<strong> :תאריך פטירה</strong> </p>
                                <p><strong>מקום הפטירה:</strong> {soldier.PlaceOfDeath}</p>
                                <p><strong>דרגה:</strong> {soldier.RankName}</p>
                                <p><strong>תפקיד:</strong> {soldier.Role}</p>
                                <p><strong>תאור קצר:</strong> {soldier.ShortDescription}</p>
                                <div className='flex justify-center'>
                                    <p className='w-56'><strong >:תאור ארוך</strong> {soldier.LongDescription}</p>
                                </div>
                                <p> <a target="_blank" href={soldier.UrlToArticle}>{soldier.UrlToArticle}<strong>:כתובת אתר למאמר</strong></a></p>
                                {/* <p> {soldier.Classification} <strong>:סיווג</strong> </p> */}
                                <p><strong>מקום השירות:</strong> {soldier.PlaceOfService}</p>
                                <p><strong>מקום הקבורה:</strong> {soldier.BurialPlace}</p>
                                <p><strong>ילד:</strong> {soldier.IsChild ? 'כן' : 'לא'}</p>
                                <p><strong>חוליית חירום:</strong> {soldier.IsEmergencySquad ? 'כן' : 'לא'}</p>
                                <p><strong>נהרג בנובה:</strong> {soldier.AtNova ? 'כן' : 'לא'}</p>
                            </div>
                        </div>
                    ) : (
                        <p>Loading...</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SoldierInfo;
