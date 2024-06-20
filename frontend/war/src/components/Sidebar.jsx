import React from 'react';
import { FaHome, FaUserAlt, FaRegRegistered, FaComments } from 'react-icons/fa';
import { IoMdLogIn } from "react-icons/io";
import { BiLogOutCircle } from "react-icons/bi";
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';

const Sidebar = () => {
    const user = useSelector(state => state.user.connectedUser);
    const nav = useNavigate();
    return (
        <>
            <nav className="flex justify-center bg-gray-200 items-center text-3xl text-gray-800 h-[80px] cursor-pointer">
                {!user && (
                    <>
                        <div onClick={() => nav('/register')} className='transition duration-100 hover:text-yellow-400 mx-4'><FaRegRegistered /></div>
                        <div onClick={() => nav('/login')} className='transition duration-100 hover:text-yellow-400 mx-4'> <IoMdLogIn /></div>
                    </>
                )}
                {user && (
                    <>
                        <div onClick={() => nav('/logOut')} className='transition duration-100 hover:text-yellow-400 mx-4' > <BiLogOutCircle /></div>
                    </>
                )}
                <div onClick={() => nav('/contact')} className='transition duration-100 hover:text-yellow-400 mx-4'> <FaComments /></div>
                <div onClick={() => nav('/soldiers')} className='transition duration-100 hover:text-yellow-400 mx-4' > <FaUserAlt /></div>
                <div onClick={() => nav('/homePage')} className='transition duration-100 hover:text-yellow-400 mx-4'><FaHome /></div>
            </nav>
            <div className='flex justify-center mt-2'>
                {user && (
                    <div className="text-lg text-gray-800 font-semibold text-center">
                        שלום, {user.Name}
                    </div>
                )}
            </div>
            <div className='flex items-center mb-1 justify-center'>
                <img className="mt-3 w-[20px] mr-4" src="/חץ חזור.svg" alt="Logo" onClick={() => nav(-2)} />
            </div>
        </>
    );
}

export default Sidebar;
