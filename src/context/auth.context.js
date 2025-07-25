import { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import React from 'react';

const AuthContext = createContext({
  user: null,
  error: null,
  isLoggedIn: false,
});

function useAuth() {
  return useContext(AuthContext);
}

function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  React.useEffect(() => {
    async function fetchUser() {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_BASE_URL}/user/me`,
          {
            withCredentials: true,
          }
        );
        if (response.data && response.data.user) {
          setUser(response.data.user);
          setIsLoggedIn(true);
        } else {
          setUser(null);
          setIsLoggedIn(false);
        }
      } catch (error) {
        setUser(null);
        setIsLoggedIn(false);
      }
    }
    fetchUser();
  }, []);

  async function login(user) {
    setIsLoggedIn(true);
    setUser(user);
    navigate('/');
  }

  async function logout() {
    await axios.post(`${process.env.REACT_APP_AUTH_BASE_URL}/auth/logout`);
    setIsLoggedIn(false);
    setUser(null);
    navigate('/login');
  }

  const value = {
    login,
    logout,
    user,
    isLoggedIn,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export { AuthProvider, useAuth };
