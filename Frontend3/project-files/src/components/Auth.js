// Auth.js

export const isAuthenticated = () => {
    const token = localStorage.getItem('token');
    return token !== null && !isTokenExpired(token);
  };
  
  const isTokenExpired = (token) => {
    try {
      const decoded = decode(token);
      return decoded.exp < Date.now() / 1000;
    } catch (err) {
      return false;
    }
  };
  
  const decode = (token) => {
    return JSON.parse(atob(token.split('.')[1]));
  };
  