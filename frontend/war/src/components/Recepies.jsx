import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router';
import { deleteRecipy, getRecipyById } from '../utils/RecipyUtil';
import { getPreparationById } from '../utils/PreparationUtil';
import { getProductsToRecipeById } from '../utils/ProductsToRecipeUtil';
import { useSelector, useDispatch } from 'react-redux';
import { getSoldiersById } from '../utils/SoldierUtil';
import { addPageToHistory } from '../features/userSlice';

const Sidebar = React.lazy(() => import('./Sidebar'));

const Recepies = () => {
    const nav = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const { id } = useParams();
    const [recepies, setRecepies] = useState([]);
    const [preparations, setPreparations] = useState([]);
    const [productsToRecipes, setProductsToRecipes] = useState([]);
    const [soldier, setSoldier] = useState(null);
    const user = useSelector(state => state.user.connectedUser);

    const fetchRecipyById = useCallback(async () => {
        try {
            const data = await getRecipyById(id);
            console.log("recepies", data);
            setRecepies(data);
            if (data.length > 0) {
                const recipeIds = data.map(recipe => recipe.Id);
                await fetchPreparationAndProducts(recipeIds);
            }
        } catch (error) {
            console.error('Error fetching recipes:', error);
        }
    }, [id]);

    const fetchPreparationAndProducts = useCallback(async (recipeIds) => {
        try {
            const [preparationsData, productsData] = await Promise.all([
                Promise.all(recipeIds.map(recipeId => getPreparationById(recipeId))),
                Promise.all(recipeIds.map(recipeId => getProductsToRecipeById(recipeId)))
            ]);
            setPreparations(preparationsData.flat());
            setProductsToRecipes(productsData.flat());
        } catch (error) {
            console.error('Error fetching preparations and products to recipes:', error);
        }
    }, []);

    const fetchSoldierDetails = useCallback(async () => {
        try {
            const soldierData = await getSoldiersById(id);
            setSoldier(soldierData);
        } catch (error) {
            console.error('Error fetching soldier details:', error);
        }
    }, [id]);

    useEffect(() => {
        fetchRecipyById();
        fetchSoldierDetails();
    }, [fetchRecipyById, fetchSoldierDetails]);

    const handleEdit = (recipeId) => {
        nav(`${recipeId}/editRecipe`);
    };

    const handleDelete = async (recipeId) => {
        if (window.confirm("האם אתה בטוח שברצונך למחוק את המתכון?")) {
            try {
                await deleteRecipy(recipeId);
                setRecepies(currentRecipes => currentRecipes.filter(recipe => recipe.Id !== recipeId));
            } catch (error) {
                console.error("Error deleting recipe:", error);
            }
        } else {
            console.log("מחיקת המתכון בוטלה");
        }
    };

    const handleAddRecipe = () => {
        if (!user) {
            dispatch(addPageToHistory(location.pathname));
            nav('/register');
        } else {
            nav(`/soldierInfo/${id}/addRecepy`);
        }
    };

    return (
        <div className="bg-gray-200 min-h-screen relative">
            <React.Suspense fallback={<div>Loading Sidebar...</div>}>
                <Sidebar />
                <div className='flex items-center mb-1'>
                    <img className="mt-3 ml-5 w-[10px] mr-15 " src="/חץ חזור.svg" alt="Logo" onClick={() => nav(`/soldierInfo/${soldier.Id}`)} />
                </div>
            </React.Suspense>
            {soldier && (
                <div className="fixed top-20 right-4">
                    {soldier.Image ? (
                        <img className='h-12 w-12 object-cover rounded-full border-2 border-black' src={soldier.Image} alt={`${soldier.FirstName} ${soldier.LastName}`} />
                    ) : (
                        <div className='h-12 w-12 rounded-full border-2 border-black'></div>
                    )}
                </div>
            )}
            <div className='mt-4 flex justify-center'>
                <button className='btn bg-white font-bold cursor-pointer p-2 rounded-lg shadow-top shadow-gray-500 hover:animate-button-push' onClick={handleAddRecipe}>
                    + הוסף מתכון
                </button>
            </div>
            <div className='flex flex-wrap justify-center text-center bg-gray-200' style={{ direction: 'rtl' }}>
                {recepies.map((recipe) => (
                    <div key={recipe.Id} className="bg-yellow-100 shadow-lg w-full lg:w-1/4 md:w-1/3 sm:w-1/2 p-4 m-2 text-gray-800 rounded-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col justify-between">
                        <div>
                            <p>המתכון הועלה בתאריך {new Date(recipe.Date).toLocaleDateString()}</p>
                            <p>ע"י {recipe.IdUserNavigation.Name}</p>
                            <h2 className='font-bold text-xl border-b border-black text-gray-800 mb-1 break-words'>{recipe.Name}</h2>
                            <h3 className='font-bold text-gray-800'>מרכיבים</h3>
                            {productsToRecipes.filter((product) => product.IdRec === recipe.Id).map((productToRecipe) => (
                                <div key={productToRecipe.Id} className='flex justify-center text-center'>
                                    <p className="text-gray-600 break-words">{productToRecipe.Description}</p>
                                </div>
                            ))}
                            <h3 className='font-bold text-gray-800'>הוראות הכנה</h3>
                            {preparations.filter((preparation) => preparation.IdRec === recipe.Id).map((preparation) => (
                                <div key={preparation.Id} className='flex justify-center text-center'>
                                    <p className="text-gray-600 text-center break-words">{preparation.Description}</p>
                                </div>
                            ))}
                            <h3 className='font-bold text-gray-800'>בנימה אישית</h3>
                            {recipe.PersonalWords && <p className='text-sm italic text-gray-500 mb-2 break-words'>{recipe.PersonalWords}</p>}
                        </div>
                        {user && user.Id === recipe.IdUser && (
                            <div className="flex mt-0 pt-2 justify-end">
                                <button onClick={() => handleEdit(recipe.Id)} className="text-gray-800 hover:text-red-700">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21H3v-3.5L14.732 3.732z"></path></svg>
                                </button>
                                <button onClick={() => handleDelete(recipe.Id)} className="text-gray-800 hover:text-red-700">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                                </button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Recepies;
