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
      try {
        setUser({ ...JSON.parse(storedUser), isAuthenticated: true });
      } catch (e) {
        console.error('Error parsing stored user data:', e);
        localStorage.removeItem('user');
        localStorage.removeItem('userToken');
      }
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
        localStorage.setItem('userToken', data.access_token);
        localStorage.setItem('user', JSON.stringify(data.user));
        setUser({ ...data.user, isAuthenticated: true });
        setIsLoading(false);
        return { success: true, role: data.user.profile.role, token: data.access_token };
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

  const updateUser = (updatedUserData) => {
    setUser({ ...updatedUserData, isAuthenticated: true });
    localStorage.setItem('user', JSON.stringify(updatedUserData));
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, error, login, logout, setUser, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};
