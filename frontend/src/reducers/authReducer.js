import {
  LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE,
  REGISTER_USER_REQUEST, REGISTER_USER_SUCCESS, REGISTER_USER_FAILURE,
  LOAD_USER_REQUEST, LOAD_USER_SUCCESS, LOAD_USER_FAILURE,
  LOGOUT_FAILURE, LOGOUT_SUCCESS,
  CLEAR_ERRORS
} from '../constants/userConstants';

// const initialState = {
//   user: null,           // Set initial user as null
//   isAuthenticated: false,  // User is not authenticated by default
//   loading: false,       // Indicate whether the state is loading (e.g., during login)
// };

const authReducer = (state = { user: { } }, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
    case REGISTER_USER_REQUEST:
    case LOAD_USER_REQUEST:
      return {
     
        loading: true,
        isAuthenticated: false,
      };

    case LOGIN_SUCCESS:
    case REGISTER_USER_SUCCESS:
    case LOAD_USER_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.payload  // Store the user data in the Redux state
        
      };

    case LOGOUT_SUCCESS:
      return {
        loading: false,
        isAuthenticated: false,
        user: null,
      };  

    case LOAD_USER_FAILURE:
      return {
      
        loading: false,
        isAuthenticated: false,
        user: null,
        error: action.payload  // Store the error message in the Redux state
        
       
      }; 

    case LOGOUT_FAILURE:
      return {
        ...state,
        error: action.payload
      };   


    case LOGIN_FAILURE:
    case REGISTER_USER_FAILURE:
    
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
        error:action.payload
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    
    
    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };


    default:
      return state;
  }
};

export default authReducer;
