import React, { createContext, useEffect, useReducer } from 'react';
import jwtDecode from 'jwt-decode';
import axios from 'axios.js';
import { MatxLoading } from 'app/components';
import { useNavigate } from 'react-router-dom';

const initialState = {
  isAuthenticated: false,
  isInitialised: false,
  user: null,
};

const isValidToken = (accessToken) => {
  if (!accessToken) {
    return false;
  }

  const decodedToken = jwtDecode(accessToken);
  const currentTime = Date.now() / 1000;
  return decodedToken.exp > currentTime;
};

const setSession = (accessToken, roleName, userName, roleCode, userId, branchName, branchId) => {
  if (accessToken) {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('roleName', roleName);
    localStorage.setItem('userName', userName);
    localStorage.setItem('roleCode', roleCode);
    localStorage.setItem('userId', userId);
    localStorage.setItem('branchName', branchName);
    localStorage.setItem('branchId', branchId);
    axios.defaults.headers = { accessToken };
  } else {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('roleName');
    localStorage.removeItem('userName');
    localStorage.removeItem('roleCode');
    localStorage.removeItem('userId');
    localStorage.removeItem('branchName');
    localStorage.removeItem('branchId');
    delete axios.defaults.headers;
  }
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'INIT': {
      const { isAuthenticated, user } = action.payload;

      return {
        ...state,
        isAuthenticated,
        isInitialised: true,
        user,
      };
    }
    case 'LOGIN': {
      const { user } = action.payload;

      return {
        ...state,
        isAuthenticated: true,
        user,
      };
    }
    case 'LOGOUT': {
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    }
    case 'REGISTER': {
      const { user } = action.payload;

      return {
        ...state,
        isAuthenticated: true,
        user,
      };
    }
    default: {
      return { ...state };
    }
  }
};

const AuthContext = createContext({
  ...initialState,
  method: 'JWT',
  login: () => Promise.resolve(),
  logout: () => { },
  register: () => Promise.resolve(),
});
// Login For Dashboard 08/11/2022 Rohit
export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(reducer, initialState);

  const login = async (userName, password) => {
    // http://43.204.38.243:3000/api/userLogin
    const response = await axios.post('https://43.204.38.243:3001/api/userLogin', {
      userName,
      password,
    });
    const { message, accessToken, roleName, user, roleCode, userId, branchName, branchId } = response.data;
    setSession(accessToken, roleName, userName, roleCode, userId, branchName, branchId);
    dispatch({
      type: 'LOGIN',
      payload: {
        user,
      },
    });
    if (message != 'Invalid User Details') {
      navigate('/');
    } else {
      navigate('/session/404');
    }
  };

  const register = async (email, username, password) => {
    const response = await axios.post('/api/auth/register', {
      email,
      username,
      password,
    });

    const { accessToken, user } = response.data;

    setSession(accessToken);

    dispatch({
      type: 'REGISTER',
      payload: {
        user,
      },
    });
  };

  const logout = () => {
    setSession(null);
    dispatch({ type: 'LOGOUT' });
  };

  useEffect(() => {
    (async () => {
      try {
        const accessToken = window.localStorage.getItem('accessToken');
        const roleName = window.localStorage.getItem('roleName');
        const userName = window.localStorage.getItem('userName');
        const roleCode = window.localStorage.getItem('roleCode');
        const userId = window.localStorage.getItem('userId');
        const branchName = window.localStorage.getItem('branchName');
        const branchId = window.localStorage.getItem('branchId');
        // If we refresh the page also we will be on the same page.
        // Date 08/11/2022 [Rohit Jaiswal]
        if (accessToken && isValidToken(accessToken)) {
          setSession(accessToken, roleName, userName, roleCode, userId, branchName, branchId);
          const response = await axios.get('/');
          const { user } = response.data;

          dispatch({
            type: 'INIT',
            payload: {
              isAuthenticated: true,
              user,
            },
          });
        } else {
          dispatch({
            type: 'INIT',
            payload: {
              isAuthenticated: false,
              user: null,
            },
          });
        }
      } catch (err) {
        console.error(err);
        dispatch({
          type: 'INIT',
          payload: {
            isAuthenticated: false,
            user: null,
          },
        });
      }
    })();
  }, []);

  if (!state.isInitialised) {
    return <MatxLoading />;
  }

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: 'JWT',
        login,
        logout,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
