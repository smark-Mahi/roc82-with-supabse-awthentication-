"use client";
import { getLoggername } from "../helpers/token";
import React, { createContext, useContext, useState } from "react";

const GlobalStatesContext = createContext();
export const GetStatesGlobally = ({ children }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const username = getLoggername();

  return (
    <GlobalStatesContext.Provider
      value={{
        name,
        email,
        password,
        setEmail,
        setName,
        setPassword,
        loading,
        setLoading,
        username,
      }}
    >
      {children}
    </GlobalStatesContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalStatesContext);
};
