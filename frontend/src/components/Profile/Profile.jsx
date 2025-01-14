import React, { Fragment } from 'react';
import './Profile.css';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Loader from '../../layout/Loader';


const Profile = () => {
  const { user, loading } = useSelector((state) => state.auth);
  
  return (
    <Fragment> 
      {loading ? <Loader /> : (
        <Fragment>
          <div className="profile-container">
            <div className="profile-header">
              <img
                src={user.avatar.url || 'https://via.placeholder.com/150'}
                alt={user.name}
                className="profile-image"
              />
              <h4>Full name</h4>
              <p>{user.name || 'Guest User'}</p>

              <h4>Email Address</h4>
              <p>{user.email}</p>

              <h4>Joined date</h4>
              <p>{String(user.created_at).substring(0, 10)}</p>

              {user.role !== 'admin' && (

                <Link to="/bookings/me" className="btn"> My Bookings </Link>
              )}


              <Link to="/password/update" className="btn"> Change password </Link>
  
            </div>
            <div className="profile-actions">
              <Link to='/me/update' className="btn">
                Edit Profile
              </Link>
             
            </div>
          </div>
          
        </Fragment>
      )}
    
    </Fragment>
  );
};

export default Profile;
