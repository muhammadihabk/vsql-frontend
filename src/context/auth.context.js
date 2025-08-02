import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

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
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      setLoading(true);

      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_BASE_URL}/user/me`,
          {
            withCredentials: true,
          }
        );
        if (response.data && response.data.user) {
          setUser(response.data.user);
        } else {
          setUser(null);
        }
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  }, []);

  async function login(user) {
    setUser(user);
    navigate('/build');
  }

  async function logout() {
    await axios.post(`${process.env.REACT_APP_AUTH_BASE_URL}/auth/logout`);
    setUser(null);
    navigate('/login');
  }

  const value = {
    login,
    logout,
    user,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export { AuthProvider, useAuth };
