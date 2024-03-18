import axios from 'axios';

const baseUrl = 'http://flip2.engr.oregonstate.edu:34556/posts';
// const baseUrl = 'http://localhost:34556/posts';

export const getAllPosts = async () => {
  try {
    const response = await axios.get(baseUrl);
    return response.data;
  } catch (error) {
    console.error('getAllPosts error:', error);
    throw error;
  }
};

export const addPost = async (postData) => {
  try {
    const response = await axios.post(baseUrl, postData);
    return response.data;
  } catch (error) {
    console.error('addPost error:', error.response ? error.response.data : error);
    throw error;
  }
};

export const deletePostByID = async (id) => {
  try {
    const response = await axios.delete(`${baseUrl}/${id}`);
    return response.data;
  } catch (error) {
    console.error('deletePostByID error:', error);
    throw error;
  }
};

export const updatePostByID = async (id, postData) => {
  try {
    const response = await axios.put(`${baseUrl}/${id}`, postData);
    return response.data;
  } catch (error) {
    console.error('updatePostByID error:', error.response ? error.response.data : error);
    throw error;
  }
};
