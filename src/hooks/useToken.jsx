import { useEffect, useState } from 'react';

const useToken = () => {
  const [token, setToken] = useState(null);
  const [tokenLoaded, setTokenLoaded] = useState(false);

  const getTokenFromLS = () => {
    const token = localStorage.getItem('token-demo');
    setToken(token);
    setTokenLoaded(true);
  };

  useEffect(() => {
    getTokenFromLS();
  }, []);

  return { token, tokenLoaded };
};

export default useToken;
