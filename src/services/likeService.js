import axios from 'axios';


const baseUrl = 'http://flip2.engr.oregonstate.edu:34556/likes';
// const baseUrl = 'http://localhost:34556/likes';


export const getLikes = async () => {
  try {
    const response = await axios.get(baseUrl);
    return response.data;
  } catch (error) {
    console.error('Error fetching likes:', error);
    throw error;
  }
};


export const addLike = async (likeData) => {
  try {
    const response = await axios.post(baseUrl, likeData);
    return response.data;
  } catch (error) {
    console.error('Error adding like:', error);
    throw error;
  }
};


export const deleteLikeByID = async (id) => {
  try {
    const response = await axios.delete(`${baseUrl}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting like:', error);
    throw error;
  }
};


export const updateLikeByID = async (id, likeData) => {
  try {
    const response = await axios.put(`${baseUrl}/${id}`, likeData);
    return response.data;
  } catch (error) {
    console.error('Error updating like:', error);
    throw error;
  }
};
