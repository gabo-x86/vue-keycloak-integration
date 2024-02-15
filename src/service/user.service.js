import axios from 'axios';

const { BACKEND_HOST } = import.meta.env;
const apiUrl = `${BACKEND_HOST}/keycloak`;

async function getAllUsers(token) {
    const config = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    };

    try {
        const response = await axios.get(`${apiUrl}/user/search`, config);
        const resObj = Object.values(response)[0];
        return resObj;
    } catch (error) {
        return ["No autorizado"];
    }
}

export { 
    getAllUsers 
};