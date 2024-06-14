import React, { useState } from "react";
import api from "../api";// Make sure to import your API library
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setConnectedUser } from "../features/userSlice";
import { GetByEmailAndPassword } from "../utils/UserUtil";

const Login = () => {
    const nav = useNavigate()
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [user, setUser] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useDispatch();

    const handleClickLogin = async () => {
        if (email === "" || password === "") {
            setError('Please enter both email and password');
            return;
        }
        try {
            // Assuming `api.post` returns a Promise
            const res = await GetByEmailAndPassword(email, password);
            if (res === null) {
                setError("Incorrect credentials");
            } else {
                console.log("Login Successful!");
                // Set the user data in state
                setUser(res);
                localStorage.setItem('user', JSON.stringify(res));
                dispatch(setConnectedUser(res));
                nav("/soldiers")
            }
        } catch (error) {
            console.error("An error occurred:", error);
            setError("An error occurred while processing your request");
        }
    };

    const handleChangeEmail = (event) => {
        setError("");
        let value = event.target.value;
        setEmail(value);
    };

    const handleChangePassword = (event) => {
        setError("");
        let value = event.target.value;
        setPassword(value);
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
                            <div onClick={() => nav('/')} className='font-bold'>התחברות</div>
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
                    <div onClick={() => nav('/homePage')} >
                        אודות
                    </div>
                </nav>
            )}
            <nav className="hidden lg:flex md:flex sm:flex left-0 top-0 shadow bg-white  justify-center  items-center  text-black lg:text-2xl  lg:h-[47px] md:text-xl md:h-[40px] sm:text-s  sm:h-[20px] mt-4 sm:mt-0 font-normal font-['Alef'] leading-[45px] cursor-pointer space-x-11">
                {!user && (
                    <>
                        <div onClick={() => nav('/register')}>הרשמה</div>
                        <div onClick={() => nav('/')} className='font-bold'>התחברות</div>
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
                <div onClick={() => nav('/soldiers')} >
                    חיפוש
                </div>
                <div onClick={() => nav('/homePage')}>
                    אודות
                </div>
            </nav>

            <div className="flex flex-wrap justify-center items-center h-screen">
                <div className="border border-black p-8 rounded-md">
                    <h1 className="text-black text-4xl font-bold font-['Alef'] mb-4 text-center">התחברות</h1>
                    <div className="flex flex-col items-center">
                        <label htmlFor="email" className="text-black mb-2">מייל</label>
                        <input name="email" type="text" placeholder="הכנס מייל" value={email} onChange={handleChangeEmail} style={{ direction: 'rtl' }} className="mb-2" />
                        <label htmlFor="password" className="text-black mb-2">סיסמא</label>
                        <input name="password" type="text" placeholder="הכנס סיסמא" value={password} onChange={handleChangePassword} style={{ direction: 'rtl' }} className="mb-2" />
                        <span className="text-red-500 mb-2">{error}</span>
                        <button onClick={handleClickLogin} className="bg-black text-white px-4 py-2 rounded-md">התחברות</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
