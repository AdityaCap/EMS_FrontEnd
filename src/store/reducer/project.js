const initialState= {
    list: []
};

const project= (state =initialState, action)=>{

    //payload object(todo) will get added in list
    if(action.type === 'ADD_PROJECT'){
        return {...state,  list : [...state.list, action.payload]}
    }
    else
    if(action.type === 'GET_LIST_PROJECT'){
        return {...state, list: action.payload}
    }
    return state;
};

export default project; 