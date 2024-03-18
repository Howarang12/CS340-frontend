import axios from 'axios';

const baseUrl = 'http://flip2.engr.oregonstate.edu:34556/user-groups';

export const getAllUserGroups = async () => {
  try {
    const response = await axios.get(baseUrl);
    return response.data;
  } catch (error) {
    console.error('getAllUserGroups error:', error);
    throw error;
  }
};

export const addUserGroup = async (userGroupData) => {
  try {
    const response = await axios.post(baseUrl, userGroupData);
    return response.data;
  } catch (error) {
    console.error('addUserGroup error:', error.response ? error.response.data : error);
    throw error;
  }
};
