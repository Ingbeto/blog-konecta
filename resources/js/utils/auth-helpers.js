const TOKEN_KEY = 'BLOG_TOKEN';

export const setToken = token => {
  window.localStorage.setItem(TOKEN_KEY, token);
}

export const getToken = () => {
   const token = window.localStorage.getItem(TOKEN_KEY);
   return token;
}

export const removeToken = () => {
  window.localStorage.removeItem(TOKEN_KEY);
}
