const defaultState = null;

const reducer = (state = defaultState, {type,payload}) => {
    switch(type){
	case 'login' : {
	    return payload
	}
	case 'logout' : {
	   return null 
	}
	default:
	   return state;  
    }
}

export default reducer;