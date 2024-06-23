import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { GetByEmailAndPassword } from "../utils/UserUtil";
import { setConnectedUser, clearPageHistory } from '../features/userSlice';
import { FaHome, FaComments, FaEye, FaEyeSlash } from 'react-icons/fa';
import { IoMdLogIn } from "react-icons/io";
import { BiLogOutCircle } from "react-icons/bi";
import { FaSearch } from "react-icons/fa";

const Login = () => {
    const nav = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const pageHistory = useSelector(state => state.user.pageHistory);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [user, setUser] = useState(null);

    const handleClickLogin = async (event) => {
        event.preventDefault();
        if (email === "" || password === "") {
            setError('בבקשה הכנס מייל וסיסמא');
            return;
        }
        try {
            const res = await GetByEmailAndPassword(email, password);
            if (res === null) {
                setError("ההתחברות נכשלה");
            } else {
                setUser(res);
                localStorage.setItem('user', JSON.stringify(res));
                dispatch(setConnectedUser(res));
                if (pageHistory.length > 0) {
                    const lastPage = pageHistory[pageHistory.length - 1];
                    nav(lastPage);
                    dispatch(clearPageHistory());
                } else {
                    nav("/soldiers");
                }
            }
        } catch (error) {
            console.error("An error occurred:", error);
            setError("שגיאה במהלך ההתחברות");
        }
    };

    const handleChangeEmail = (event) => {
        setError("");
        setEmail(event.target.value);
    };

    const handleChangePassword = (event) => {
        setError("");
        setPassword(event.target.value);
    };

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="bg-gray-200">
            <nav className="flex left-0 top-0 bg-gray-200 justify-center items-center text-3xl text-gray-800 h-[80px] cursor-pointer space-x-11">
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
                <div onClick={() => nav('/soldiers')} className='transition duration-100 hover:text-yellow-400'><FaSearch /></div>
                <div onClick={() => nav('/homePage')} className='transition duration-100 hover:text-yellow-400'><FaHome /></div>
            </nav>
            <div className="flex justify-center mt-9 h-screen text-gray-800">
                <div className="text-center mt-4 mr-5 ml-5">
                    <form onSubmit={handleClickLogin} className="bg-white space-y-4 p-6 text-center w-full max-w-md shadow-top shadow-gray-800 rounded-2xl hover:animate-button-push hover:shadow-xl hover:shadow-gray-700">
                        <h1 className="text-3xl font-bold mb-6">התחברות</h1>
                        <input name="email" type="text" placeholder="מייל" value={email} onChange={handleChangeEmail} style={{ direction: 'rtl' }} className="mb-2 bg-gray-300 rounded-lg p-2 text-center" />
                        <div className="relative">
                            <input name="password" type={showPassword ? "text" : "password"} placeholder="סיסמא" value={password} onChange={handleChangePassword} style={{ direction: 'rtl' }} className="mb-2 bg-gray-300 rounded-lg p-2 text-center w-full" />
                            <span onClick={toggleShowPassword} className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-700 cursor-pointer">
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </span>
                        </div>
                        {error && <span className="text-red-500 mb-2">{error}</span>}<br />
                        <button type="submit" className="btn bg-gray-800 text-white py-2 px-4 rounded-md hover:animate-button-push">התחבר</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
