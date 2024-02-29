import axios from 'axios';

const baseUrl = 'http://localhost:3001/groups';

export const getAllGroups = async () => {
  try {
    const response = await axios.get(baseUrl);
    return response.data;
  } catch (error) {
    console.error('getAllGroups error:', error);
    throw error;
  }
};

export const addGroup = async (groupData) => {
  try {
    
    const response = await axios.post(baseUrl, { groupNameInput: groupData.groupName });
    return response.data;
  } catch (error) {
    console.error('addGroup error:', error.response ? error.response.data : error);
    throw error;
  }
};

export const deleteGroupById = async (id) => {
  console.log("Attempting to delete group with ID:", id); 
  try {
    const response = await axios.delete(`${baseUrl}/${id}`);
    return response.data;
  } catch (error) {
    console.error('deleteGroupById error:', error);
    throw error;
  }
};

export const updateGroupById = async (id, groupData) => {
  try {
    
    const response = await axios.put(`${baseUrl}/${id}`, { groupNameInput: groupData.groupName });
    return response.data;
  } catch (error) {
    console.error('updateGroupById error:', error.response ? error.response.data : error);
    throw error;
  }
};
