export const listDepartment= () => (dispatch) =>{
    fetch('http://localhost:8585/api/department/all')
    .then(response=> response.json())
    .then(data=> dispatch({type: 'GET_LIST_DEPARTMENT',payload: data}) )
}

 export  const  addDepartment = (data) => {
     
    return {
        type: 'ADD_DEPARTMENT',
        payload: data
    }
}

 

