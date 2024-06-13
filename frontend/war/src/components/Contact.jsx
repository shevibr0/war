import React, { useState } from 'react'
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import emailjs from 'emailjs-com';

const Contact = () => {

    const nav = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [massage, setMassage] = useState('');
    const [error, setError] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const user = useSelector(state => state.user.connectedUser);

    const sendEmail = (e) => {
        e.preventDefault();

        if (!name || !email || !massage) {
            setError('Please fill out all fields.');
            return;
        }

        const templateParams = {
            name: name,
            email: email,
            massage: massage
        };

        emailjs.send('service_9rnvzfp', 'template_j3x5far', templateParams, "6no79izXNNDe1YECd")
            .then(response => {
                console.log('SUCCESS!', response.status, response.text);
                setName('');
                setEmail('');
                setMassage('');
                setError('');
                alert("ההודעה נשלחה")
            }, err => {
                console.error('FAILED...', err);
                setError('Failed to send the message, please try again.');
            });
    };
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

                    <div onClick={() => nav('/contact')} className='font-bold'>
                        צור קשר
                    </div>
                    <div onClick={() => nav('/soldiers')}>
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
                <div onClick={() => nav('/contact')} className='font-bold'>
                    צור קשר
                </div>
                <div onClick={() => nav('/soldiers')}>
                    חיפוש
                </div>
                <div onClick={() => nav('/homePage')}>
                    אודות
                </div>
            </nav>

            <div className='flex items-center mb-1'>
                <img className="mt-3 ml-5 max-w-[1%] lg:max-w-[1%] lg:mr-15  md:max-w-[1%] sm:max-w-[1%]" src="/חץ חזור.svg" alt="Logo" onClick={() => nav(-1)} />
            </div>
            <div className="flex justify-center h-screen">
                <div className="border border-black p-8 rounded-md  w-60 h-80  text-center mt-5">
                    <h1 className="text-black text-4xl font-bold font-['Alef']  text-center">צור קשר</h1>
                    <div className="bg-gray-200" style={{ direction: 'rtl' }}>
                        <form onSubmit={sendEmail}>
                            <label>שם</label>
                            <input type="text" name="name" value={name} onChange={e => setName(e.target.value)} />
                            <label>מייל</label>
                            <input type="email" name="email" value={email} onChange={e => setEmail(e.target.value)} />
                            <label>הודעה</label>
                            <textarea name="massage" value={massage} onChange={e => setMassage(e.target.value)} />
                            <button type="submit" className="rounded-md text-right pr-6 pl-6 text-indigo-50 text-2xl font-bold font-['Alef']  bg-gray-600  hover:bg-white  hover:text-gray-600 hover:border border-gray-600" style={{ transitionProperty: 'background-color, color' }}>שלח</button>
                            {error && <div>{error}</div>}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Contact
