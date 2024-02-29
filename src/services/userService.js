import axios from 'axios';

const baseUrl = 'http://localhost:3001/users';

export const getAllUsers = async () => {
  try {
    const response = await axios.get(baseUrl);
    return response.data;
  } catch (error) {
    console.error('getAllUsers error:', error);
    throw error; 
  }
};

export const getUserById = async (id) => {
  try {
    const response = await axios.get(`${baseUrl}/${id}`);
    return response.data;
  } catch (error) {
    console.error('getUserById error:', error);
    throw error;
  }
};

export const addUser = async (userData) => {
  try {
    const formattedData = {
      emailInput: userData.email,
      usernameInput: userData.username,
      fnameInput: userData.firstName,
      lnameInput: userData.lastName,
    };
    const response = await axios.post(baseUrl, formattedData);
    return response.data;
  } catch (error) {
    console.error('addUser error:', error.response ? error.response.data : error);
    throw error;
  }
};

export const deleteUserById = async (id) => {
  try {
    const response = await axios.delete(`${baseUrl}/${id}`);
    return response.data;
  } catch (error) {
    console.error('deleteUserById error:', error);
    throw error;
  }
};

export const updateUserById = async (id, userData) => {
  try {
    const formattedData = {
      emailInput: userData.email,
      usernameInput: userData.username,
      fnameInput: userData.firstName,
      lnameInput: userData.lastName,
    };
    const response = await axios.put(`${baseUrl}/${id}`, formattedData);
    return response.data;
  } catch (error) {
    console.error('updateUserById error:', error.response ? error.response.data : error);
    throw error;
  }
};
