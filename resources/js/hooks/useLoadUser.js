import {useEffect} from 'react';
import {getToken} from '../utils/auth-helpers';
import { whoami } from '../services/login';
import login from '../redux/actions/login';
import { useDispatch } from 'react-redux';

function useLoadUser() {

    const dispatch = useDispatch();

    useEffect(() => {
        let isMounted = true;
        const loadUser = async () =>{
            if(!getToken()){
                return;
            }
            try{
               const {user} = await whoami(); 
               if(isMounted) dispatch(login(user));
            }catch(error) {
                alert(error);
            }
        }
        loadUser();
        return () => {isMounted = false}
    }, []);
    

}

export default useLoadUser; 