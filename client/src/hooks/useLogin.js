import { useAuth } from '../contexts/AuthContext';
import { useState } from 'react';

export const useLogin = () => {
  const { dispatch } = useAuth();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.error);
        setLoading(false);
      }
      if (response.ok) {
        //save user to local storage
        localStorage.setItem('user', JSON.stringify(data));
        // update auth  context
        dispatch({ type: 'LOGIN', payload: data });
        setLoading(false);
      }
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return { login, error, loading };
};
