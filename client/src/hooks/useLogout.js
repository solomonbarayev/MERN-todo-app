import { useAuth } from '../contexts/AuthContext';

export const useLogout = () => {
  const { dispatch } = useAuth();
  const logout = () => {
    //remove user from storage
    console.log('useLogout: logout: ');
    localStorage.removeItem('user');

    //update auth context
    dispatch({ type: 'LOGOUT' });
  };
  return { logout };
};
