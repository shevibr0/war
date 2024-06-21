import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { getSoldiersById } from '../utils/SoldierUtil';
import { useSelector } from 'react-redux';
import Sidebar from './Sidebar';

const SoldierInfo = () => {
    const location = useLocation();
    const nav = useNavigate();
    const { id } = useParams();
    const [soldier, setSoldier] = useState(null);
    const [copySuccess, setCopySuccess] = useState('');
    const user = useSelector(state => state.user.connectedUser);

    useEffect(() => {
        const fetchSoldierDetails = async () => {
            try {
                const soldierData = await getSoldiersById(id);
                setSoldier(soldierData);
            } catch (error) {
                console.error('Error fetching soldier details:', error);
            }
        };
        fetchSoldierDetails();
    }, [id]);

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
        <div className="bg-gray-200 min-h-screen text-gray-800 px-4">
            <Sidebar />
            <div className='grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 gap-2 items-center mt-4 font-bold'>
                <div className='flex cursor-pointer bg-white shadow-top shadow-gray-500  p-2 rounded-lg justify-center hover:animate-button-push' onClick={() => nav(`/soldierInfo/${id}/memories`)}>פתקי זכרון</div>
                <div className='flex cursor-pointer  bg-white shadow-top shadow-gray-500  p-2 rounded-lg justify-center hover:animate-button-push' onClick={() => nav(`/soldierInfo/${id}/pictures`)}>תמונות</div>
                <div className='flex cursor-pointer  bg-white shadow-top shadow-gray-500 p-2 rounded-lg justify-center hover:animate-button-push' onClick={() => nav(`/soldierInfo/${id}/theilim`)}>אמירת תהילים </div>
                <div className='flex cursor-pointer  bg-white shadow-top shadow-gray-500 p-2 rounded-lg justify-center hover:animate-button-push' onClick={() => nav(`/soldierInfo/${id}/volunteering`)}>התנדבויות</div>
                <div className='flex cursor-pointer  bg-white shadow-top shadow-gray-500  p-2 rounded-lg justify-center hover:animate-button-push' onClick={() => nav(`/soldierInfo/${id}/recepies`)}>מתכונים</div>
            </div>
            <div className='flex justify-center items-center bg-gray-200 mt-8'>
                <div className="bg-white p-8 rounded-lg shadow-top shadow-gray-800 w-full max-w-4xl mb-6">
                    {soldier !== null ? (
                        <div>
                            <h1 className='text-center text-2xl mb-2'>{`${soldier.FirstName} ${soldier.LastName}`}</h1>
                            <div className="flex justify-center mb-2">
                                <img className='h-40 w-40 object-cover rounded-full' src={soldier.Image} alt={`${soldier.FirstName} ${soldier.LastName}`} />
                            </div>
                            <div className='flex flex-col items-center'>
                                <div className='flex justify-center'>
                                    <a onClick={handleCopyLink} className="flex text-center hover:cursor-pointer">
                                        <img className='w-5 h-5 bg-white mr-3 mt-1' src="/share.png" alt="share" />
                                    </a>
                                </div>
                                <div>
                                    {copySuccess && <p className="text-red-700">{copySuccess}</p>}
                                </div>
                            </div>
                            <div className="flex justify-center">
                                <span className="bg-black w-56 h-[0.2px] mt-5"></span>
                            </div>
                            <div className='text-center mt-4 space-y-2'>
                                <p><strong>גיל</strong> {soldier.Age}</p>
                                <p><strong>עיר</strong> {soldier.City}</p>
                                <p><strong>תאריך פטירה</strong> {soldier.DateOfDeath ? new Date(soldier.DateOfDeath).toDateString() : 'לא זמין'}</p>
                                <p><strong>מקום הפטירה</strong> {soldier.PlaceOfDeath}</p>
                                <p><strong>דרגה</strong> {soldier.RankName}</p>
                                <p><strong>תפקיד</strong> {soldier.Role}</p>
                                <p><strong>תאור קצר</strong> {soldier.ShortDescription}</p>

                                <p><strong>תאור ארוך</strong><br />
                                    {soldier.LongDescription}</p>

                                {/* <p><strong>כתובת אתר למאמר</strong> <br />
                                    <a target="_blank" href={soldier.UrlToArticle || '#'}>{soldier.UrlToArticle || 'לא זמין'}<br /></a>
                                </p> */}
                                <p><strong>מקום השירות</strong> {soldier.PlaceOfService}</p>
                                <p><strong>מקום הקבורה</strong> {soldier.BurialPlace}</p>
                                {/* <p><strong>ילד</strong> {soldier.IsChild ? 'כן' : 'לא'}</p> */}
                                {/* <p><strong>חוליית חירום</strong> {soldier.IsEmergencySquad ? 'כן' : 'לא'}</p> */}
                                <p><strong>נהרג בנובה</strong> {soldier.AtNova ? 'כן' : 'לא'}</p>
                            </div>
                        </div>
                    ) : (
                        <div className=''>
                            <p className=''>Loading...</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
export default SoldierInfo;
