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
            Name: recipeDetails?.Name,
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
            <h2 className="flex justify-center text-3xl font-bold">{isEditing ? 'עריכת מתכון' : 'הוספת מתכון'}</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <div className="flex justify-center bg-gray-200">
                <div className='text-black mt-9 w-80 text-center'>
                    <form onSubmit={handleSubmit} className="bg-gray-400 space-y-4 p-8 border-2 border-black mt-4">
                        <div>
                            <label htmlFor="recipeName" className="text-black">שם המתכון</label>
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
                                className="p-2 m-2 border"
                                style={{ direction: 'rtl' }}
                            />
                            <button type="button" className="bg-gray-600 text-white py-2 px-4 rounded" onClick={addProduct}>מוצרים</button>
                            {recipeDetails.ProductsToRecipes.map((product, index) => (
                                <input
                                    key={product.Id}
                                    value={product.Description}
                                    onChange={(e) => handleChangeProduct(index, e)}
                                    placeholder="הוסף מוצר וכמות"
                                    className="p-2 m-2 border"
                                    style={{ direction: 'rtl' }}
                                />
                            ))}
                        </div>
                        <button type="button" className="bg-gray-600 text-white py-2 px-4 rounded" onClick={addPreparationStep}>הוראות הכנה</button>
                        <div>
                            {recipeDetails.Preparations.map((step, index) => (
                                <input
                                    key={step.Id}
                                    value={step.Description}
                                    onChange={(e) => handleChangePreparationStep(index, e)}
                                    placeholder="הוסף שלב הכנה"
                                    className="p-2 m-2 border"
                                    style={{ direction: 'rtl' }}
                                />
                            ))}
                        </div>
                        <div>
                            <label htmlFor="personalWords" className="text-black">בנימה אישית</label>
                            <textarea
                                id="personalWords"
                                name="PersonalWords"
                                value={recipeDetails.Recipy?.PersonalWords}
                                onChange={handleChange}
                                className="w-full p-2 border"
                                placeholder="כמה מילים אישיות על המתכון"
                                style={{ direction: 'rtl' }}
                            />
                        </div>
                        <button type="submit" disabled={isLoading} className="bg-gray-900 text-white py-2 px-4 rounded">
                            {isLoading ? 'Adding...' : (isEditing ? 'עריכת מתכון' : 'הוספת מתכון')}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddRecipe;
