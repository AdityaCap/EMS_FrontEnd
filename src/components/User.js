import { Component } from "react";

export default class User extends Component{

    constructor(){
        super();

        this.state={
            users: []
        }
    }

    componentDidMount(){
         fetch('https://jsonplaceholder.typicode.com/users')
         .then(response=>response.json())
         .then(data=>{
             this.setState({
                users : data
             });
         })
    }

    render(){
        return (
          <div>
            <h1>User List</h1>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  <th scope="col">Username</th>
                  <th scope="col">Email</th>
                </tr>
              </thead>
              <tbody>
                {this.state.users.map((u) => (
                  <tr key={u.id}>
                    <th scope="row">{u.id}</th>
                    <td>{u.name}</td>
                    <td>{u.username}</td>
                    <td>{u.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
    }
}