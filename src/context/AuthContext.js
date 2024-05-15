import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('userToken');
    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (loginData) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("http://localhost:5500/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData)
      });
      const data = await response.json();
      if (response.ok) {
        if (loginData.rememberMe) {
          localStorage.setItem('userToken', data.access_token);
          localStorage.setItem('user', JSON.stringify(data.user));
        } else {
          sessionStorage.setItem('userToken', data.access_token);
          sessionStorage.setItem('user', JSON.stringify(data.user));
        }
        setUser({
          ...data.user,
          isAuthenticated: true
        });
        setIsLoading(false);
        return { success: true, role: data.user.role, token: data.access_token };
      } else {
        setError(data.msg || 'Failed to log in');
        setIsLoading(false);
        return { success: false };
      }
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
      return { success: false };
    }
  };

  const logout = () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('user');
    setUser(null);
  };

  const updateUser = (updatedUser) => {
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, error, login, logout, setUser, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};