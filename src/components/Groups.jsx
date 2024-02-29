import React, { useState, useEffect } from 'react';
import * as groupService from '../services/groupService'; 
import '../App.css'; 

const Groups = () => {
  const [groups, setGroups] = useState([]);
  const [groupForm, setGroupForm] = useState({ groupName: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [editingGroupId, setEditingGroupId] = useState(null);

  useEffect(() => {
    fetchGroups();
  }, []);

  const fetchGroups = async () => {
    const fetchedGroups = await groupService.getAllGroups();
    setGroups(fetchedGroups);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setGroupForm({ ...groupForm, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (isEditing) {
      await groupService.updateGroupById(editingGroupId, { groupName: groupForm.groupName });
      setIsEditing(false);
      setEditingGroupId(null);
    } else {
      await groupService.addGroup({ groupName: groupForm.groupName });
    }
    setGroupForm({ groupName: '' }); 
    fetchGroups(); 
  };

  const handleEditGroup = (group) => {
    setIsEditing(true);
    setEditingGroupId(group.groupID); 
    setGroupForm({ groupName: group.groupName });
  };

  const handleDeleteGroup = async (groupID) => {
    console.log("Deleting group with ID:", groupID); 
    await groupService.deleteGroupById(groupID);
    fetchGroups(); 
  };

  return (
    <div className="content">
      <h1>Groups</h1>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Group Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {groups.map(group => (
              <tr key={group.groupID}>
                <td>{group.groupName}</td>
                <td>
                  <button onClick={() => handleEditGroup(group)}>Edit</button>
                  <button onClick={() => handleDeleteGroup(group.groupID)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <form onSubmit={handleFormSubmit}>
        <input 
          type="text" 
          name="groupName"
          placeholder="Group Name" 
          value={groupForm.groupName}
          onChange={handleInputChange}
          required 
        />
        <button type="submit">{isEditing ? 'Update Group' : 'Add Group'}</button>
      </form>
    </div>
  );
};

export default Groups;
