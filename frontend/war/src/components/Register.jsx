import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { addUser } from "../utils/UserUtil";
import { useDispatch, useSelector } from 'react-redux';
import { FaHome, FaUserAlt, FaRegRegistered, FaComments, FaEye, FaEyeSlash } from 'react-icons/fa';
import { IoMdLogIn } from "react-icons/io";
import { BiLogOutCircle } from "react-icons/bi";
import { RiLoginCircleFill } from "react-icons/ri";
import { FaSearch } from "react-icons/fa";
import { addPageToHistory } from "../features/userSlice";

const Register = () => {
    const nav = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [phone, setPhone] = useState('');
    const [error, setError] = useState('');
    const pageHistory = useSelector(state => state.user.pageHistory);
    const user = useSelector(state => state.user.connectedUser);

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }

    const validatePhone = (phone) => {
        const re = /^\d{10}$/;
        return re.test(String(phone));
    }

    const handleRegistration = async (event) => {
        event.preventDefault();
        if (name === "" || email === "" || password === "" || phone === "") {
            setError('נא למלא את כל השדות');
            return;
        }

        if (!validateEmail(email)) {
            setError('נא להכניס כתובת מייל חוקית');
            return;
        }

        if (!validatePhone(phone)) {
            setError('נא להכניס מספר טלפון חוקי');
            return;
        }

        if (password.length < 3) {
            setError('הסיסמה חייבת להכיל לפחות 3 תווים');
            return;
        }
        if (password.length > 6) {
            setError('הסיסמה חייבת להכיל לכל היותר 6 תווים');
            console.log("Password is too long.");
            return;
        }

        try {
            const newUser = { name, email, password, phone };
            const response = await addUser(newUser);
            console.log(response);
            if (response.status === 200) {
                console.log("הרשמה הצליחה");
                dispatch(addPageToHistory(location.pathname));
                nav('/login');
            } else {
                setError("הרשמה נכשלה");
            }
        } catch (error) {
            console.error("אירעה שגיאה:", error);
            setError("אירעה שגיאה בעת ביצוע הבקשה");
        }
    };

    const handleChangeName = (event) => {
        setError("");
        setName(event.target.value);
    };

    const handleChangeEmail = (event) => {
        setError("");
        setEmail(event.target.value);
    };

    const handleChangePassword = (event) => {
        setError("");
        setPassword(event.target.value);
    };

    const handleChangePhoneNumber = (event) => {
        setError("");
        setPhone(event.target.value);
    };

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="bg-gray-200">
            <nav className="flex left-0 top-0  bg-gray-200 justify-center items-center text-3xl text-gray-800 h-[80px]  cursor-pointer space-x-11">
                {!user && (
                    <>
                        {/* <div onClick={() => nav('/register')} className='transition duration-100 hover:text-yellow-400'><RiLoginCircleFill /></div> */}
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
            <div className="text-center mt-4">
                <span>אם הנך רשום <span onClick={() => nav('/login')} className="text-blue-500 cursor-pointer">התחבר כעת</span></span>
            </div>
            <div className="flex justify-center mt-9 h-screen text-gray-800">
                <div className="text-center mt-4 mr-5 ml-5">
                    <form onSubmit={handleRegistration} className="bg-white space-y-4 p-6 text-center w-full max-w-md shadow-top shadow-gray-800 rounded-2xl hover:animate-button-push hover:shadow-xl hover:shadow-gray-700">
                        <input name="name" type="text" placeholder="שם" value={name} onChange={handleChangeName} style={{ direction: 'rtl' }} className="mb-2 bg-gray-300 rounded-lg p-2 text-center" />
                        <input name="email" type="email" placeholder="מייל" value={email} onChange={handleChangeEmail} style={{ direction: 'rtl' }} className="mb-2 bg-gray-300 rounded-lg p-2 text-center" />
                        <div className="relative">
                            <input name="password" type={showPassword ? "text" : "password"} placeholder="סיסמא" value={password} onChange={handleChangePassword} style={{ direction: 'rtl' }} className="mb-2 bg-gray-300 rounded-lg p-2 text-center w-full" />
                            <span onClick={toggleShowPassword} className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-700 cursor-pointer">
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </span>
                        </div>
                        <input name="phone" type="tel" placeholder="טלפון" value={phone} onChange={handleChangePhoneNumber} style={{ direction: 'rtl' }} className="mb-2 bg-gray-300 rounded-lg p-2 text-center" /><br />
                        {error && <span className="text-red-500 mb-2">{error}</span>}<br />
                        <button type="submit" className="btn bg-gray-800 text-white py-2 px-4 rounded-md hover:animate-button-push">הרשם</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Register;
