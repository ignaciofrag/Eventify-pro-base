export function authHeader() {
    const token = localStorage.getItem('token');
    return token ? { 'Authorization': `Bearer ${token}` } : {};
  }
  
  export async function fetchProtectedData(url) {
    try {
      const response = await fetch(url, {
        headers: authHeader()
      });
      const data = await response.json();
      return response.ok ? data : Promise.reject(data);
    } catch (error) {
      return Promise.reject(error);
    }
  }
  