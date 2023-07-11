import axios from 'axios';

const baseUrl = "https://localhost:7282";
const bearerLinkUrl = "https://localhost:7282/VerifyBearer"
const historyLinkUrl = "https://localhost:7282/GetQueriesByIp"
const deleteLinkUrl = "https://localhost:7282/DeleteAllByIp"
const postToSqLinklUrl = "https://localhost:7282/PostQueryToSql"

export const verifyBearerToken = async (token) => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    const response = await axios.get(`${baseUrl}/VerifyBearer`);
    return response;
}

export const retrieveMessageHistory = async (token) => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
     const response = await fetch(`${baseUrl}/GetQueriesByIp`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
      },
      });
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
