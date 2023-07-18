import React, { createContext, useReducer, useEffect } from "react";
import jwtDecode from "jwt-decode";

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

if (typeof window !== "undefined") {
  if (localStorage.getItem("jwtToken")) {
    const decodedToken = jwtDecode(localStorage.getItem("jwtToken"));

    if (decodedToken.exp * 1000 < Date.now()) {
      localStorage.removeItem("jwtToken");
    } else {
      initialState.user = {
        id: decodedToken.user_id,
        name: decodedToken.username,
        token: localStorage.getItem("jwtToken")
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

    localStorage.setItem("jwtToken", token);
    dispatch({
      type: "LOGIN",
      payload: {
        id: user_id,
        name: username,
      },
    });
  }

  function logout() {
    localStorage.removeItem("jwtToken");
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
