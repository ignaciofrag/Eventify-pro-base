/*export const fetchWithAuth = async (url, options = {}) => {
  const token = localStorage.getItem('userToken');
  const response = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });

  if (!response.ok) {
    if (response.status === 401) {
      localStorage.removeItem('userToken');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    const error = await response.json();
    throw new Error(error.message);
  }

  return response.json();  // Aquí convertimos la respuesta en JSON
};
*/