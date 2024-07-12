import React, { useEffect, useState, useCallback, lazy, Suspense } from 'react';
import { addCompleteRecipe, getRecipyByRecipyId, updateRecipy } from '../utils/RecipyUtil';
import { useNavigate, useParams, useLocation } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { getProductsToRecipeById } from '../utils/ProductsToRecipeUtil';
import { getPreparationById } from '../utils/PreparationUtil';
import emailjs from 'emailjs-com';
import { getSoldiersById } from '../utils/SoldierUtil';
import { addPageToHistory } from '../features/userSlice';

const Sidebar = lazy(() => import('./Sidebar'));

const AddRecipe = () => {
    const nav = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const { id, recipeId } = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const user = useSelector(state => state.user.connectedUser);
    const [isEditing, setIsEditing] = useState(Boolean(recipeId));
    const [soldier, setSoldier] = useState(null);

    const initialRecipeDetails = {
        Recipy: {
            id: 0,
            Name: '',
            IdSoldier: id,
            IdUser: user?.Id,
            Date: new Date().toISOString(),
            PersonalWords: ''
        },
        ProductsToRecipes: [],
        Preparations: []
    };
    const [recipeDetails, setRecipeDetails] = useState(initialRecipeDetails);

    const fetchSoldierDetails = useCallback(async () => {
        try {
            const soldierData = await getSoldiersById(id);
            setSoldier(soldierData);
        } catch (error) {
            console.error('Error fetching soldier details:', error);
        }
    }, [id]);

    const fetchRecipeDetails = useCallback(async () => {
        if (recipeId) {
            try {
                const [recipeData, productsData, preparationData] = await Promise.all([
                    getRecipyByRecipyId(recipeId),
                    getProductsToRecipeById(recipeId),
                    getPreparationById(recipeId)
                ]);
                setRecipeDetails({
                    Recipy: {
                        id: recipeData[0].Id,
                        Name: recipeData[0].Name,
                        IdSoldier: recipeData[0].IdSoldier,
                        IdUser: recipeData[0].IdUser,
                        Date: recipeData[0].Date,
                        PersonalWords: recipeData[0].PersonalWords
                    },
                    ProductsToRecipes: productsData.filter(product => product.IdRec === recipeData[0].Id),
                    Preparations: preparationData.filter(step => step.IdRec === recipeData[0].Id)
                });
            } catch (error) {
                console.error('Error fetching full recipe details:', error);
                setError('Failed to load recipe details. Please try again.');
            }
        }
    }, [recipeId]);

    useEffect(() => {
        fetchSoldierDetails();
    }, [fetchSoldierDetails]);

    useEffect(() => {
        fetchRecipeDetails();
    }, [fetchRecipeDetails]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRecipeDetails(prevRecipeDetails => ({
            ...prevRecipeDetails,
            Recipy: {
                ...prevRecipeDetails.Recipy,
                [name]: value
            }
        }));
    };

    const handleChangeProduct = (index, e) => {
        const { value } = e.target;
        setRecipeDetails(prevRecipe => ({
            ...prevRecipe,
            ProductsToRecipes: prevRecipe.ProductsToRecipes.map((product, i) => (
                i === index ? { ...product, Description: value } : product
            ))
        }));
    };

    const handleChangePreparationStep = (index, e) => {
        const { value } = e.target;
        setRecipeDetails(prevDetails => ({
            ...prevDetails,
            Preparations: prevDetails.Preparations.map((step, i) => (
                i === index ? { ...step, Description: value } : step
            ))
        }));
    };

    const addProduct = () => {
        setRecipeDetails(prev => ({
            ...prev,
            ProductsToRecipes: [...prev.ProductsToRecipes, { IdRec: recipeId, Description: '', Order: prev.ProductsToRecipes.length + 1 }]
        }));
    };

    const addPreparationStep = () => {
        setRecipeDetails(prev => ({
            ...prev,
            Preparations: [...prev.Preparations, { IdRec: recipeId, Description: '', Order: prev.Preparations.length + 1 }]
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user) {
            alert("על מנת להוסיף מתכון יש להרשם/להתחבר לאתר");
            dispatch(addPageToHistory(location.pathname));
            nav('/register');
            return;
        }
        setIsLoading(true);
        const completeRecipeData = {
            Name: recipeDetails.Recipy?.Name,
            IdSoldier: recipeDetails.IdSoldier,
            IdUser: recipeDetails.IdUser,
            Date: recipeDetails.Date,
            ProductsToRecipes: recipeDetails.ProductsToRecipes,
            Preparations: recipeDetails.Preparations,
            Recipy: recipeDetails.Recipy
        };
        try {
            if (!isEditing) {
                const addedRecipe = await addCompleteRecipe(completeRecipeData);
                sendEmailNotification(completeRecipeData);
                setSuccessMessage('המתכון נוסף בהצלחה');
                setTimeout(() => {
                    setSuccessMessage('');
                    nav(`/soldierInfo/${id}/recepies`);
                }, 3000);
                setError('');
            } else {
                const editRecipe = await updateRecipy(recipeDetails);
                sendEmailNotification(recipeDetails.Recipy);
                setSuccessMessage('המתכון עודכן בהצלחה!');
                setTimeout(() => {
                    setSuccessMessage('');
                    nav(`/soldierInfo/${id}/recepies`);
                }, 3000);
                setError('');
            }
        } catch (error) {
            console.error('Error adding/updating recipe:', error);
            setError('Error adding/updating recipe. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const sendEmailNotification = (recipeData) => {
        const templateParams = {
            name: user.Name,
            email: user.Email,
            subject: 'New Recipe Added',
            message: `A new recipe has been added. Recipe: ${recipeData.Name}. View it at: https://matrysofwar.onrender.com/soldierInfo/${id}/recepies`
        };

        emailjs.send('service_9rnvzfp', 'template_j3x5far', templateParams, "PfoRzhpOYEmi5Zxch")
            .then((response) => {
                console.log('SUCCESS!', response.status, response.text);
            }, (error) => {
                console.error('FAILED...', error);
            });
    };

    return (
        <div className="bg-gray-200 h-screen relative">
            <Suspense fallback={<div>Loading Sidebar...</div>}>
                <Sidebar />
                <div className='flex items-center mb-1'>
                    <img className="mt-3 ml-5 w-[10px] mr-15 " src="/חץ חזור.svg" alt="Logo" onClick={() => nav(`/soldierInfo/${id}/recepies`)} />
                </div>
            </Suspense>
            {soldier && (
                <div className="fixed top-20 right-4">
                    {soldier.Image ? (
                        <img className='h-12 w-12 object-cover rounded-full border-2 border-black' src={soldier.Image} alt={`${soldier.FirstName} ${soldier.LastName}`} />
                    ) : (
                        <div className='h-12 w-12 rounded-full border-2 border-black'></div>
                    )}
                </div>
            )}
            <div className="flex justify-center bg-gray-200">
                <div className='text-gray-800 mt-4 mr-2 ml-2 text-center mb-2 bg-gray-200'>
                    <form onSubmit={handleSubmit} className='space-y-4 p-6 rounded-2xl bg-gray-400 shadow-xl shadow-gray-800 w-full max-w-4xl'>
                        <div className="flex flex-col space-y-4">
                            <label htmlFor="recipeName" className="font-bold rounded-xl text-lg">שם המתכון</label>
                            <input
                                id="recipeName"
                                type="text"
                                placeholder="הכנס שם מתכון"
                                value={recipeDetails.Recipy?.Name}
                                onChange={(e) => setRecipeDetails({
                                    ...recipeDetails,
                                    Recipy: {
                                        ...recipeDetails.Recipy,
                                        Name: e.target.value
                                    }
                                })}
                                className="p-2 m-2 border rounded-xl"
                                style={{ direction: 'rtl', wordWrap: 'break-word', overflowWrap: 'break-word' }}
                            />
                        </div>
                        <div className="flex flex-col space-y-4">
                            <button type="button" className="bg-gray-600 text-white py-2 px-4 rounded-xl" onClick={addProduct}>+ מוצרים</button>
                            {recipeDetails.ProductsToRecipes.map((product, index) => (
                                <input
                                    key={index}
                                    value={product.Description}
                                    onChange={(e) => handleChangeProduct(index, e)}
                                    placeholder="הוסף מוצר וכמות"
                                    className="p-2 m-2 border rounded-lg"
                                    style={{ direction: 'rtl', wordWrap: 'break-word', overflowWrap: 'break-word' }}
                                />
                            ))}
                        </div>
                        <div className="flex flex-col space-y-4">
                            <button type="button" className="bg-gray-600 text-white py-2 px-4 rounded-xl" onClick={addPreparationStep}>+ הוראות הכנה</button>
                            {recipeDetails.Preparations.map((step, index) => (
                                <input
                                    key={index}
                                    value={step.Description}
                                    onChange={(e) => handleChangePreparationStep(index, e)}
                                    placeholder="הוסף שלב הכנה"
                                    className="p-2 m-2 border rounded-xl"
                                    style={{ direction: 'rtl', wordWrap: 'break-word', overflowWrap: 'break-word' }}
                                />
                            ))}
                        </div>
                        <div className="flex flex-col space-y-4">
                            <label htmlFor="personalWords" className="font-bold text-lg">בנימה אישית</label>
                            <textarea
                                id="personalWords"
                                name="PersonalWords"
                                value={recipeDetails.Recipy?.PersonalWords}
                                onChange={handleChange}
                                className="w-full p-2 border rounded-xl"
                                placeholder="כמה מילים אישיות על המתכון"
                                style={{ direction: 'rtl', wordWrap: 'break-word', overflowWrap: 'break-word' }}
                            />
                        </div>
                        <div className='flex justify-center'>
                            <button type="submit" disabled={isLoading} className={`btn bg-gray-800 text-white py-2 px-4 rounded-md ${isLoading ? 'opacity-50 cursor-not-allowed' : ' hover:animate-button-push'}`}>
                                {isLoading ? 'Adding...' : (isEditing ? 'עריכת מתכון' : 'הוספת מתכון')}
                            </button>
                        </div>
                        {isLoading && <div className="flex justify-center mt-4">
                            <div className="w-12 h-12 border-4 border-t-4 border-gray-200 border-t-gray-600 rounded-full animate-spin"></div>
                        </div>}
                        {error && <span className="text-red-500">{error}</span>}
                        {successMessage && <span className="text-yellow-700 font-bold">{successMessage}</span>}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddRecipe;
