/*
// export const fetchWithAuth = async (url, options = {}) => {
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
      // Manejo de errores, por ejemplo, invalidar el token y redirigir al login si es necesario
      if (response.status === 401) {
        // Aquí puedes realizar un logout o redirigir al usuario al login
        localStorage.removeItem('userToken');
        localStorage.removeItem('user');
        window.location.href = '/login';  // o una ruta específica de tu aplicación
      }
      const error = await response.json();
      throw new Error(error.message);
    }
  
    return response.json();
  }; //
*/