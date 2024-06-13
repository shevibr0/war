import api from "../api";
//crud
const getPreparations = async () => {
    return await api.get("Preparation").then(res => res.data)
}
const getPreparationById = async (id) => {
    return await api.get(`Preparation/?id=${id}`).then(res => res.data)
}
const addPreparation = async (preparation) => {
    return await api.post("Preparation", preparation).then(res => res.data)
}
const updatePreparation = async (id, preparation) => {
    return await api.update(`Preparation/?id=${id}`, preparation).then(res => res.data)
}
const deletePreparation = async (id) => {
    return await api.post(`Preparation/?id=${id}`).then(res => res.data)
}
export { getPreparations, getPreparationById, addPreparation, updatePreparation, deletePreparation }