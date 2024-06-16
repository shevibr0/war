import React, { useState } from "react";
import { useNavigate } from "react-router";
import { addUser } from "../utils/UserUtil";
import { useSelector } from 'react-redux';
import { FaHome, FaUserAlt, FaRegRegistered, FaComments } from 'react-icons/fa';
import { IoMdLogIn } from "react-icons/io";
import { BiLogOutCircle } from "react-icons/bi";

const Register = () => {
    const nav = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [error, setError] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const user = useSelector(state => state.user.connectedUser);

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }

    const validatePhone = (phone) => {
        const re = /^\d{10}$/;
        return re.test(String(phone));
    }

    const handleRegistration = async () => {
        if (name === "" || email === "" || password === "" || phone === "") {
            setError('Please fill in all fields');
            return;
        }

        if (!validateEmail(email)) {
            setError('Please enter a valid email address');
            return;
        }

        if (!validatePhone(phone)) {
            setError('Please enter a valid phone number');
            return;
        }

        if (password.length < 3) {
            setError('Password must be at least 3 characters long');
            return;
        }

        try {
            const newUser = { name, email, password, phone };
            const response = await addUser(newUser);
            console.log(response);
            if (response.status === 200) {
                console.log("Registration Successful!");
                // Optionally, you can redirect the user to the login page
                nav("/");
            } else {
                setError("Registration failed");
            }
        } catch (error) {
            console.error("An error occurred:", error);
            setError("An error occurred while processing your request");
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

    return (
        <div className="bg-gray-200">
            <nav className="flex left-0 top-0  bg-gray-200 justify-center items-center text-3xl text-gray-800 h-[80px]  cursor-pointer space-x-11">
                {!user && (
                    <>
                        <div onClick={() => nav('/register')} className='transition duration-100 hover:text-yellow-400'><FaRegRegistered /></div>
                        <div onClick={() => nav('/')} className='transition duration-100 hover:text-yellow-400'> <IoMdLogIn /></div>
                    </>
                )}
                {user && (
                    <>
                        <div onClick={() => nav('/logOut')} className='transition duration-100 hover:text-yellow-400' > <BiLogOutCircle /></div>
                    </>
                )}
                <div onClick={() => nav('/contact')} className='transition duration-100 hover:text-yellow-400'> <FaComments /></div>
                <div onClick={() => nav('/soldiers')} className='transition duration-100 hover:text-yellow-400' > <FaUserAlt /></div>
                <div onClick={() => nav('/homePage')} className='transition duration-100 hover:text-yellow-400'><FaHome /></div>
            </nav>
            <div className="text-center">
                <span>אם אתה רשום <span onClick={() => nav('/login')} className="text-blue-500 cursor-pointer">התחבר כעת</span></span>
            </div>
            <div className="flex flex-wrap justify-center items-center h-screen">
                <div className="border border-black p-9 rounded-md" style={{ direction: 'rtl' }}>
                    <h1 className="text-black text-4xl font-bold font-['Alef'] text-center">הרשמה</h1>
                    <div className="flex flex-col items-center">
                        <label htmlFor="name">שם</label>
                        <input name="name" type="text" placeholder="הכנס שם" value={name} onChange={handleChangeName} /><br />
                        <label htmlFor="email">מייל</label>
                        <input name="email" type="email" placeholder="הכנס מייל" value={email} onChange={handleChangeEmail} /><br />
                        <label htmlFor="password">סיסמא</label>
                        <input name="password" type="password" placeholder="הכנס סיסמא" value={password} onChange={handleChangePassword} /><br />
                        <label htmlFor="phone">טלפון</label>
                        <input name="phone" type="tel" placeholder="הכנס טלפון" value={phone} onChange={handleChangePhoneNumber} style={{ direction: 'rtl' }} /><br />
                        <span>{error}</span>
                        <button onClick={handleRegistration} className="bg-black text-white px-4 py-2 rounded-md">הרשמה</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;
