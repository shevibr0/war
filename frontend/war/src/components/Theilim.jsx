import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router';
import { useSelector } from 'react-redux';
import { addTehilim, getByUserCountTehilimForSoliderId, getCountTehilimBySoliderId, getTehilimBySoliderIdUser, updateTehilim } from '../utils/TehilimUtil';

const Theilim = () => {
    const nav = useNavigate()
    const [num, setNum] = useState(0);
    const [userNum, setUserNum] = useState(0);
    const [selectedPsalms, setSelectedPsalms] = useState(null);
    const [selectedPsalmsPart, setSelectedPsalmsPart] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
    const { id } = useParams();
    const [isOpen, setIsOpen] = useState(false);
    const user = useSelector(state => state.user.connectedUser);
    const [theilimUser, setTheilimUser] = useState(null);



    useEffect(() => {
        if (selectedPsalms) {
            console.log("Selected Psalms Updated:", selectedPsalms);
        }
    }, [selectedPsalms]);  // יופעל כל פעם שselectedPsalms משתנה
    const fetchTehilimBySoliderIdUser = async () => {
        try {
            const res = await getTehilimBySoliderIdUser(user.Id, id);
            if (res.status == 204) {
                setTheilimUser(null);
            }
            else {
                setTheilimUser(res.data);
            }
            const dataCount = await getCountTehilimBySoliderId(id);
            setNum(dataCount);

            const dataCountUser = await getByUserCountTehilimForSoliderId(id);
            setUserNum(dataCountUser);
        } catch (error) {
            console.log(error);
            // alert("אופס ארעה תקלה נסה שוב מאוחר יותר...");
        }
    };

    useEffect(() => {
        fetchTehilimBySoliderIdUser();
    }, [user]);

    const handleAddTheilimForSolider = async (e) => {
        debugger;
        e.preventDefault();
        if (theilimUser == null) {
            // add new theilim
            const theilimEmpty = {
                Id: 0,
                IdSoldier: id,
                IdUser: user.Id,
                Count: 1,
                Date: new Date().toISOString()
            }
            await addTehilim(theilimEmpty).then(res => {
                setTheilimUser(theilimEmpty);
                setNum(num + 1);
                setUserNum(userNum + 1);
                setShowPopup(false);
            });
        }
        else {
            let _theilimUser = { ...theilimUser };
            _theilimUser.Count = _theilimUser.Count + 1;
            console.log(_theilimUser);
            //update theilim
            await updateTehilim(_theilimUser.Id, _theilimUser).then(res => {
                setTheilimUser(_theilimUser);
                setNum(num + 1);
                setShowPopup(false);
            })

        }
    }

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
        return hebrewLetters[num - 1]; // מחזירים את האות המתאימה
    };
    const fetchPsalms = async (part) => {
        const response = await fetch(`https://www.sefaria.org/api/bulktext/Psalms.${part}`);
        if (response.ok) {
            const data = await response.json();
            // וודא שהנתיב להעתק העברי קיים בנתונים שהתקבלו לפני שתנסה לקרוא ממנו
            if (data && data[`Psalms.${part}`] && data[`Psalms.${part}`].he) {
                setSelectedPsalms(data[`Psalms.${part}`].he);
                setSelectedPsalmsPart(numberToHebrewLetter(part));
                setShowPopup(true);
            } else {
                console.error('Hebrew text not found');
            }
        } else {
            console.error('Failed to fetch data');
        }
    }
    return (
        <div className="bg-gray-200">
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
            <div className='flex justify-center'>
                מספר פרקי תהילים שנאמרו {num} עי כמות משתתפים {userNum}
            </div>
            <div className="bg-gray-200 min-h-screen  flex flex-col items-center mt-0" style={{ direction: 'rtl' }}>
                <h1 className="text-2xl font-semibold mb-5">בחר פרק תהילים</h1>
                <div className="grid lg:grid-cols-12 md:grid-cols-6 sm:grid-cols-3 gap-2">
                    {Array.from({ length: 150 }, (_, i) => (
                        <button
                            key={i + 1}
                            className="bg-gray-600 hover:bg-white text-white hover:text-gray-600 hover:border border-gray-600 font-bold py-2 px-7 rounded"
                            onClick={() => fetchPsalms(i + 1)}>
                            {numberToHebrewLetter(i + 1)}
                        </button>
                    ))}
                </div>
                {showPopup && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center overflow-y-auto">
                        <div className="bg-white p-5 rounded-lg max-w-lg w-full mx-2 my-4 ">
                            <h2 className="font-bold text-xl mb-2">תהילים פרק {selectedPsalmsPart}</h2>
                            <div className='h-[350px] overflow-y-auto'>
                                <p className="whitespace-pre-line" dangerouslySetInnerHTML={{ __html: selectedPsalms }} />
                            </div>
                            <div className='flex justify-center '>
                                <button onClick={handleAddTheilimForSolider}
                                    className="mt-4 bg-gray-600 hover:bg-white text-white hover:text-gray-600 hover:border border-gray-600 font-bold py-2 px-4 rounded">
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

export default Theilim