import React, { useState, useEffect } from 'react';
import * as commentService from '../services/commentService'; 
import '../App.css';

const Comments = () => {
  const [comments, setComments] = useState([]);
  const [commentForm, setCommentForm] = useState({ commentText: '', userID: '', postID: '' });
  const [editing, setEditing] = useState(false);
  const [editingCommentId, setEditingCommentId] = useState(null);

  useEffect(() => {
    fetchComments();
  }, []);

  async function fetchComments() {
    const fetchedComments = await commentService.getAllComments();
    setComments(fetchedComments);
  }

  function handleInputChange(event) {
    const { name, value } = event.target;
    setCommentForm({ ...commentForm, [name]: value });
  }

  async function handleFormSubmit(event) {
    event.preventDefault();
    if (editing) {
      await commentService.editCommentByID(editingCommentId, commentForm);
      setEditing(false);
    } else {
      await commentService.addComment(commentForm);
    }
    setCommentForm({ commentText: '', userID: '', postID: '' });
    fetchComments();
  }

  function handleEditComment(comment) {
    setEditing(true);
    setEditingCommentId(comment.commentID);
    setCommentForm({ commentText: comment.commentText, userID: comment.userID, postID: comment.postID });
  }

  async function handleDeleteComment(commentId) {
    await commentService.deleteCommentByID(commentId);
    fetchComments();
  }

  return (
    <div className="content">
      <h1>Comments</h1>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Comment ID</th>
              <th>Comment Text</th>
              <th>Username</th>
              <th>Post ID</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {comments.map(comment => (
              <tr key={comment.commentID}>
                <td>{comment.commentID}</td>
                <td>{comment.commentText}</td>
                <td>{comment.username}</td>
                <td>{comment.postID}</td>
                <td>
                  <button onClick={() => handleEditComment(comment)}>Edit</button>
                  <button onClick={() => handleDeleteComment(comment.commentID)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <form onSubmit={handleFormSubmit}>
        <input type="text" name="commentText" placeholder="Comment Text" value={commentForm.commentText} onChange={handleInputChange} required />
        <input type="text" name="userID" placeholder="User ID" value={commentForm.userID} onChange={handleInputChange} required />
        <input type="text" name="postID" placeholder="Post ID" value={commentForm.postID} onChange={handleInputChange} required />
        <button type="submit">{editing ? 'Update Comment' : 'Add Comment'}</button>
        {editing && (
          <button onClick={() => {
            setEditing(false);
            setCommentForm({ commentText: '', userID: '', postID: '' });
          }}>
            Cancel
          </button>
        )}
      </form>
    </div>
  );
};

export default Comments;
