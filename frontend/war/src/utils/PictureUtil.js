import api from "../api";
//crud
const getPictures = async () => {
    return await api.get("Picture").then(res => res.data)
}
const getPictureById = async (id) => {
    return await api.get(`Picture/${id}`).then(res => res.data)
}

const addPicture = async (picture) => {
    return await api.post("Picture", picture, {
    }).then(res => res.data);
};

const updatePicture = async (id, picture) => {
    return await api.put(`Picture/${id}`, picture).then(res => res.data)
}
const deletePicture = async (id) => {
    console.log("ggg", id)
    return await api.delete(`Picture/${id}`).then(res => res.data)
}
export { getPictures, getPictureById, addPicture, updatePicture, deletePicture }