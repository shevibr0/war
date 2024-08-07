import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { GetCountSoliders, getSoldiers, globalSearchSoldiers } from '../utils/SoldierUtil';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchSoliders, setSoliders, clearSearchSoliders } from '../features/soliderSlice';
import { FaHome, FaComments, FaSearch } from 'react-icons/fa';
import { IoMdLogIn } from "react-icons/io";
import { BiLogOutCircle } from "react-icons/bi";
import { MdNavigateNext, MdOutlineNavigateBefore } from "react-icons/md";
import { debounce } from 'lodash';

const Soldiers = () => {
    const location = useLocation();
    const nav = useNavigate();
    const soldiers = useSelector(state => state.solider.soliders);
    const searchSoldiers = useSelector(state => state.solider.searchSoliders);
    const solidersArr = searchSoldiers.length > 0 ? searchSoldiers : soldiers;
    const [currentPage, setCurrentPage] = useState(1);
    const [count, setCount] = useState(1);
    const [totalSearchPages, setTotalSearchPages] = useState(1);
    const [isNext, setIsNext] = useState(false);
    const [isPrev, setIsPrev] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchMessage, setSearchMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [_, setCopySuccess] = useState('');
    const user = useSelector(state => state.user.connectedUser);
    const dispatch = useDispatch();

    const fetchSoldiers = async (page) => {
        setLoading(true);
        try {
            const data = await getSoldiers(page);
            dispatch(setSoliders(data));
            setIsPrev(page > 1);
            setIsNext(data.length === 30);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (count === 1 && !isNext && !isPrev) {
            GetCountSoliders().then(res => {
                setCount(res);
            });
        }

        if (searchQuery) {
            searchSoldiersDebounced(searchQuery, currentPage);
        } else {
            fetchSoldiers(currentPage);
        }
    }, [currentPage, searchQuery]);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
        if (searchQuery) {
            searchSoldiersDebounced(searchQuery, newPage);
        } else {
            fetchSoldiers(newPage);
        }
    };

    const handleSearchValue = (e) => {
        let searchValue = e.target.value;
        setSearchQuery(searchValue);
        setSearchMessage("");
        setCurrentPage(1); // Reset current page to 1 when a new search is performed
        if (searchValue === "") {
            dispatch(clearSearchSoliders());
            window.location.reload(); // Refresh the page to reset to initial state
        } else {
            searchSoldiersDebounced(searchValue, 1);
        }
    };

    const handleCopyLink = () => {
        const fullUrl = window.location.origin + location.pathname;
        navigator.clipboard.writeText(fullUrl).then(() => {
            setCopySuccess('הקישור הועתק');
            setTimeout(() => setCopySuccess(''), 3000);
        }, (err) => {
            setCopySuccess('Failed to copy the link');
            console.error('Failed to copy the link: ', err);
        });
    };

    // Using useCallback to debounce the search function
    const searchSoldiersDebounced = useCallback(
        debounce(async (query, page) => {
            setLoading(true);
            try {
                const res = await globalSearchSoldiers(query, page);
                const totalResults = res.length;
                const totalPages = Math.ceil(totalResults / 30);
                setTotalSearchPages(totalPages);

                const pageResults = res.slice((page - 1) * 30, page * 30);
                dispatch(setSearchSoliders(pageResults));

                setIsPrev(page > 1);
                setIsNext(page < totalPages);
                if (pageResults.length === 0) {
                    setSearchMessage("no result :(");
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }, 500), // 500ms debounce time
        []
    );

    return (
        <div className="bg-gray-200 h-screen">
            <nav className="flex left-0 top-0 bg-gray-200 justify-center items-center text-3xl text-gray-800 h-[80px] cursor-pointer space-x-11">
                {!user && (
                    <div onClick={() => nav('/login')} className='transition duration-100 hover:text-yellow-400'><IoMdLogIn /></div>
                )}
                {user && (
                    <div onClick={() => nav('/logOut')} className='transition duration-100 hover:text-yellow-400'><BiLogOutCircle /></div>
                )}
                <div onClick={() => nav('/contact')} className='transition duration-100 hover:text-yellow-400'><FaComments /></div>
                <div onClick={() => nav('/soldiers')} className='transition duration-100 hover:text-yellow-400'><FaSearch /></div>
                <div onClick={() => nav('/homePage')} className='transition duration-100 hover:text-yellow-400'><FaHome /></div>
            </nav>
            <div className='flex justify-center mt-2 mb-2'>
                {user && (
                    <div className="text-lg text-gray-800 font-semibold text-center">
                        {user.Name} שלום
                    </div>
                )}
            </div>
            <div className="bg-gray-200">
                <div className="text-center mb-4">
                    <div className="relative flex items-center justify-center">
                        <input
                            type="text"
                            placeholder='חיפוש'
                            value={searchQuery}
                            onChange={handleSearchValue}
                            className="border border-gray-800 pl-10 pr-4 py-2 rounded-md"
                            style={{ direction: 'rtl' }}
                        />
                    </div>
                </div>
                <div className="flex justify-center items-center mt-4 mb-4">
                    {isPrev && (
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            className="btn bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:animate-button-push">
                            <MdOutlineNavigateBefore className="text-2xl" />
                        </button>
                    )}
                    <span className="text-lg font-bold mx-4">
                        {searchQuery ? (
                            <>
                                <span className="text-black">{currentPage}</span> / <span className="text-gray-400">{totalSearchPages}</span>
                            </>
                        ) : (
                            <>
                                <span className="text-black">{currentPage}</span> / <span className="text-gray-400">{count}</span>
                            </>
                        )}
                    </span>
                    {isNext && (
                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            className="btn text-gray-800 py-2 px-4 rounded-md hover:animate-button-push"
                        >
                            <MdNavigateNext className="text-2xl" />
                        </button>
                    )}
                </div>
                {loading ? (
                    <div className='text-center'>
                        <p className='text-gray-800'>Loading...</p>
                    </div>
                ) : (
                    <div className='ml-2 mr-2 text-gray-800'>
                        <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-3 gap-2 text-center w-full">
                            {searchMessage === "" ? solidersArr.map((soldier) => (
                                <div key={soldier.Id} className="bg-white text-center shadow-top shadow-gray-800 p-4 rounded-2xl hover:animate-button-push hover:shadow-xl hover:shadow-gray-700">
                                    <div className='flex justify-center mb-2'>
                                        {soldier.Image ? (
                                            <img className="h-40 w-40 object-cover rounded-full" loading="lazy" src={soldier.Image} alt={`${soldier.FirstName || ''} ${soldier.LastName || ''}`} />
                                        ) : (
                                            <div className='h-40 w-40 rounded-full border-2 border-black'></div>
                                        )}
                                    </div>
                                    <h3>{`${soldier.FirstName || ''} ${soldier.LastName || ''} (${soldier.Age || ''})`}</h3>
                                    <p>{soldier.City || ''}</p>
                                    <p>
                                        {soldier.DateOfDeath
                                            ? new Date(soldier.DateOfDeath).toLocaleDateString('he-IL', {
                                                day: '2-digit',
                                                month: '2-digit',
                                                year: 'numeric'
                                            })
                                            : 'לא זמין'}
                                    </p>
                                    <button className="btn bg-gray-300 font-bold text-gray-800 py-2 px-4 rounded-md hover:animate-button-push" onClick={() => nav(`/soldierInfo/${soldier.Id}`)}>עוד על {soldier.FirstName || ''}</button>
                                </div>
                            )) : <span>{searchMessage}</span>}
                        </div>
                        <div className="flex justify-center items-center mt-4 mb-4">
                            {isPrev && (
                                <button
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    className="btn bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:animate-button-push"
                                >
                                    <MdOutlineNavigateBefore className="text-2xl" />
                                </button>
                            )}
                            <span className="text-lg font-bold mx-4">
                                {searchQuery ? (
                                    <>
                                        <span className="text-black">{currentPage}</span> / <span className="text-gray-400">{totalSearchPages}</span>
                                    </>
                                ) : (
                                    <>
                                        <span className="text-black">{currentPage}</span> / <span className="text-gray-400">{count}</span>
                                    </>
                                )}
                            </span>
                            {isNext && (
                                <button
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    className="btn text-gray-800 py-2 px-4 rounded-md hover:animate-button-push"
                                >
                                    <MdNavigateNext className="text-2xl" />
                                </button>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Soldiers;
