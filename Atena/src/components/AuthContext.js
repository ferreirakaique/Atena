import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const STORAGE_KEY = "@athena_usuario";

  useEffect(() => {
    // Quando o app inicia, tenta restaurar sessão
    (async () => {
      const raw = await AsyncStorage.getItem(STORAGE_KEY);
      if (raw) setUsuario(JSON.parse(raw));
    })();
  }, []);

  const login = async (usuarioData) => {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(usuarioData));
    setUsuario(usuarioData);
  };

  const logout = async () => {
    await AsyncStorage.removeItem(STORAGE_KEY);
    setUsuario(null);
  };

  return (
    <AuthContext.Provider value={{ usuario, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
