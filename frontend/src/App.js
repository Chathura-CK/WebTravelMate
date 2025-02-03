import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Events from './pages/Events';
import EMagazine from './pages/E-Magazine';
import Login from './pages/Login';
import Signup from './pages/Signup';
import LandingPage from './pages/LandingPage';
import Profile from './pages/Profile';
import About from './pages/About';
import Footer from './components/Footer/Footer';
import SubmitPost from './components/SubmitPost/submitPost';
import store from './store';
import { loadUser } from './actions/authActions';
import  ProtectedRoute  from './route/ProtectedRoute';
import AdminLayout from './layout/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import UserManagement from './pages/admin/UserManagement';

const App = () => {
  const current_theme = localStorage.getItem('current_theme');
  const [theme, setTheme] = useState(current_theme ? current_theme : 'light');
 

  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  useEffect(() => {
    document.body.className = theme;
    localStorage.setItem('current_theme', theme);
  }, [theme]);

 

  return (
    <Router>
      
        <div className={`app-container ${theme}`}>
          <Navbar theme ={ theme } setTheme={ setTheme }/>
          <Routes>
          <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="users" element={<UserManagement />} />
        </Route>
            <Route path="/" element={<LandingPage theme={theme} />} />
            <Route path="/events" element={<Events theme={theme} />} />
            <Route path="/e-magazine" element={<EMagazine theme={theme} />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/me" element={<ProtectedRoute><Profile /></ProtectedRoute>} exact />
            <Route path="/about" element={<About />} />
            <Route path="/submitpost" element={<SubmitPost />} />
          </Routes>
          <Footer theme ={ theme } />
        </div>
      
    </Router>
  );
};

export default App;
