import React, { useState, useEffect } from 'react';
import * as likeService from '../services/likeService'; 
import * as userService from '../services/userService';
import * as groupService from '../services/groupService'
import '../App.css';

const Likes = () => {
  const [likes, setLikes] = useState([]);
  const [users, setUsers] = useState([]);
  const [groups, setGroups] = useState([]);
  // Initialize the form with default values
  const [likeForm, setLikeForm] = useState({ userID: '', postID: '', likeStatus: 1 });

  useEffect(() => {
    fetchLikes();
    fetchUsers();
    fetchGroups()
  }, []);

  async function fetchLikes() {
    const fetchedLikes = await likeService.getLikes();
    setLikes(fetchedLikes);
  }

  async function fetchUsers() {
    const fetchedUsers = await userService.getAllUsers();
    setUsers(fetchedUsers);
  }

  async function fetchGroups() {
    const fetchedGroups = await groupService.getAllGroups();
    setGroups(fetchedGroups);
  }

  function handleInputChange(event) {
    const { name, value } = event.target;
    setLikeForm({ ...likeForm, [name]: value });
  }

  async function handleFormSubmit(event) {
    event.preventDefault();
    await likeService.addLike(likeForm); // Add the like without checking for editing state
    setLikeForm({ userID: '', postID: '', likeStatus: 1 }); // Reset the form after submission
    fetchLikes(); // Refresh the likes list
  }

  async function handleDeleteLike(likeId) {
    await likeService.deleteLikeByID(likeId);
    fetchLikes(); // Refresh the likes list
  }

  return (
    <div className="content">
      <h1>Likes</h1>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Like ID</th>
              <th>Like Status</th>
              <th>Username</th>
              <th>Post ID</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {likes.map((like) => (
              <tr key={like.likeID}>
                <td>{like.likeID}</td>
                <td>{like.likeStatus}</td>
                <td>{like.username}</td>
                <td>{like.postID}</td>
                <td>
                  <button onClick={() => handleDeleteLike(like.likeID)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <form onSubmit={handleFormSubmit}>
        {/* <input type="text" name="userID" placeholder="User ID" value={likeForm.userID} onChange={handleInputChange} required /> */}
        <select name="userID" placeholder="User ID" value={likeForm.userID} onChange={handleInputChange}>
          <option value="">Select User...</option>
          {users.map((user) => (
          <option key={user.userID} value={user.userID}>
            {user.username}
          </option>
          ))}
        </select>

        <input type="text" name="postID" placeholder="Post ID" value={likeForm.postID} onChange={handleInputChange} required />

        <button type="submit">Add Like</button>
      </form>
    </div>
  );
};

export default Likes;
