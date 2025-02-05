import React, { useState, useEffect, Fragment } from 'react';
import './Login.css';
import Loader from '../../layout/Loader';
import email_icon from '../../assets/email_icon.png';
import password_icon from '../../assets/password_icon.png';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { login, clearErrors } from '../../actions/authActions';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [localError, setLocalError] = useState(null); // State for local error
  const dispatch = useDispatch();
  const { error, isAuthenticated, loading, user} = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated && user) {
      if (user.role === 'admin') {
        navigate('/admin'); 
      } else {
        navigate('/'); 
      }
    }

    if (error) {
      setLocalError(error); // Set the local error state
      dispatch(clearErrors());
    }
  }, [dispatch, error, isAuthenticated, user, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLocalError(null); // Clear any previous local error before submitting
    dispatch(login(formData.email, formData.password));
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <div className="login-body">
          <div className="login-container">
            <form className="form" onSubmit={handleSubmit}>
              <h1>Login</h1>

              {localError && (
                <div className="error-alert">
                  <p>{localError}</p>
                </div>
              )}

              <div className="input-group">
                <img src={email_icon} alt="Email Icon" className="icon" />
                <input
                  name="email"
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="input-group">
                <img src={password_icon} alt="Password Icon" className="icon" />
                <input
                  name="password"
                  type="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>

              <button type="submit" className="btn">
                Login
              </button>

              <Link to="/password/forgot" className="redirect-text">
                Forget Password?
              </Link>

              <p className="redirect-text">
                Don't have an account? <Link to="/signup">Sign Up here</Link>
              </p>
            </form>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default Login;
