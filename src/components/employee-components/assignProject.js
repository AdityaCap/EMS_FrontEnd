import axios from "axios";
import { Component } from "react";
import { connect } from "react-redux";
import {assignProject} from '../../store/action/assignProject';

export class AssignProject extends Component{

    constructor(props) {
        super(props);
    
        this.state = {
            assignProject :{
                empId: 0,
                proId: 0,
            },
            errors: {},
            msg: '',
            
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
              <h5 className="card-header">Assign Project to Employee</h5>
              <div className="card-body">
                <h5 className="card-title">Enter Info: </h5>
                <p className="card-text">
                <span>{this.state.msg}</span> <br />
                   <label>Employee Id: </label>
                   <input type="number" 
                            name="empId"
                            value={this.state.assignProject.empId}
                            onChange={this.changeHandler} />
                            <span style={{ color : 'red'}}>{this.state.errors['empId']}</span>
                    <br /><br />
                    <label>Project Id: </label>
                    <input type="number" 
                            name="proId"
                            value={this.state.assignProject.proId}
                            onChange={this.changeHandler} />
                            <span style={{ color : 'red'}}>{this.state.errors['proId']}</span>
                    <br /><br />
                    <button onClick={this.onAdd} className="btn btn-primary">Submit</button>
                </p>
                 
              </div>
            </div>
          </div>
        );
    }

    changeHandler= (event) =>{
        this.setState({
            assignProject: {
                ...this.state.assignProject, 
                [event.target.name] : event.target.value
            }
        });
}

onAdd = ()=>{
    /* Validate User inputs */
    if(this.handleValidation()){
        console.log(this.state.assignProject);
        /* Call the API */
       this.postProject(this.state.assignProject);
    }
    else{
        /* Display error messages */
        console.log('validation not passed..');     
    }
}

handleValidation(){
    let empId = this.state.assignProject.empId;
    let proId = this.state.assignProject.proId;
     
    let tempErrors={}
    let formValid = true; 

    if(!empId){ //If title is not given
        formValid = false;
        tempErrors['empId']='Employee Id cannot be empty';
    }
   
    if(!proId){ //If name is not given
        formValid = false;
        tempErrors['proId']='Project Id cannot be empty';
    }
   
    this.setState({
        errors: tempErrors
    });

    return formValid; 
}

async postProject(p){
    
    try {
        const response = axios.post(`http://localhost:8585/api/employee/project/${this.state.assignProject.empId}/${this.state.assignProject.proId}`);
        const data = (await response).data;
        console.log('API success');
        console.log(data);
        this.setState({
            msg: "Project Assigned"
        })
        this.props.addProject(data);
      } catch (error) {
        this.setState({
            msg: 'Operation'
        })
      }
}
}


function mapStateToProps(state){
    return {
        dept : []
    }    
}

export default connect(mapStateToProps, {assignProject})(AssignProject);