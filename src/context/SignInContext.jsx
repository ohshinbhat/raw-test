import React, { useContext, useState, useEffect } from "react";

export const SignInLvlContext = React.createContext();

export function useSignIn() {
  return useContext(SignInLvlContext);
}

export const SignInLvlContextProvider = ({ children }) => {
  const [signIn, setSignIn] = useState(false);

  const value = { signIn, setSignIn };

  return (
    <SignInLvlContext.Provider value={value}>
      {children}
    </SignInLvlContext.Provider>
  );
};
