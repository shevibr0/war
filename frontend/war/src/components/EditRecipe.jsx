import React, { useEffect, useState } from 'react';
import { updateRecipy, getRecipyById } from '../utils/RecipyUtil';
import { useNavigate, useParams } from 'react-router';
import { useSelector } from 'react-redux';

const EditRecipe = () => {
    const nav = useNavigate();
    const { id } = useParams(); // Assuming this is the ID of the recipe to edit
    const [recipeDetails, setRecipeDetails] = useState({
        Id: id,
        Name: '',
        IdSoldier: '', // If relevant
        IdUser: '',
        Date: '',
        Products: [],
        PreparationSteps: []
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const user = useSelector(state => state.user.connectedUser);

    useEffect(() => {
        const fetchRecipeDetails = async () => {
            setIsLoading(true);
            try {
                const data = await getRecipyById(id);
                if (user?.Id === data.IdUser) { // Check if the logged-in user is the creator
                    setRecipeDetails(data); // Assuming the data structure matches the state
                } else {
                    setError('You are not authorized to edit this recipe.');
                    nav(-1); // Navigate back if not authorized
                }
                setIsLoading(false);
            } catch (error) {
                setError('Failed to load recipe details.');
                setIsLoading(false);
            }
        };
        fetchRecipeDetails();
    }, [id, user?.Id, nav]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (user?.Id !== recipeDetails.IdUser) {
            setError('You are not authorized to update this recipe.');
            return;
        }
        setIsLoading(true);
        try {
            await updateRecipy(recipeDetails);
            // nav(`/soldierInfo/${recipeDetails.IdSoldier}/recepies`); // Adjust navigation as needed
            setError('');
        } catch (error) {
            setError('Failed to update recipe. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    if (error && error === 'You are not authorized to edit this recipe.') {
        return <div className="text-red-500 text-center">{error}</div>;
    }


    const handleChangeProduct = (index, value) => {
        setRecipeDetails(prevDetails => ({
            ...prevDetails,
            Products: prevDetails.Products.map((product, i) => (
                i === index ? { ...product, Description: value } : product
            ))
        }));
    };

    const handleChangePreparationStep = (index, value) => {
        setRecipeDetails(prevDetails => ({
            ...prevDetails,
            PreparationSteps: prevDetails.PreparationSteps.map((step, i) => (
                i === index ? { ...step, Description: value } : step
            ))
        }));
    };

    return (
        <div className="bg-gray-200 h-screen">
            <h2 className="text-center text-3xl font-bold">עריכת מתכון</h2>
            {error && <p className="text-red-500 text-center">{error}</p>}
            <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-8 bg-white shadow-md rounded">
                <div>
                    <label>שם המתכון:</label>
                    <input
                        type="text"
                        value={recipeDetails.Name}
                        onChange={(e) => setRecipeDetails({ ...recipeDetails, Name: e.target.value })}
                    />
                </div>
                {recipeDetails.Products.map((product, index) => (
                    <div key={index}>
                        <label>מרכיב {index + 1}:</label>
                        <input
                            type="text"
                            value={product.Description}
                            onChange={(e) => handleChangeProduct(index, e.target.value)}
                        />
                    </div>
                ))}
                {recipeDetails.PreparationSteps.map((step, index) => (
                    <div key={index}>
                        <label>שלב הכנה {index + 1}:</label>
                        <input
                            type="text"
                            value={step.Description}
                            onChange={(e) => handleChangePreparationStep(index, e.target.value)}
                        />
                    </div>
                ))}
                <button type="submit" disabled={isLoading}>{isLoading ? 'מעדכן...' : 'עדכן מתכון'}</button>
            </form>
        </div>
    );
};

export default EditRecipe;
