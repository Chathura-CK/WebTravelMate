import React, { useState, useEffect, Fragment } from 'react';
import { useAlert } from 'react-alert';
import './Login.css';
import Loader from '../../layout/Loader';
import email_icon from '../../assets/email_icon.png';
import password_icon from '../../assets/password_icon.png';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { login, clearErrors } from '../../actions/authActions';

const Login = () => {
  // const alert = useAlert();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const dispatch = useDispatch();
  const { error, isAuthenticated, loading } = useSelector( state => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/'); // Redirect to home page
    }

    if (error) {
      // alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error, isAuthenticated, alert, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(formData.email, formData.password));
  };

  return (
    <Fragment>
      {loading ? <Loader />
       : (
        <div className="login-body">
          <div className="login-container">
            <form className="form" onSubmit={handleSubmit}>
              <h1>Login</h1>

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
