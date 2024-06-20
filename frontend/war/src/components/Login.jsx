import React, { useState } from "react";
import api from "../api";// Make sure to import your API library
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setConnectedUser } from "../features/userSlice";
import { GetByEmailAndPassword } from "../utils/UserUtil";
import { FaHome, FaUserAlt, FaRegRegistered, FaComments } from 'react-icons/fa';
import { IoMdLogIn } from "react-icons/io";
import { BiLogOutCircle } from "react-icons/bi";

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
            <nav className="flex left-0 top-0  bg-gray-200 justify-center items-center text-3xl text-gray-800 h-[80px]  cursor-pointer space-x-11">
                {!user && (
                    <>
                        <div onClick={() => nav('/register')} className='transition duration-100 hover:text-yellow-400'><FaRegRegistered /></div>
                        <div onClick={() => nav('/login')} className='transition duration-100 hover:text-yellow-400'> <IoMdLogIn /></div>
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

            <div className="flex flex-wrap justify-center max-w-lg w-full mx-4  mt-4 p-5 text-center h-screen text-gray-800">
                <div className="bg-white text-center shadow-top  shadow-gray-800 p-4 rounded-2xl hover:animate-button-push hover:shadow-xl hover:shadow-gray-700">
                    <div className="flex flex-col items-center">
                        <input name="email" type="text" placeholder="הכנס מייל" value={email} onChange={handleChangeEmail} style={{ direction: 'rtl' }} className="mb-2 bg-gray-200 rounded-lg p-1" /><br />
                        <input name="password" type="text" placeholder="הכנס סיסמא" value={password} onChange={handleChangePassword} style={{ direction: 'rtl' }} className="mb-2 bg-gray-200 rounded-lg p-1" />
                        <span className="text-red-500 mb-2">{error}</span>
                        <button onClick={handleClickLogin} className="btn bg-gray-800 text-white py-1 px-2 rounded-md hover:animate-button-push">התחבר</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
