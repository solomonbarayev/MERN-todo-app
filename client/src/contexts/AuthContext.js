import { createContext, useReducer, useContext, useEffect } from 'react';

//get localStorage user
const getUserFromLocalStorage = () => {
  return localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user'))
    : null;
};

export const AuthContext = createContext();

export const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        user: action.payload,
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [authState, dispatch] = useReducer(authReducer, {
    user: null,
  });

  useEffect(() => {
    const user = getUserFromLocalStorage();
    dispatch({ type: 'LOGIN', payload: user });
  }, []);

  console.log('AuthProvider: authState: ', authState);

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

//custom hook
export const useAuth = () => {
  return useContext(AuthContext);
};
