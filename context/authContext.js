import React, { createContext, useReducer, useEffect } from "react";
import jwtDecode from "jwt-decode";
import Cookies from 'js-cookie';

function authReducer(state, action) {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: {
          id: action.payload.id,
          username: action.payload.username,
          ...action.payload,
        },
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
}

const initialState = {
  user: null,
};

function isValidJwt(jwtToken) {
  if (!jwtToken) {
    return false;
  }

  const jwtParts = jwtToken.split('.');
  return jwtParts.length === 3;
}


if (Cookies.get('jwtToken')) {
  const token = Cookies.get('jwtToken');
  
  // check if token exists, is not null and has a valid JWT structure
  if (isValidJwt(token)) {
    const decodedToken = jwtDecode(token);

    if (decodedToken.exp * 1000 < Date.now()) {
      Cookies.remove("jwtToken");
    } else {
      initialState.user = {
        id: decodedToken.user_id,
        name: decodedToken.username,
        token: Cookies.get('jwtToken')
      };
    }
  }
}


const AuthContext = createContext({
  user: null,
  login: (userData) => {},
  logout: () => {},
});

function AuthProvider(props) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  function login(userData) {
    const { user_id, username, token } = userData;

    Cookies.set("jwtToken", token);
    dispatch({
      type: "LOGIN",
      payload: {
        id: user_id,
        name: username,
      },
    });
  }

  function logout() {
    Cookies.remove("jwtToken");
    dispatch({ type: "LOGOUT" });
  }

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        login,
        logout,
      }}
      {...props}
    />
  );
}

export { AuthContext, AuthProvider };

