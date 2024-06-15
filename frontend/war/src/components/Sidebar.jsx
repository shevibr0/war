import React, { useState } from 'react';
import { FaHome, FaUserAlt, FaGraduationCap, FaLayerGroup, FaStickyNote, FaComments, FaBars } from 'react-icons/fa';

const Sidebar = () => {
    const [toggle, showMenu] = useState(false);

    return (
        <>
            <aside className={`${toggle ? "left-0" : "-left-28"} fixed top-0 bg-white border-r border-gray-700 p-10 w-28 min-h-screen flex flex-col justify-between z-10 transition-all duration-300`}>
                <a href="#home" className="nav__logo text-white">
                    {/* Logo goes here */}
                </a>
                <nav className="nav">
                    <div className="nav__menu">
                        <ul className="flex flex-col space-y-4">
                            <li className="nav__item">
                                <a href="#home" className="text-2xl text-gray-800 font-bold transition duration-1000 hover:text-yellow-400">
                                    <FaHome />
                                </a>
                            </li>

                            <li className="nav__item">
                                <a href="#about" className="text-2xl text-gray-800 font-bold transition duration-1000 hover:text-yellow-400">
                                    <FaUserAlt />
                                </a>
                            </li>

                            <li className="nav__item">
                                <a href="#resume" className="text-2xl text-gray-800 font-bold transition duration-1000 hover:text-yellow-400">
                                    <FaGraduationCap />
                                </a>
                            </li>

                            <li className="nav__item">
                                <a href="#portfolio" className="text-2xl text-gray-800 font-bold transition duration-1000 hover:text-yellow-400">
                                    <FaLayerGroup />
                                </a>
                            </li>

                            <li className="nav__item">
                                <a href="#recommendations" className="text-2xl text-gray-800 font-bold transition duration-1000 hover:text-yellow-400">
                                    <FaStickyNote />
                                </a>
                            </li>

                            <li className="nav__item">
                                <a href="#contact" className="text-2xl text-gray-800 font-bold transition duration-1000 hover:text-yellow-400">
                                    <FaComments />
                                </a>
                            </li>
                        </ul>
                    </div>
                </nav>
                <div className="nav footer">
                    <span className="text-gray-800 text-xs rotate-180 writing-mode-vertical-rl">
                        &copy;2024
                    </span>
                </div>
            </aside>
            <div
                className={`fixed top-5 left-7 cursor-pointer h-10 w-11 bg-gray-800 border border-gray-700 flex justify-center items-center z-10 transition-all duration-300 ${toggle ? "left-36" : ""}`}
                onClick={() => showMenu(!toggle)}
            >
                <FaBars className="text-white" />
            </div>
        </>
    );
}

export default Sidebar;
