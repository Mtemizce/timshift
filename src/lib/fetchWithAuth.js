export async function fetchWithAuth(url, options = {}) {
    const admin = JSON.parse(localStorage.getItem('admin'));
    const headers = {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
      'Authorization': JSON.stringify(admin),
    };
  
    const config = {
      ...options,
      headers,
    };
  
    const res = await fetch(url, config);
    return res;
  }
  