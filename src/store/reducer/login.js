const initialState= {
    user: {}
};

const login = (state =initialState, action)=>{
    //payload object(todo) will get added in list
    if(action.type === 'LOGIN'){
        return {...state,  user: action.payload}
    }
    return state;
};

export default login; 
