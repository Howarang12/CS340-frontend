import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import Users from './components/Users';
import Groups from './components/Groups';

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
        </ul>
      </nav>

      <Routes>
        <Route path="/users" element={<Users />} />
        <Route path="/groups" element={<Groups />} />
        <Route path="/" element={<Home />} />
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    </Router>
  </div>
);

export default App;
