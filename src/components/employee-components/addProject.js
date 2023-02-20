import axios from "axios";
import { Component } from "react";
import { connect } from "react-redux";
import {addProject} from '../../store/action/project';

export class AddProject extends Component{

    constructor(props) {
        super(props);
    
        this.state = {
            project :{
                title: '',
                credits: 0,
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
              <h5 className="card-header text-center mb-0 fw-bold fs-5">Add Project</h5>
              <form>
              <div className="card-body  p-0 p-sm-1">
                <h5 className="card-title">Enter Project Info: </h5>
                <p className="card-text">
                <span>{this.state.msg}</span> <br />
                   <label className="form-label">Project Title: </label>
                   <input type="text" 
                            name="title" className="form-control form-control-sm"
                            value={this.state.project.title}
                            onChange={this.changeHandler} />
                            <span style={{ color : 'red'}}>{this.state.errors['title']}</span>
                    <br />
                    <label className="form-label">Project Credits: </label>
                    <input type="number" 
                            name="credits" className="form-control form-control-sm"
                            value={this.state.project.credits}
                            onChange={this.changeHandler} />
                            <span style={{ color : 'red'}}>{this.state.errors['credits']}</span>
                    <br />
                    <button onClick={this.onAdd} className="btn btn-primary">Add Project</button>
                </p>
                 
              </div>
              </form>
            </div>
          </div>
        );
    }

    changeHandler= (event) =>{
        this.setState({
            project: {
                ...this.state.project, 
                [event.target.name] : event.target.value
            }
        });
}

onAdd = ()=>{
    /* Validate User inputs */
    if(this.handleValidation()){
        console.log(this.state.project);
        /* Call the API */
       this.postProject(this.state.project);
    }
    else{
        /* Display error messages */
        console.log('validation not passed..');     
    }
}

handleValidation(){
    let title = this.state.project.title;
    let credits = this.state.project.credits;
     
    let tempErrors={}
    let formValid = true; 

    if(!title){ //If title is not given
        formValid = false;
        tempErrors['title']='Project title cannot be empty';
    }
   
    if(!credits){ //If name is not given
        formValid = false;
        tempErrors['credits']='Project Credits cannot be empty';
    }
   
    this.setState({
        errors: tempErrors
    });

    return formValid; 
}

async postProject(p){
    let pro = {
        title: p.title,
        credits: p.credits ,     
    }
    try {
        const response = axios.post("http://localhost:8585/api/project" , pro);
        const data = (await response).data;
        console.log('API success');
        console.log(data);
        this.setState({
            msg: "Project Added"
        })
        this.props.addProject(data);
      } catch (error) {
        this.setState({
            msg: ''
        })
      }
}
}


function mapStateToProps(state){
    return {
        dept : []
    }    
}

export default connect(mapStateToProps, {addProject})(AddProject);