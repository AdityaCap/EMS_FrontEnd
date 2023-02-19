export const listProject= () => (dispatch) =>{
    fetch('http://localhost:8585/api/project/all')
    .then(response=> response.json())
    .then(data=> dispatch({type: 'GET_LIST_PROJECT',payload: data}) )
}

export const addProject = (data) => {
    return {
        type: 'ADD_PROJECT',
        payload: data
    }
}