import React, { useState, useEffect } from 'react';
import * as userService from '../services/userService';
import '../App.css'; 

const Users = () => {
  const [users, setUsers] = useState([]);
  const [userForm, setUserForm] = useState({ email: '', username: '', firstName: '', lastName: '' });
  const [editing, setEditing] = useState(false);
  const [editingUserId, setEditingUserId] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    const fetchedUsers = await userService.getAllUsers();
    setUsers(fetchedUsers);
  }

  function handleInputChange(event) {
    const { name, value } = event.target;
    setUserForm({ ...userForm, [name]: value });
  }

  async function handleFormSubmit(event) {
    event.preventDefault();
    if (editing) {
      await userService.updateUserById(editingUserId, userForm);
      setEditing(false);
    } else {
      await userService.addUser(userForm);
    }
    setUserForm({ email: '', username: '', firstName: '', lastName: '' });
    fetchUsers();
  }

  function handleEditUser(user) {
    setEditing(true);
    setEditingUserId(user.userID);
    setUserForm({ email: user.email, username: user.username, firstName: user.firstName, lastName: user.lastName });
  }

  async function handleDeleteUser(userId) {
    await userService.deleteUserById(userId);
    fetchUsers();
  }

  return (
    <div className="content">
      <h1>Users</h1>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th className="col-user-id">User ID</th>
              <th className="col-email">Email</th>
              <th>Username</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.userID}>
                <td>{user.userID}</td>
                <td>{user.email}</td>
                <td>{user.username}</td>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>
                  <button onClick={() => handleEditUser(user)}>Edit</button>
                  <button onClick={() => handleDeleteUser(user.userID)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <form onSubmit={handleFormSubmit}>
        <input type="text" name="firstName" placeholder="First Name" value={userForm.firstName} onChange={handleInputChange} required />
        <input type="text" name="lastName" placeholder="Last Name" value={userForm.lastName} onChange={handleInputChange} required />
        <input type="email" name="email" placeholder="Email" value={userForm.email} onChange={handleInputChange} required />
        <input type="text" name="username" placeholder="Username" value={userForm.username} onChange={handleInputChange} required />
        <button type="submit">{editing ? 'Update User' : 'Add User'}</button>
        {editing && (<button onClick={() => {
          setEditing(false);
          // clears the input fields
          setUserForm({ email: '', username: '', firstName: '', lastName: '' });
        }}
  >
    Cancel
  </button>
)}
      </form>
    </div>
  );
};

export default Users;
