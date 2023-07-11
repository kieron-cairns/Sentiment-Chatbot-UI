import axios from 'axios';

const authenticateUserUrl = "https://localhost:7282";
const bearerLinkUrl = "https://localhost:7282/VerifyBearer"
const historyLinkUrl = "https://localhost:7282/GetQueriesByIp"
const deleteLinkUrl = "https://localhost:7282/DeleteAllByIp"
const postToSqLinklUrl = "https://localhost:7282/PostQueryToSql"

export const verifyBearerToken = async (token) => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    const response = await axios.get(`${bearerLinkUrl}/VerifyBearer`);
    return response;
}

export const getMessageHistory = async (token) => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    const response = await axios.get(`${historyLinkUrl}/GetQueriesByIp`);
    return response;
}

export const deleteAllItems = async (token) => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    const response = await axios.delete(`${deleteLinkUrl}/DeleteAllByIp`);
    return response;
}

export const postQueryToSql = async (token, body) => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    const response = await axios.post(`${postToSqLinklUrl}/PostQueryToSql`, body);
    return response;
}
