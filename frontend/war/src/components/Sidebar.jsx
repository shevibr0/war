import React from 'react';
import { FaHome, FaComments } from 'react-icons/fa';
import { IoMdLogIn } from "react-icons/io";
import { BiLogOutCircle } from "react-icons/bi";
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import { FaSearch } from "react-icons/fa";

const Sidebar = () => {
    const user = useSelector(state => state.user.connectedUser);
    const nav = useNavigate();
    return (
        <>
            <nav className="flex left-0 top-0  bg-gray-200 justify-center items-center text-3xl text-gray-800 h-[80px]  cursor-pointer space-x-11">
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
                <div onClick={() => nav('/soldiers')} className='transition duration-100 hover:text-yellow-400' > <FaSearch /></div>
                <div onClick={() => nav('/homePage')} className='transition duration-100 hover:text-yellow-400'><FaHome /></div>
            </nav>
            <h6 className='flex justify-center mt-2 mb-2'>davar המידע אודות החיילים מתעדכן מידי יום מהאתר</h6>
            <h3 className='flex justify-center'>https://www.davar1.co.il/ :קרדיט</h3>
            <div className='flex justify-center mt-2 mb-2'>
                {user && (
                    <div className="text-lg text-gray-800 font-semibold text-center">
                        {user.Name}  שלום
                    </div>
                )}
            </div>
        </>
    );
}

export default Sidebar;
