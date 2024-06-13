import api from "../api";
//crud
const getVolunteerings = async () => {
    return await api.get("VolunteeringOption").then(res => res.data)
}
const getVolunteeringById = async (id) => {
    return await api.get(`VolunteeringOption/?id=${id}`).then(res => res.data)
}
const addVolunteering = async (volunteering) => {
    return await api.post("Volunteering", volunteering).then(res => res.data)
}
const updateVolunteering = async (id, volunteering) => {
    return await api.update(`Volunteering/?id=${id}`, volunteering).then(res => res.data)
}
const deleteVolunteering = async (id) => {
    return await api.post(`Volunteering/?id=${id}`).then(res => res.data)
}
export { getVolunteerings, getVolunteeringById, addVolunteering, updateVolunteering, deleteVolunteering }