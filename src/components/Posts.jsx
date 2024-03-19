import React, { useState, useEffect } from 'react';
import * as postService from '../services/postService'; 
import * as userService from '../services/userService';
import '../App.css';

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [postForm, setPostForm] = useState({ description: '', userID: '' });
  const [editing, setEditing] = useState(false);
  const [editingPostId, setEditingPostId] = useState(null);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchPosts();
    fetchUsers();
  }, []);

  async function fetchPosts() {
    const fetchedPosts = await postService.getAllPosts();
    setPosts(fetchedPosts);
  }

  async function fetchUsers() {
    const fetchedUsers = await userService.getAllUsers();
    setUsers(fetchedUsers);
  }

  function handleInputChange(event) {
    const { name, value } = event.target;
    setPostForm({ ...postForm, [name]: value });
  }

  async function handleFormSubmit(event) {
    event.preventDefault();
    if (editing) {
      await postService.updatePostByID(editingPostId, postForm);
      setEditing(false);
    } else {
      await postService.addPost(postForm);
    }
    setPostForm({ description: '', userID: '' });
    fetchPosts();
  }

  function handleEditPost(post) {
    setEditing(true);
    setEditingPostId(post.postID);
    setPostForm({ description: post.description, userID: post.userID });
  }

  async function handleDeletePost(postId) {
    await postService.deletePostByID(postId);
    fetchPosts();
  }

  return (
    <div className="content">
      <h1>Posts</h1>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Post ID</th>
              <th>Description</th>
              <th>Username</th>
              <th>Created At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map(post => (
              <tr key={post.postID}>
                <td>{post.postID}</td>
                <td>{post.description}</td>
                <td>{post.username}</td>
                <td>{post.createdAt}</td>
                <td>
                  <button onClick={() => handleEditPost(post)}>Edit</button>
                  <button onClick={() => handleDeletePost(post.postID)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <form onSubmit={handleFormSubmit}>
        <input type="text" name="description" placeholder="Description" value={postForm.description} onChange={handleInputChange} required />
        {/* <input type="text" name="userID" placeholder="User ID" value={postForm.userID} onChange={handleInputChange} required /> */}
        {
          !editing &&
          <select name="userID" placeholder="User ID" value={postForm.userID} onChange={handleInputChange}>
            <option value="">Select User...</option>
            {users.map((user) => (
            <option key={user.userID} value={user.userID}>
              {user.username}
            </option>
            ))}
          </select>
        }
    
        <button type="submit">{editing ? 'Update Post' : 'Add Post'}</button>
        {editing && (
          <button onClick={() => {
            setEditing(false);
            setPostForm({ description: '', userID: '' });
          }}>
            Cancel
          </button>
        )}
      </form>
    </div>
  );
};

export default Posts;
