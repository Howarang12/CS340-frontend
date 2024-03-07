import axios from 'axios';

const baseUrl = 'http://flip2.engr.oregonstate.edu:34556/comments';

export const getAllComments = async () => {
  try {
    const response = await axios.get(baseUrl);
    return response.data;
  } catch (error) {
    console.error('getAllComments error:', error);
    throw error;
  }
};

export const addComment = async (commentData) => {
  try {
    const response = await axios.post(baseUrl, commentData);
    return response.data;
  } catch (error) {
    console.error('addComment error:', error.response ? error.response.data : error);
    throw error;
  }
};

export const deleteCommentByID = async (id) => {
  try {
    const response = await axios.delete(`${baseUrl}/${id}`);
    return response.data;
  } catch (error) {
    console.error('deleteCommentByID error:', error);
    throw error;
  }
};

export const editCommentByID = async (id, commentData) => {
  try {
    const response = await axios.put(`${baseUrl}/${id}`, commentData);
    return response.data;
  } catch (error) {
    console.error('editCommentByID error:', error.response ? error.response.data : error);
    throw error;
  }
};
