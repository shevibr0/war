import api from "../api";
//crud
const getPersonalVolunteerings = async () => {
    return await api.get("PersonalVolunteering").then(res => res.data)
}
const getPersonalVolunteeringById = async (id) => {
    return await api.get(`PersonalVolunteering/?id=${id}`).then(res => res.data)
}
const addPersonalVolunteering = async (personalVolunteering) => {
    return await api.post("PersonalVolunteering", personalVolunteering).then(res => res.data)
}
const updatePersonalVolunteering = async (id, personalVolunteering) => {
    return await api.update(`PersonalVolunteering/?id=${id}`, personalVolunteering).then(res => res.data)
}
const deletePersonalVolunteering = async (id) => {
    return await api.post(`PersonalVolunteering/?id=${id}`).then(res => res.data)
}
export {
    getPersonalVolunteerings, getPersonalVolunteeringById, addPersonalVolunteering, updatePersonalVolunteering, deletePersonalVolunteering
}