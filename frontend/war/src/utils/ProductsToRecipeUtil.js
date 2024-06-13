import api from "../api";
//crud
const getProductsToRecipes = async () => {
    return await api.get("ProductsToRecipe").then(res => res.data)
}
const getProductsToRecipeById = async (id) => {
    return await api.get(`ProductsToRecipe/?id=${id}`).then(res => res.data)
}
const addProductsToRecipe = async (productsToRecipe) => {
    return await api.post("ProductsToRecipe", productsToRecipe).then(res => res.data)
}
const updateProductsToRecipe = async (id, productsToRecipe) => {
    return await api.update(`ProductsToRecipe/?id=${id}`, productsToRecipe).then(res => res.data)
}
const deleteproductsToRecipe = async (id) => {
    return await api.post(`productsToRecipe/?id=${id}`).then(res => res.data)
}
export { getProductsToRecipes, getProductsToRecipeById, addProductsToRecipe, updateProductsToRecipe, deleteproductsToRecipe }