import api from "../api";

// crud
const getTehilim = async () => {
    return await api.get("Tehilim").then(res => res.data)
}

const getTehilimBySoliderIdUser = async (userId, soliderId) => {
    return await api.get(`Tehilim/GetTehilimBySoliderIdUser?id=${userId}&soldier=${soliderId}`).then(res => res)
}

const getCountTehilimBySoliderId = async (soliderId) => {
    return await api.get(`Tehilim/GetCountTehilimForSolider/${soliderId}`).then(res => res.data)
}

const getByUserCountTehilimForSoliderId = async (soliderId) => {
    return await api.get(`/Tehilim/GetByUserCountTehilimForSolider/${soliderId}`).then(res => res.data)
}

const getBooksCountForSolider = async (soliderId) => {
    return await api.get(`Tehilim/GetBooksCountForSolider/${soliderId}`).then(res => res.data)
}

const addTehilim = async (tehilim) => {
    return await api.post("Tehilim", tehilim).then(res => res.data)
}

const updateTehilim = async (id, tehilim) => {
    return await api.put(`Tehilim/${id}`, tehilim).then(res => res.data)
}

const deleteTehilim = async (id) => {
    return await api.delete(`Tehilim/${id}`).then(res => res.data)
}

const getCompletedPsalms = async (soldierId) => {
    return await api.get(`Tehilim/GetCompletedPsalms/${soldierId}`).then(res => res.data);
}

const addCompletedPsalm = async (completedPsalm) => {
    return await api.post("Tehilim/AddCompletedPsalm", completedPsalm).then(res => res.data);
}

const updateBookCountIfNeeded = async (soldierId) => {
    return await api.post(`/Tehilim/UpdateBookCount/${soldierId}`).then(res => res.data);
}

const deleteCompletedPsalmsBySoldierId = async (soldierId) => {
    return await api.delete(`/Tehilim/DeleteCompletedPsalmsBySoldier/${soldierId}`).then(res => res.data);
}
const getCountCompletedPsalmsForSoldier = async (soldierId) => {
    return await api.get(`Tehilim/GetCountCompletedPsalmsForSoldier/${soldierId}`).then(res => res.data);
}
export {
    getTehilim, getTehilimBySoliderIdUser, getCountTehilimBySoliderId, getByUserCountTehilimForSoliderId,
    addTehilim, updateTehilim, deleteTehilim, getBooksCountForSolider, getCompletedPsalms, addCompletedPsalm, getCountCompletedPsalmsForSoldier, updateBookCountIfNeeded, deleteCompletedPsalmsBySoldierId
}
