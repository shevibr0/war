import React, { useEffect, useState } from 'react';
import { addCompleteRecipe, getRecipyByRecipyId, updateRecipy } from '../utils/RecipyUtil';
import { useNavigate, useParams } from 'react-router';
import { useSelector } from 'react-redux';
import { getProductsToRecipeById } from '../utils/ProductsToRecipeUtil';
import { getPreparationById } from '../utils/PreparationUtil';
import Sidebar from './Sidebar';

const AddRecipe = () => {
    const nav = useNavigate();
    const { id, recipeId } = useParams();
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const user = useSelector(state => state.user.connectedUser);
    const [isEditing, setIsEditing] = useState(Boolean(recipeId));

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

    useEffect(() => {
        if (recipeId) {
            console.log("Fetching data for recipeId:", recipeId);
            Promise.all([
                getRecipyByRecipyId(recipeId),
                getProductsToRecipeById(recipeId),
                getPreparationById(recipeId)
            ]).then(([recipeData, productsData, preparationData]) => {
                if (recipeData) {
                    console.log("Recipe data:", recipeData);
                    console.log("Products data:", productsData);
                    console.log("Preparation data:", preparationData);
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
                } else {
                    setError('Recipe not found.');
                    setRecipeDetails(initialRecipeDetails);
                }
            }).catch(error => {
                console.error('Error fetching full recipe details:', error);
                setError('Failed to load recipe details. Please try again.');
            });
        }
    }, [recipeId, user?.Id]);

    console.log(" recipeDetailsssss", recipeDetails)

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
            alert("על מנת להוסיף מתכון יש להרשם ולהתחבר לאתר");
            nav('/register');
            return;
        }
        setIsLoading(true);
        console.log("Submitting this data:", recipeDetails);
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
                console.log('Recipe added successfully:', addedRecipe);
                nav(`/soldierInfo/${id}/recepies`);
                setError('')
            } else {
                console.log('Recipe recipeDetails:', recipeDetails);
                const editRecipe = await updateRecipy(recipeDetails);
                console.log('Recipe updated successfully:', editRecipe);
                setError('');
                nav(`/soldierInfo/${id}/recepies`);
            }
        } catch (error) {
            console.error('Error adding/updating recipe:', error);
            setError('Error adding/updating recipe. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-gray-200 h-screen">
            <Sidebar />
            <div className="flex justify-center bg-gray-200">
                <div className='text-gray-800 mt-4 mr-2 ml-2 text-center bg-gray-200'>
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
                        {error && <span className="text-red-500">{error}</span>}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddRecipe;
