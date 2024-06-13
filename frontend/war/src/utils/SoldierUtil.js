import api from "../api";
//crud
const getSoldiers = async (page) => {
    return await api.get(`Soldier/GetSolidersByPage?page=${page}`).then(res => res.data)
}
const FetchDataFromApiAsync = async (page) => {
    return await api.get('Api/').then(res => res);
}
const GetCountSoliders = async () => {
    return api.get('Soldier/GetCountSoliders').then(res => res.data)
}
const getSoldiersById = async (id) => {
    return await api.get(`Soldier/${id}`).then(res => res.data)
}
const addSoldier = async (soldier) => {
    return await api.post("Soldier", soldier).then(res => res.data)
}
const updateSoldier = async (id, soldier) => {
    return await api.update(`Soldier/${id}`, soldier).then(res => res.data)
}
const deleteSoldier = async (id) => {
    return await api.post(`Soldier/${id}`).then(res => res.data)
}

const globalSearchSoldiers = async (searchValue, page) => {
    return await api.get(`Soldier/GlobalSearchSoldiers?searchValue=${searchValue}&page=${page}`).then(res => res.data)
}
export { getSoldiers, FetchDataFromApiAsync, GetCountSoliders, getSoldiersById, addSoldier, updateSoldier, deleteSoldier, globalSearchSoldiers }