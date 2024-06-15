import React from 'react';
import { FaHome, FaUserAlt, FaGraduationCap, FaLayerGroup, FaRegRegistered, FaComments, FaBars } from 'react-icons/fa';
import { IoMdLogIn } from "react-icons/io";
import { BiLogOutCircle } from "react-icons/bi";
const Sidebar = () => {


    return (
        <>
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
            <div className='flex items-center mb-1'>
                <img className="mt-3 ml-5 w-[10px] mr-15 " src="/חץ חזור.svg" alt="Logo" onClick={() => nav(-1)} />
            </div>
        </>
    );
}

export default Sidebar;
