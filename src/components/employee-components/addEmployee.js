import axios from "axios";
import { Component } from "react";
import { connect } from "react-redux";
import {listDepartment,addDepartment} from '../../store/action/department';

export class AddEmployee extends Component{

    constructor(props) {
        super(props);
    
        this.state = {
            employee:{
                name: '',
                city: '',
                salary: 0,
                joiningDate: '',
                gender: '',
                departmentID: '',
                username: '',
                password: '',
                role: 'EMPLOYEE'  
            },
            errors: {},
            msg: '',
            departments:[]
        };
      }

    componentDidMount(){
        //fetch all departments: call action
        //this.props.listDepartment();
    }  

    render(){
        return(
            <div>
            <div className="card">
              <h5 className="card-header">Add Employee</h5>
              <div className="card-body">
                <h5 className="card-title">Enter Employee Info: </h5>
                <p className="card-text">
                <span>{this.state.msg}</span> <br />
                   <label>Employee Name: </label>
                   <input type="text" 
                            name="name"
                            value={this.state.employee.name}
                            onChange={this.changeHandler} />
                            <span style={{ color : 'red'}}>{this.state.errors['name']}</span>
                    <br /><br />
                    <label>Employee City: </label>
                    <input type="text" 
                            name="city"
                            value={this.state.employee.city}
                            onChange={this.changeHandler} />
                            <span style={{ color : 'red'}}>{this.state.errors['city']}</span>
                    <br /><br />
                    <label>Employee Salary: </label>
                    <input type="number" 
                            name="salary"
                            value={this.state.employee.salary}
                            onChange={this.changeHandler} />
                            <span style={{ color : 'red'}}>{this.state.errors['salary']}</span>
                    <br /><br />
                    <label>Joining Date: </label>
                    <input type="date" 
                            name="joiningDate"
                            value={this.state.employee.joiningDate}
                            onChange={this.changeHandler} />
                            <span style={{ color : 'red'}}>{this.state.errors['joiningDate']}</span>
                    <br /><br />
                    <label>Select Gender: </label>
                    <select name="gender" 
                            value={this.state.employee.gender} 
                            onChange={this.changeHandler} >
                        <option key={0} value="">--Select Gender--</option>
                        <option key={1} value="MALE">MALE</option>
                        <option key={2} value="FEMALE">FEMALE</option>
                    </select>
                    <span style={{ color : 'red'}}>{this.state.errors['gender']}</span>
                    <br /><br />
                    <label>Select Department: </label>
                    <select name="departmentID" 
                            value={this.state.employee.departmentID} 
                            onChange={this.changeHandler} > 
                             <option key={0} value="">--Select Department--</option>
                        {  this.props.dept.list.map(d=>(
                           
                            <option key={d.id} value={d.id}>{d.name}</option>
                            
                        ))  }
                         
                    </select>
                    <span style={{ color : 'red'}}>{this.state.errors['departmentId']}</span>
                    <br /><br />
                    
                    <label>Username: </label>
                    <input type="text" 
                            name="username"
                            value={this.state.employee.username}
                            onChange={this.changeHandler} />
                            <span style={{ color : 'red'}}>{this.state.errors['username']}</span>
                            <br /><br />
                    <label>Password: </label>
                    <input type="password" 
                            name="password"
                            value={this.state.employee.password}
                            onChange={this.changeHandler} />
                            <span style={{ color : 'red'}}>{this.state.errors['password']}</span>
                            <br /><br />
                    <button onClick={this.onAdd} className="btn btn-primary">Add Employee</button>
                </p>
                 
              </div>
            </div>
          </div>
        );
    }

    changeHandler= (event) =>{
        this.setState({
            employee: {
                ...this.state.employee, 
                [event.target.name] : event.target.value
            }
        });
}

onAdd = ()=>{
    /* Validate User inputs */
    if(this.handleValidation()){
        console.log(this.state.employee);
        /* Call the API */
       this.postEmployee(this.state.employee);
    }
    else{
        /* Display error messages */
        console.log('validation not passed..');     
    }
}

handleValidation(){
    let name = this.state.employee.name;
    let city = this.state.employee.city;
    let salary = this.state.employee.salary;
    let joiningDate = this.state.employee.joiningDate;
    let gender = this.state.employee.gender;
    let departmentId = this.state.employee.departmentID;
    let username = this.state.employee.username;
    let password = this.state.employee.password;
     
    let tempErrors={}
    let formValid = true; 

    if(!name){ //If name is not given
        formValid = false;
        tempErrors['name']='Employee Name cannot be empty';
    }
    if(!city){ //If name is not given
        formValid = false;
        tempErrors['city']='Employee city cannot be empty';
    }
    if(!salary){ //If name is not given
        formValid = false;
        tempErrors['salary']='Employee Salary cannot be empty';
    }
    if(!joiningDate){ //If name is not given
        formValid = false;
        tempErrors['joiningDate']='Please select employee joining date';
    }
    if(!gender){ //If name is not given
        formValid = false;
        tempErrors['gender']='Please select employee gender';
    }
    if(!departmentId){ //If name is not given
        formValid = false;
        tempErrors['departmentId']='Please select department ID';
    }
    if(!username){ //If name is not given
        formValid = false;
        tempErrors['username']='Please enter username';
    }
    if(!password){ //If name is not given
        formValid = false;
        tempErrors['password']='Please enter password';
    }
    this.setState({
        errors: tempErrors
    });

    return formValid; 
}

async postEmployee(e){
    let emp = {
        name: e.name,
        city: e.city,
        salary: e.salary,
        joiningDate: e.joiningDate,
        gender: e.gender,
        user: {
            username: e.username,
            password: e.password,
            role: 'EMPLOYEE'
        }       
    }
    try {
        const response = axios.post("http://localhost:8585/api/employee/add/" + e.departmentID, emp);
        const data = (await response).data;
        console.log('API success');
        console.log(data);
        this.setState({
            msg: "Employee Registered"
        })
        this.props.addEmployee(data);
      } catch (error) {
        this.setState({
            msg: 'Operation Failed'
        })
      }
}
}


function mapStateToProps(state){
    return {
        dept : []
    }    
}

export default connect(mapStateToProps, {listDepartment,addDepartment})(AddEmployee); 