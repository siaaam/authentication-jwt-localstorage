import axios from 'axios';
import { useEffect } from 'react';
import { useState, createContext } from 'react';
import useToken from '../hooks/useToken';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { token, tokenLoaded } = useToken();

  console.log(token);
  const [user, setUser] = useState(null);

  const loadUser = async () => {
    try {
      const res = await axios.get('http://localhost:1337/api/users/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res.data);
      const { id, email, username } = res.data;
      setUser({ id, email, username });
    } catch (err) {
      console.log(err);
      console.log(err.response);
    }
  };

  useEffect(() => {
    if (tokenLoaded) {
      loadUser();
    }
  }, [tokenLoaded]);

  const saveAuthInfo = (userInfo) => {
    const jwt = userInfo.jwt;
    localStorage.setItem('token-demo', jwt);
    const userDetails = userInfo.user;
    const { id, username, email } = userDetails;

    setUser({
      id,
      email,
      username,
      user,
    });
  };

  const removeToken = () => {
    localStorage.removeItem('token-demo');
    setUser(null);
  };

  const value = { saveAuthInfo, removeToken, user };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
