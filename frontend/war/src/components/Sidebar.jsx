import React, { useState } from 'react';

const Sidebar = () => {
    const [toggle, showMenu] = useState(false);

    return (
        <>
            <aside className={`${toggle ? "left-0" : "-left-28"} fixed top-0 bg-body-color border-r border-gray-200 p-10 w-28 min-h-screen flex flex-col justify-between z-10 transition-all duration-300`}>
                <a href="#home" className="nav__logo">
                    {/* Logo goes here */}
                </a>
                <nav className="nav">
                    <div className="nav__menu">
                        <ul className="flex flex-col space-y-4">
                            <li className="nav__item">
                                <a href="#home" className="text-2xl text-title-color font-bold transition duration-1000 hover:text-yellow-400">
                                    <i className="icon-home"></i>
                                </a>
                            </li>

                            <li className="nav__item">
                                <a href="#about" className="text-2xl text-title-color font-bold transition duration-1000 hover:text-yellow-400">
                                    <i className="icon-user-following"></i>
                                </a>
                            </li>

                            <li className="nav__item">
                                <a href="#resume" className="text-2xl text-title-color font-bold transition duration-1000 hover:text-yellow-400">
                                    <i className="icon-graduation"></i>
                                </a>
                            </li>

                            <li className="nav__item">
                                <a href="#portfolio" className="text-2xl text-title-color font-bold transition duration-1000 hover:text-yellow-400">
                                    <i className="icon-layers"></i>
                                </a>
                            </li>

                            <li className="nav__item">
                                <a href="#recommendations" className="text-2xl text-title-color font-bold transition duration-1000 hover:text-yellow-400">
                                    <i className="icon-note"></i>
                                </a>
                            </li>

                            <li className="nav__item">
                                <a href="#contact" className="text-2xl text-title-color font-bold transition duration-1000 hover:text-yellow-400">
                                    <i className="icon-bubble"></i>
                                </a>
                            </li>
                        </ul>
                    </div>
                </nav>
                <div className="nav footer">
                    <span className="text-gray-600 text-xs rotate-180 writing-mode-vertical-rl">
                        &copy;2022-2023.
                    </span>
                </div>
            </aside>
            <div
                className={`fixed top-5 left-7 cursor-pointer h-10 w-11 bg-body-color border border-gray-200 flex justify-center items-center z-10 transition-all duration-300 ${toggle ? "left-36" : ""}`}
                onClick={() => showMenu(!toggle)}
            >
                <i className="icon-menu"></i>
            </div>
        </>
    );
}

export default Sidebar;
