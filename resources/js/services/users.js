import Axios from 'axios';

export const getUsers = async () => {
 const {data} = await Axios.get('api/users');
 return data;  
}

export const destroyUser = async (id) => {
  const {data} = await Axios.delete('api/users/' + id);
  return data;
}

export const createUser = async (values) => {
  const {data} = await Axios.post('api/users', values);
  return data;
}

export const updateUser = async (values) => {
  const {data} = await Axios.put('api/users/'+values.id,values);
  return data;
}
