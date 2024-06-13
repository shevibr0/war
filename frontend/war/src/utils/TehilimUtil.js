import api from "../api";
//crud
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

const addTehilim = async (tehilim) => {
    return await api.post("Tehilim", tehilim).then(res => res.data)
}
const updateTehilim = async (id, tehilim) => {
    return await api.put(`Tehilim/${id}`, tehilim).then(res => res.data)
}
const deleteTehilim = async (id) => {
    return await api.delete(`Tehilim/${id}`).then(res => res.data)
}

export {
    getTehilim, getTehilimBySoliderIdUser, getCountTehilimBySoliderId, getByUserCountTehilimForSoliderId,
    addTehilim, updateTehilim, deleteTehilim
}