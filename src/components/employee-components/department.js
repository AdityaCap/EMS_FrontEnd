import axios from "axios";
import { Component } from "react";
import { connect } from "react-redux";
import {addDepartment} from '../../store/action/department';

export class Department extends Component {
  constructor(props) {
    super(props);

    this.state = {
        department:{
            name: ''
        },
        errors: {},
        msg: ''
    };
  }

  render() {
    return (
      <div>
        <div className="card ">
          <h5 className="card-header text-center mb-0 fw-bold fs-5">Add Department</h5>
          <form>
          <div className="card-body p-5 p-sm-10">
            <h5 className="card-title">Enter Department Info: </h5>
            <p className="card-text">
            <span>{this.state.msg}</span> <br />
               <label className="form-label">Department Name: </label>
               <input type="text" name="name" className="form-control form-control-lg" value={this.state.department.name} onChange={this.changeHandler} />
                        <span style={{ color : 'red'}}>{this.state.errors['name']}</span>
                <br />
                <div>
                <button onClick={this.onAdd}>Add department</button>
                </div>
            </p>
             
          </div>
          </form>
        </div>
      </div>
    );
  }

  changeHandler= (event) =>{
    this.setState({
        department: {
            ...this.state.department, 
            [event.target.name] : event.target.value
        }
    });
}

onAdd = ()=>{
    /* Validate User inputs */
    if(this.handleValidation()){
        console.log(this.state.department);
        /* Call the API */
       this.postDepartment(this.state.department);
    }
    else{
        /* Display error messages */
        console.log('validation not passed..');     
    }
}

handleValidation(){
    let name = this.state.department.name;
    
    let tempErrors={}
    let formValid = true; 
    if(!name){ //If name is not given
        formValid = false;
        tempErrors['name']='Department Name cannot be empty';
    }
    this.setState({
        errors: tempErrors
    });

    return formValid; 
}

async postDepartment(department){
    try {
        const response = axios.post("http://localhost:8585/api/department/add", department);
        const data = (await response).data;
        console.log('API success');
        console.log(data);
        this.setState({
            msg: data.msg
        })
        
        //react out to action and update the store
        this.props.addDepartment(data);
      } catch (error) {
         console.log(error)
        //console.error(error.response.data.msg);
        this.setState({
            msg: 'Operation failed'
        })
      }
}
}
function mapStateToProps(state){
    return {
         
    }    
}

export default connect(mapStateToProps, {addDepartment})(Department);