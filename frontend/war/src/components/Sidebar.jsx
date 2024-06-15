import React, { useState } from 'react';
import { FaHome, FaUserAlt, FaGraduationCap, FaLayerGroup, FaStickyNote, FaComments, FaBars } from 'react-icons/fa';

const Sidebar = () => {
    const [toggle, showMenu] = useState(false);

    return (
        <>
            {/* Sidebar for large screens */}
            <aside className={`hidden lg:flex fixed top-0 left-0 bg-gray-800 border-r border-gray-700 p-10 w-28 min-h-screen flex-col justify-between z-10`}>
                <a href="#home" className="nav__logo text-white">
                    {/* Logo goes here */}
                </a>
                <nav className="nav">
                    <div className="nav__menu">
                        <ul className="flex flex-col space-y-4">
                            <li className="nav__item">
                                <a href="#home" className="text-2xl text-white font-bold transition duration-1000 hover:text-yellow-400">
                                    <FaHome />
                                </a>
                            </li>
                            <li className="nav__item">
                                <a href="#about" className="text-2xl text-white font-bold transition duration-1000 hover:text-yellow-400">
                                    <FaUserAlt />
                                </a>
                            </li>
                            <li className="nav__item">
                                <a href="#resume" className="text-2xl text-white font-bold transition duration-1000 hover:text-yellow-400">
                                    <FaGraduationCap />
                                </a>
                            </li>
                            <li className="nav__item">
                                <a href="#portfolio" className="text-2xl text-white font-bold transition duration-1000 hover:text-yellow-400">
                                    <FaLayerGroup />
                                </a>
                            </li>
                            <li className="nav__item">
                                <a href="#recommendations" className="text-2xl text-white font-bold transition duration-1000 hover:text-yellow-400">
                                    <FaStickyNote />
                                </a>
                            </li>
                            <li className="nav__item">
                                <a href="#contact" className="text-2xl text-white font-bold transition duration-1000 hover:text-yellow-400">
                                    <FaComments />
                                </a>
                            </li>
                        </ul>
                    </div>
                </nav>
                <div className="nav footer">
                    <span className="text-gray-400 text-xs rotate-180 writing-mode-vertical-rl">
                        &copy;2024
                    </span>
                </div>
            </aside>

            {/* Sidebar for small and medium screens */}
            <div className="lg:hidden">
                <div
                    className={`fixed top-5 left-7 cursor-pointer h-10 w-11 bg-gray-800 border border-gray-700 flex justify-center items-center z-10 transition-all duration-300`}
                    onClick={() => showMenu(!toggle)}
                >
                    <FaBars className="text-white" />
                </div>
                <aside className={`${toggle ? "top-0" : "-top-full"} fixed w-full bg-gray-800 flex flex-col justify-center items-center z-10 transition-all duration-300`}>
                    <nav className="nav w-full">
                        <div className="nav__menu flex flex-col space-y-4 text-center p-4">
                            <li className="nav__item">
                                <a href="#home" className="text-2xl text-white font-bold transition duration-1000 hover:text-yellow-400" onClick={() => showMenu(false)}>
                                    <FaHome />
                                </a>
                            </li>
                            <li className="nav__item">
                                <a href="#about" className="text-2xl text-white font-bold transition duration-1000 hover:text-yellow-400" onClick={() => showMenu(false)}>
                                    <FaUserAlt />
                                </a>
                            </li>
                            <li className="nav__item">
                                <a href="#resume" className="text-2xl text-white font-bold transition duration-1000 hover:text-yellow-400" onClick={() => showMenu(false)}>
                                    <FaGraduationCap />
                                </a>
                            </li>
                            <li className="nav__item">
                                <a href="#portfolio" className="text-2xl text-white font-bold transition duration-1000 hover:text-yellow-400" onClick={() => showMenu(false)}>
                                    <FaLayerGroup />
                                </a>
                            </li>
                            <li className="nav__item">
                                <a href="#recommendations" className="text-2xl text-white font-bold transition duration-1000 hover:text-yellow-400" onClick={() => showMenu(false)}>
                                    <FaStickyNote />
                                </a>
                            </li>
                            <li className="nav__item">
                                <a href="#contact" className="text-2xl text-white font-bold transition duration-1000 hover:text-yellow-400" onClick={() => showMenu(false)}>
                                    <FaComments />
                                </a>
                            </li>
                        </div>
                    </nav>
                    <div className="nav footer text-white mt-8">
                        <span className="text-gray-400 text-xs">
                            &copy;2024
                        </span>
                    </div>
                </aside>
            </div>
        </>
    );
}

export default Sidebar;
