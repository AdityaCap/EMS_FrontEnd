const initialState= {
    list: []
};

const department = (state =initialState, action)=>{

    //payload object(todo) will get added in list
    if(action.type === 'ADD_DEPARTMENT'){
        return {...state,  list : [...state.list, action.payload]}
    }
    else
    if(action.type === 'GET_LIST_DEPARTMENT'){
        return {...state, list: action.payload}
    }
    return state;
};

export default department; 