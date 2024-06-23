import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import emailjs from 'emailjs-com';
import { addTehilim, getByUserCountTehilimForSoliderId, getCountTehilimBySoliderId, getTehilimBySoliderIdUser, updateTehilim, getBooksCountForSolider } from '../utils/TehilimUtil';
import { getSoldiersById } from '../utils/SoldierUtil';
import Sidebar from './Sidebar';
import { addPageToHistory } from '../features/userSlice';

const Theilim = () => {
    const nav = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const { id } = useParams();
    const user = useSelector(state => state.user.connectedUser);
    const [num, setNum] = useState(0);
    const [userNum, setUserNum] = useState(0);
    const [books, setBooks] = useState(0);
    const [selectedPsalms, setSelectedPsalms] = useState(null);
    const [selectedPsalmsPart, setSelectedPsalmsPart] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
    const [theilimUser, setTheilimUser] = useState(null);
    const [soldier, setSoldier] = useState(null);
    const [completedPsalms, setCompletedPsalms] = useState(new Set());

    useEffect(() => {
        if (selectedPsalms) {
            console.log("Selected Psalms Updated:", selectedPsalms);
        }
    }, [selectedPsalms]);

    const fetchTehilimBySoliderIdUser = async () => {
        if (!user) return;
        try {
            const res = await getTehilimBySoliderIdUser(user.Id, id);
            if (res.status === 204) {
                setTheilimUser(null);
            } else {
                setTheilimUser(res.data);
            }
            const dataCount = await getCountTehilimBySoliderId(id);
            setNum(dataCount);

            const dataCountUser = await getByUserCountTehilimForSoliderId(id);
            setUserNum(dataCountUser);

            const booksCount = await getBooksCountForSolider(id);
            setBooks(booksCount);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchSoldierDetails = async () => {
        try {
            const soldierData = await getSoldiersById(id);
            setSoldier(soldierData);
        } catch (error) {
            console.error('Error fetching soldier details:', error);
        }
    };

    useEffect(() => {
        fetchTehilimBySoliderIdUser();
        fetchSoldierDetails();
    }, [user]);

    const handleAddTheilimForSolider = async (e) => {
        e.preventDefault();
        if (!user) {
            alert("בבקשה להתחבר על מנת להוסיף פרק תהילים");
            dispatch(addPageToHistory(location.pathname));
            nav('/register');
            return;
        }
        if (theilimUser == null) {
            const theilimEmpty = {
                Id: 0,
                IdSoldier: id,
                IdUser: user.Id,
                Count: 1,
                Date: new Date().toISOString()
            };
            await addTehilim(theilimEmpty).then(res => {
                setTheilimUser(theilimEmpty);
                setNum(prevNum => prevNum + 1);
                setUserNum(prevUserNum => prevUserNum + 1);
                setShowPopup(false);
                console.log("Sending email notification for new Tehilim");
                sendEmailNotification(theilimEmpty);
                updateBookCountIfNeeded();
            });
        } else {
            let _theilimUser = { ...theilimUser };
            _theilimUser.Count = _theilimUser.Count + 1;
            console.log(_theilimUser);
            await updateTehilim(_theilimUser.Id, _theilimUser).then(res => {
                setTheilimUser(_theilimUser);
                setNum(prevNum => prevNum + 1);
                setShowPopup(false);
                console.log("Sending email notification for updated Tehilim");
                sendEmailNotification(_theilimUser);
                updateBookCountIfNeeded();
            });
        }
    };

    const updateBookCountIfNeeded = async () => {
        if (num + 1 === 150) { // Assuming 150 psalms
            await fetch(`/api/Tehilim/UpdateBookCount/${id}`, { method: 'POST' });
            setNum(0);
            setCompletedPsalms(new Set());
            setBooks(prevBooks => prevBooks + 1);
        } else {
            setCompletedPsalms(prev => new Set(prev).add(selectedPsalmsPart));
        }
    };

    const sendEmailNotification = (tehilimData) => {
        const templateParams = {
            name: user.Name,
            email: user.Email,
            subject: 'New Tehilim Added',
            message: `A new Tehilim has been added. User: ${user.Name}, Soldier ID: ${tehilimData.IdSoldier}, Count: ${tehilimData.Count}. View it at: https://matrysofwar.onrender.com/soldierInfo/${id}/theilim`
        };

        console.log('Sending email with params:', templateParams);

        emailjs.send('service_9rnvzfp', 'template_j3x5far', templateParams, "6no79izXNNDe1YECd")
            .then((response) => {
                console.log('SUCCESS!', response.status, response.text);
            }, (error) => {
                console.error('FAILED...', error);
            });
    };

    const numberToHebrewLetter = (num) => {
        const hebrewLetters = [
            "א'", 'ב', 'ג', 'ד', 'ה', 'ו', 'ז', 'ח', 'ט', 'י',
            'יא', 'יב', 'יג', 'יד', 'טו', 'טז', 'יז', 'יח', 'יט', 'כ',
            'כא', 'כב', 'כג', 'כד', 'כה', 'כו', 'כז', 'כח', 'כט', 'ל',
            'לא', 'לב', 'לג', 'לד', 'לה', 'לו', 'לז', 'לח', 'לט', 'מ',
            'מא', 'מב', 'מג', 'מד', 'מה', 'מו', 'מז', 'מח', 'מט', 'נ',
            'נא', 'נב', 'נג', 'נד', 'נה', 'נו', 'נז', 'נח', 'נט', 'ס',
            'סא', 'סב', 'סג', 'סד', 'סה', 'סו', 'סז', 'סח', 'סט', 'ע',
            'עא', 'עב', 'עג', 'עד', 'עה', 'עו', 'עז', 'עח', 'עט', 'פ',
            'פא', 'פב', 'פג', 'פד', 'פה', 'פו', 'פז', 'פח', 'פט', 'צ',
            'צא', 'צב', 'צג', 'צד', 'צה', 'צו', 'צז', 'צח', 'צט', 'ק',
            'קא', 'קב', 'קג', 'קד', 'קה', 'קו', 'קז', 'קח', 'קט', 'קי',
            'קיא', 'קיב', 'קיג', 'קיד', 'קטו', 'קטז', 'קיז', 'קיח', 'קיט', 'קכ',
            'קכא', 'קכב', 'קכג', 'קכד', 'קכה', 'קכו', 'קכז', 'קכח', 'קכט', 'קל',
            'קלא', 'קלב', 'קלג', 'קלד', 'קלה', 'קלו', 'קלז', 'קלח', 'קלט', 'קמ',
            'קמא', 'קמב', 'קמג', 'קמד', 'קמה', 'קמו', 'קמז', 'קמח', 'קמט', 'קנ',
        ];
        return hebrewLetters[num - 1];
    };

    const fetchPsalms = async (part) => {
        const response = await fetch(`https://www.sefaria.org/api/bulktext/Psalms.${part}`);
        if (response.ok) {
            const data = await response.json();
            if (data && data[`Psalms.${part}`] && data[`Psalms.${part}`].he) {
                setSelectedPsalms(data[`Psalms.${part}`].he);
                setSelectedPsalmsPart(part);
                setShowPopup(true);
            } else {
                console.error('Hebrew text not found');
            }
        } else {
            console.error('Failed to fetch data');
        }
    };

    return (
        <div className="bg-gray-200 min-h-screen relative">
            <Sidebar />
            {soldier && (
                <div className="fixed top-20 right-4">
                    {soldier.Image ? (
                        <img className='h-12 w-12 object-cover rounded-full border-2 border-black' src={soldier.Image} alt={`${soldier.FirstName} ${soldier.LastName}`} />
                    ) : (
                        <div className='h-12 w-12 rounded-full border-2 border-black'></div>
                    )}
                </div>
            )}
            <div className='flex justify-center mt-4'>
                <p>מספר פרקי תהילים שנאמרו: {num} | כמות משתתפים: {userNum} | מספר ספרים: {books}</p>
            </div>
            <div className="bg-gray-200 min-h-screen flex flex-col items-center mt-0" style={{ direction: 'rtl' }}>
                <h1 className="text-2xl text-gray-800 font-semibold mb-5">בחר פרק תהילים</h1>
                <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-12 gap-2">
                    {Array.from({ length: 150 }, (_, i) => (
                        <button
                            key={i + 1}
                            className={`font-bold py-2 px-7 rounded mb-2 ${completedPsalms.has(i + 1) ? 'bg-white text-gray-600 border border-gray-600' : 'bg-gray-600 text-white hover:bg-white hover:text-gray-600 hover:border border-gray-600'}`}
                            onClick={() => fetchPsalms(i + 1)}
                            disabled={completedPsalms.has(i + 1)}
                        >
                            {numberToHebrewLetter(i + 1)}
                        </button>
                    ))}
                </div>
                {showPopup && (
                    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center overflow-y-auto">
                        <div className="bg-white p-5 rounded-lg max-w-lg w-full mx-2 my-4">
                            <h2 className="font-bold text-xl mb-2">תהילים פרק {numberToHebrewLetter(selectedPsalmsPart)}</h2>
                            <div className='h-[350px] overflow-y-auto'>
                                <p className="whitespace-pre-line" dangerouslySetInnerHTML={{ __html: selectedPsalms }} />
                            </div>
                            <div className='flex justify-center'>
                                <button onClick={handleAddTheilimForSolider}
                                    className="btn mt-4 bg-gray-600 hover:bg-white text-white hover:text-gray-600 hover:border border-gray-600 font-bold py-2 px-4 rounded">
                                    קראתי את הפרק
                                </button>
                                <button onClick={() => setShowPopup(false)}
                                    className="mt-4 mr-4 bg-gray-600 hover:bg-white text-white hover:text-gray-600 hover:border border-gray-600 font-bold py-2 px-4 rounded">
                                    סגור
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Theilim;
