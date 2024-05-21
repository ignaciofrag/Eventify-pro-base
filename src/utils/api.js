export function authHeader() {
  const token = localStorage.getItem('userToken');
  return token ? { 'Authorization': `Bearer ${token}` } : {};
}

export async function fetchWithAuth(url, options = {}) {
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        ...authHeader(),
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      if (response.status === 401) {
        localStorage.removeItem('userToken');
        localStorage.removeItem('user');
        window.location.href = '/login';  // Redirige al login si es necesario
      }
      const error = await response.json();
      throw new Error(error.message);
    }

    return response.json(); // Convertir la respuesta en JSON
  } catch (error) {
    return Promise.reject(error);
  }
}
