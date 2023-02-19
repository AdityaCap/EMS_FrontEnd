const initialState= {
    list: []
};

const assignProject= (state =initialState, action)=>{

    //payload object(todo) will get added in list
    if(action.type === 'ASSIGN_PROJECT'){
        return {...state,  list : [...state.list, action.payload]}
    }
    
    return state;
};

export default assignProject;