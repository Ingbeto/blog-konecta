import axios from 'axios';

export const login = async credentials => {
   const {data} =  await axios.post('/api/auth/login',credentials);
   return data;
}

export const whoami = async () => {
   const {data} = await axios.post('/api/auth/user');
   return data;
}

export const logout = async () => {
   const {data} = await axios.post('/api/auth/logout');
   return {data}
}

export const register = async (values) => {
   const {data} = await axios.post('/api/auth/register', values);
   return data;
};