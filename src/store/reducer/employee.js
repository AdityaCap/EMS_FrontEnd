const initialState= { 
    list: []
};

const employee = (state =initialState, action)=>{

    if(action.type === 'GET_LIST_EMPLOYEE'){
        return {...state, list: action.payload}
    }
    //payload object(employee) will get added in list
    if(action.type === 'ADD_EMPLOYEE'){
        return {...state,  list : [...state.list, action.payload]}
    }
    return state;
};

export default employee; 