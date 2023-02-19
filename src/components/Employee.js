import { Component } from "react";
import { connect } from "react-redux";
 
import { AddEmployee } from "./employee-components/addEmployee";
import Department from "./employee-components/department";
import EmployeeList from "./employee-components/employeeList";
import { listDepartment } from "../store/action/department";
import Login from "./auth/login";
import AddProject from "./employee-components/addProject";
import ViewProject from "./employee-components/viewProject";

export  class Employee extends Component {
  constructor(props) {
    super(props);

    this.state = {
      componentNum: 0,
      isLoggedIn: false
    };
  }
 
  componentDidMount(){
    this.props.listDepartment();
    let username = localStorage.getItem('username');
     
    if(username === null || username === undefined) 
          this.setState({isLoggedIn: false})
    else
          this.setState({isLoggedIn: true})
  }
  render() { 
    
    return (
      !this.state.isLoggedIn?<div ><Login /></div>  : 
      <div className="container-fliud">
        <div className="row">
          <div className="col-sm-3">
            <ul className="list-group">
              <li className=" list-group-item"> <button   className="list-group-item employee-sidebar" onClick={()=>{
                this.setState({componentNum : 1})
              }} > Show all Employees </button> </li>
              <li className="list-group-item">
                <button  className=" list-group-item employee-sidebar" 
                onClick={()=>(this.setState({componentNum : 2}))}>
                   Add Department</button></li>
                   <li className="list-group-item">
                <button  className=" list-group-item employee-sidebar" 
                onClick={()=>(this.setState({componentNum : 3}))}>
                   Add Employee</button></li>
                   <li className="list-group-item">
                <button  className=" list-group-item employee-sidebar" 
                onClick={()=>(this.setState({componentNum : 4}))}>
                   Add Project</button></li>
              
              <li className="list-group-item">Assign Employee to Project</li>
              <li className="list-group-item">
                <button  className=" list-group-item employee-sidebar" 
                onClick={()=>(this.setState({componentNum : 5}))}>
                   View Project</button></li>
              {/* <li className="list-group-item">Show all Projects</li> */}
            </ul>
          </div>
          <div className="col-lg-9">
              {this.state.componentNum === 1?
                  <EmployeeList />:this.state.componentNum === 2?
                  <Department />:this.state.componentNum === 3?<AddEmployee dept={this.props.dept}/>
                  :this.state.componentNum === 4?<AddProject/>:<ViewProject/>
                  }
          </div> 
        </div>
      </div>
    );
  }
};
function mapStateToProps(state){
  return {
      dept : state.department
  }    
}
export default connect(mapStateToProps, {listDepartment })(Employee); 

 