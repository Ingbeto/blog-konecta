export const type = 'login';

const login = (user) => {
   return {
	type,
	payload: user
   }
}

export default login;