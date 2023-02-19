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
        return(
            <div>
                <h1>Sign Up</h1>
                <span>{this.state.msg}</span> <br />
                <label>Enter the username: </label>
                <input type="text" 
                        name="username"
                        value={this.state.user.username}
                        onChange={this.changeHandler} />
                        <span style={{ color : 'red'}}>{this.state.errors['username']}</span>
                <br /><br />
                <label>Enter Role: </label>
                <input type="text" 
                        name="role"
                        value={this.state.user.role}
                        onChange={this.changeHandler} />
                        <span style={{ color : 'red'}}>{this.state.errors['role']}</span>
                <br /><br />
                <label>Enter password: </label>
                <input type="password" 
                        name="password"
                        value={this.state.user.password}
                        onChange={this.changeHandler} />
                        <span style={{ color : 'red'}}>{this.state.errors['password']}</span>
                <br /><br />
                <button onClick={this.onSignUp}>Sign Up</button>
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