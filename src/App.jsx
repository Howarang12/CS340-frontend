import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import Users from './components/Users';
import Groups from './components/Groups';
import Likes from './components/Likes';
import Posts from './components/Posts';
import Comments from './components/Comments';
import UserGroups from './components/UserGroups'; // Ensure this component exists

const Home = () => (
  <div>
    <h2>Welcome to the Social Media Database</h2>
    <p>Select a category to view more details.</p>
  </div>
);

const App = () => (
  <div>
    <h1>Social Media Database</h1>
    <Router>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/users">Users</Link></li>
          <li><Link to="/groups">Groups</Link></li>
          <li><Link to="/likes">Likes</Link></li>
          <li><Link to="/posts">Posts</Link></li>
          <li><Link to="/comments">Comments</Link></li>
          <li><Link to="/usergroups">User Groups</Link></li> 
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<Users />} />
        <Route path="/groups" element={<Groups />} />
        <Route path="/likes" element={<Likes />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/comments" element={<Comments />} />
        <Route path="/usergroups" element={<UserGroups />} /> 
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    </Router>
  </div>
);

export default App;
