import axios from 'axios';

const baseUrl = "https://localhost:7282";

export const apiVerifyBearerToken = async (token) => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    const response = await axios.get(`${baseUrl}/VerifyBearer`);
    return response;
}

export const apiGetMessageHistory = async (token) => {
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

export const apiDeleteAllItems = async (token) => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    
 const response = await fetch(`${baseUrl}/DeleteAllByIp`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })

    return response;
}

export const apiPostQueryToSql = async (token, body) => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    
    const response = await axios.post(`${baseUrl}/PostQueryToSql`, body, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
          });

    return response;
}

export const apiAuthenticateUser = async(username, password) => {

  const headers = {
    
    'username' : username,
    'password' : password
  };

  const response = await axios.post(`${baseUrl}/AuthenticateUser`, {} , {
      headers: headers
  });

  return response.data;

}
