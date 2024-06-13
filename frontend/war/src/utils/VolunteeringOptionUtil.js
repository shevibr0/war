import api from "../api";
//crud
const getVolunteeringOptions = async () => {
    return await api.get("VolunteeringOption").then(res => res.data)
}
const getVolunteeringOptionById = async (id) => {
    return await api.get(`VolunteeringOption/${id}`).then(res => res.data)
}
const getVolunteeringOptionByIdAsyncOptionId = async (id, optionId) => {
    console.log("option2", optionId)
    return await api.get(`VolunteeringOption/${id},${optionId}`).then(res => res.data)
}
const addVolunteeringOption = async (volunteeringOption) => {
    return await api.post("VolunteeringOption", volunteeringOption).then(res => res.data)
}
const updateVolunteeringOption = async (id, volunteeringOption) => {
    return await api.put(`VolunteeringOption/${id}`, volunteeringOption).then(res => res.data)
}
const deleteVolunteeringOption = async (id) => {
    return await api.delete(`VolunteeringOption/${id}`).then(res => res.data)
}
export { getVolunteeringOptions, getVolunteeringOptionById, getVolunteeringOptionByIdAsyncOptionId, addVolunteeringOption, updateVolunteeringOption, deleteVolunteeringOption }