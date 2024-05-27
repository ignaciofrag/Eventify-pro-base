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
        window.location.href = '/login'; // Redirige al login si es necesario
      }

      const errorText = await response.text();
      throw new Error(errorText || 'Error inesperado');
    }

    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      return await response.json();
    } else {
      return await response.text();
    }
  } catch (error) {
    console.error('fetchWithAuth error:', error.message);
    throw new Error(error.message || 'Error de red');
  }
}
