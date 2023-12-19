import React, { createContext, useContext, useState } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

const SessionContext = createContext();

function SessionProvider({ children }) {
  const [session, setSession] = useState({
    Id: null,
    userId: null,
    soloParentFormId: null,
    name: null,
  });

  const setSessionData = (data) => {
    setSession((prevSession) => ({ ...prevSession, ...data }));
  };

  const clearSession = () => {
    setSession({
      Id: null,
      userId: null,
      soloParentFormId: null,
      name: null,
    });
  };

  const { pathname } = useLocation();

  // Function to check if the session is null
  const isSessionValid = () => {
    return session.Id !== null; // Adjust the condition based on your session structure
  };

  return (
    <SessionContext.Provider value={{ session, setSessionData, clearSession }}>
      {children}
      {!isSessionValid() && !pathname.includes("/register") && !pathname.includes("/") && <Navigate to="/login" />}
    </SessionContext.Provider>
  );
}

export const useSession = () => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error("useSession must be used within a SessionProvider");
  }
  return context;
};

export default SessionProvider;
