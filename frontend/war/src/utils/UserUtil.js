import api from "../api";
//crud
const getUsers = async () => {
    return await api.get("User").then(res => res.data)
}
const getUserById = async (id) => {
    return await api.get(`User/?id=${id}`).then(res => res.data)
}
const GetByEmailAndPassword = async (email, password) => {
    console.log(email, password)
    return await api.get(`User/${email}/${password}`).then(res => res.data);
}
const addUser = async (user) => {
    return await api.post("User", user).then(res => res)
}
const updateUser = async (id, user) => {
    return await api.update(`User/?id=${id}`, user).then(res => res.data)
}
const deleteUser = async (id) => {
    return await api.post(`User/?id=${id}`).then(res => res.data)
}
const searchSoldiers = async (page, search) => {

    return await api.get(`/api/Soldier/GlobalSearchSoldiers?page=${page}&search=${search}`);

};
export { getUsers, getUserById, addUser, updateUser, deleteUser, GetByEmailAndPassword, searchSoldiers }