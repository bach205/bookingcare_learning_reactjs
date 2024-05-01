import axios from '../axios';
const handleLoginAPI = async (email, password) => {
    return await axios.post('/api/login', { email, password })
}

const findAllUserAPI = async (id) => {
    return await axios.get(`/api/user-manage?id=${id}`);
}
const createNewUser = async (data) => {
    return await axios.post('/api/add-new-user', data);
}
const deleteUser = async (id) => {
    return await axios.delete('/api/delete-user', {
        data: { id },
    });
}
const updateUser = async (data) => {
    return await axios.put('/api/put-user',
        data
    )
}
export { handleLoginAPI, findAllUserAPI, createNewUser, deleteUser, updateUser };