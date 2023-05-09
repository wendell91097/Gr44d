import { useState, useEffect } from 'react';

export const useToken = (defaultToken: string) => {
  const [token, setTokenState] = useState<string>(() => {
    const storedToken = localStorage.getItem('userToken');
    return storedToken !== null ? storedToken : defaultToken;
  });

  const setToken = (newToken: string) => {
    setTokenState(newToken);
    localStorage.setItem('userToken', newToken);
  };

  const saveToken = (newToken: string) => {
    const storedTokens = localStorage.getItem('userTokens');
    if (storedTokens) {
      const tokens = JSON.parse(storedTokens);
      tokens.push(newToken);
      localStorage.setItem('userTokens', JSON.stringify(tokens));
    } else {
      localStorage.setItem('userTokens', JSON.stringify([newToken]));
    }
  };

  const deleteToken = () => {
    setTokenState(defaultToken);
    localStorage.removeItem('userToken');
  };

  return { token, setToken, saveToken, deleteToken };
}

