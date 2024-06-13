import api from "../api";
//crud
const getRecipy = async () => {
    console.log("getRecipy")
    return await api.get("Recipy").then(res => res.data)
}
const getRecipyById = async (id) => {
    console.log("getRecipyById", id)
    return await api.get(`Recipy/ById/${id}`).then(res => res.data);
}

const getRecipyByRecipyId = async (recipeId) => {
    console.log("getRecipyByRecipyId", recipeId)
    return await api.get(`Recipy/ByRecipeId/${recipeId}`).then(res => res.data);
}

const addRecipy = async (recipy) => {
    return await api.post("Recipy", recipy).then(res => res.data)
}
const updateRecipy = async (recipy) => {
    console.log("recipy", recipy)
    return await api.put(`Recipy/UpdateCompleteRecipe`, recipy).then(res => res.data)
}
const deleteRecipy = async (id) => {
    console.log("reccc", id)
    return await api.delete(`Recipy/DeleteCompleteRecipy/${id}`).then(res => res.data)
}
const addCompleteRecipe = async (recipeData) => {
    console.log("recipeData", recipeData)
    return await api.post("Recipy/AddCompleteRecipe", recipeData).then(res => res.data);
}

export { getRecipy, getRecipyById, getRecipyByRecipyId, addRecipy, updateRecipy, deleteRecipy, addCompleteRecipe }