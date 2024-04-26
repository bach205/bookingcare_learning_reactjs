import axios from '../axios';
const handleLoginAPI = async (email, password) => {
    return await axios.post('/api/login', { email, password })
}

const findAllUserAPI = async (id) => {
    return await axios.get(`/api/user-manage?id=${id}`);
}
export { handleLoginAPI, findAllUserAPI };