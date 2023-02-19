import axios from "axios";
import { Component } from "react";

export default class SignUp  extends Component{

    constructor(){
        super();

        this.state={
                user: {
                    username: '',
                    role: '',
                    password: ''
                },
                errors: {},
                msg: ''
        }
    }

    componentDidMount(){}

    render(){
        const mystyle ={
            backgroundColor: "#b69de0",
            fontFamily: "Arial",
        };
        return(
            <div style={mystyle} className="container-fluid">
                <div className="row">
                    <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                        <div className="card border-0 shadow rounded-3">
                            <div className="card-body p-4 p-sm-5">
                                    <h2 className="text-uppercase text-center mb-2">Create an account</h2>
                                    <span>{this.state.msg}</span> <br />
                                    <form>
                                        <div className="form-outline mb-2">
                                            <label className="form-label" for="form3Example3cg">Enter the username: </label>
                                            <input type="text" 
                                                className="form-control form-control-lg"
                                                id="form3Example3cg"
                                                name="username"
                                                value={this.state.user.username}
                                                onChange={this.changeHandler} />
                                            <span style={{ color : 'red'}}>{this.state.errors['username']}</span>
                                        </div>
                                        <br />
                                        <div className="form-outline mb-2">
                                            <label className="form-label" for="form3Example3cg">Enter Role: </label>
                                            <input type="text" 
                                                name="role"
                                                id="form3Example3cg"
                                                className="form-control form-control-lg"
                                                value={this.state.user.role}
                                                onChange={this.changeHandler} />
                                            <span style={{ color : 'red'}}>{this.state.errors['role']}</span>
                                        </div>
                                        <br/>
                                        <div className="form-outline mb-2">
                                            <label className="form-label" for="form3Example3cg">Enter password: </label>
                                            <input type="password" 
                                                name="password"
                                                id="form3Example3cg"
                                                className="form-control form-control-lg"
                                                value={this.state.user.password}
                                                onChange={this.changeHandler} />
                                            <span style={{ color : 'red'}}>{this.state.errors['password']}</span>
                                        </div>
                                        <br/>
                                        <div className="d-grid">
                                        <button type="button"
                                            className="btn btn-primary btn-login text-uppercase fw-bold" onClick={this.onSignUp}>Sign Up</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                    </div>
                </div>
            </div>
        );
    }
    changeHandler= (event) =>{
        this.setState({
            user: {
                ...this.state.user, 
                [event.target.name] : event.target.value
            }
        });
    }

    onSignUp = ()=>{
        /* Validate User inputs */
        if(this.handleValidation()){
            console.log(this.state.user);
            /* Call the API */
           this.postUser(this.state.user);
        }
        else{
            /* Display error messages */
            console.log('validation not passed..');
             
        }
        
    }

    handleValidation(){
        let name = this.state.user.username;
        let email = this.state.user.role; 
        let password = this.state.user.password; 
        let tempErrors={}
        let formValid = true; 
        if(!name){ //If name is not given
            formValid = false;
            tempErrors['name']='Name cannot be empty';
        }
        if(!email){ //If email is not given
            formValid = false;
            tempErrors['email']='Email cannot be empty';
        }
        if(!password){ //If password is not given
            formValid = false;
            tempErrors['password']='Password cannot be empty';
        }

        this.setState({
            errors: tempErrors
        });

        return formValid; 
    }
    async postUser(person){
        try {
            const response = axios.post("http://localhost:8585/api/user/sign-up", person);
            const data = (await response).data;
            console.log('API success');
            console.log(data);
          } catch (error) {
            console.error(error.response.data.msg);
            this.setState({
                msg: error.response.data.msg
            })
          }
    }
}