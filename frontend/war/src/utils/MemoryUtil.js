import api from "../api";
//crud
const getMemories = async () => {
    return await api.get("Memory").then(res => res.data)
}
const getMemoriesById = async (id) => {
    return await api.get(`Memory/${id}`).then(res => res.data)
}
const getMemoryByIdAsyncRecipyId = async (id, memoryId) => {
    return await api.get(`Memory/${id},${memoryId}`).then(res => res.data)
}
const addMemory = async (memory) => {
    console.log("memory2", memory)
    return await api.post("Memory", memory).then(res => res.data)
}
const updateMemory = async (id, memory) => {
    console.log("object", memory, id)
    return await api.put(`Memory/${id}`, memory).then(res => res.data)
}
const deleteMemory = async (id) => {
    return await api.delete(`Memory/${id}`).then(res => res.data)
}
export { getMemories, getMemoriesById, getMemoryByIdAsyncRecipyId, addMemory, updateMemory, deleteMemory }