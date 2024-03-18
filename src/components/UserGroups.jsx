import React, { useState, useEffect } from 'react';
import * as userGroupService from '../services/userGroupService'; 
import * as groupService from '../services/groupService';
import * as userService from '../services/userService';
import '../App.css';

const UserGroups = () => {
  const [userGroups, setUserGroups] = useState([]);
  const [users, setUsers] = useState([])
  const [groups, setGroups] = useState([])
  const [userGroupForm, setUserGroupForm] = useState({ userID: '', groupID: '' });

  useEffect(() => {
    fetchUserGroups();
    fetchUsers();
    fetchGroups();
  }, []);

  async function fetchUserGroups() {
    const fetchedUserGroups = await userGroupService.getAllUserGroups();
    setUserGroups(fetchedUserGroups);
  }

  async function fetchGroups() {
    const fetchedGroups = await groupService.getAllGroups();
    setGroups(fetchedGroups);
  }


  async function fetchUsers() {
    const fetchedUsers = await userService.getAllUsers();
    setUsers(fetchedUsers);
  }

  function handleInputChange(event) {
    const { name, value } = event.target;
    setUserGroupForm({ ...userGroupForm, [name]: value });
  }

  async function handleFormSubmit(event) {
    event.preventDefault();
    await userGroupService.addUserGroup(userGroupForm);
    setUserGroupForm({ userID: '', groupID: '' }); 
    fetchUserGroups(); 
  }

  return (
    <div className="content">
      <h1>User Groups</h1>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>User ID</th>
              <th>Username</th>
              <th>Group ID</th>
              <th>Group Name</th>
            </tr>
          </thead>
          <tbody>
            {userGroups.map((group, index) => (
              <tr key={index}>
                <td>{group.Users_userID}</td>
                <td>{group.username}</td>
                <td>{group.Groups_groupID}</td>
                <td>{group.groupName}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <form onSubmit={handleFormSubmit} className="add-user-group-form">
        <select name="userID" placeholder="User ID" value={userGroupForm.userID} onChange={handleInputChange}>
          <option value="">Select User...</option>
          {users.map((user) => (
          <option key={user.userID} value={user.userID}>
            {user.username}
          </option>
          ))}
        </select>
        {/* <input
          type="text"
          name="userID"
          placeholder="User ID"
          value={userGroupForm.userID}
          onChange={handleInputChange}
          required
        /> */}
        <input
          type="text"
          name="groupID"
          placeholder="Group ID"
          value={userGroupForm.groupID}
          onChange={handleInputChange}
          required
        />
        <select name="groupID" placeholder="Group ID" value={userGroupForm.groupID} onChange={handleInputChange}>
          <option value="">Select Group...</option>
          {groups.map((group) => (
          <option key={group.groupID} value={group.groupID}>
            {group.groupName}
          </option>
          ))}
        </select>
        <button type="submit">Add User to Group</button>
      </form>
    </div>
  );
};

export default UserGroups;
