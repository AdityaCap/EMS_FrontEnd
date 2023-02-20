import axios from "axios";
import { Component } from "react";
import { connect } from "react-redux";
 
 import { login } from "../../store/action/login";
import Employee from "../Employee";
 

export class Login extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
        user:{
            username: '',
            password: ''
        },
        errors: {},
        msg: '',
        redirect: '/employee',
        isLoggedIn: false
    };
  }

  componentDidMount() {}

  render() {
    const mystyle={
      // backgroundColor: "#b69de0",
      fontFamily: "Arial",
    }
    
    let url= "/sign-up";
    return (
        this.state.isLoggedIn?<div ><Employee /></div>  : 
      <div style={mystyle} className="container-fluid">
        <div className="row">
          <div className="col-sm-3"></div>
          <div className="col-sm-6">
            <div className="card">
              <div className="card-header text-center mb-2 fw-bold fs-5">Login</div>
              <div className="card-body">
              <span>{this.state.msg}</span> <br />
                <h5 className="card-title">Enter the Credentials</h5>
                <div className="input-group mb-3 mt-3">
                  <span className="input-group-text" >
                    @
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Username"
                    name="username"
                    value={this.state.user.username}
                    onChange={this.changeHandler}
                  />
                  <span style={{ color : 'red'}}>{this.state.errors['username']}</span>

                </div>
                <div className="input-group mb-3">
                  <span className="input-group-text" >
                    **
                  </span>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    name="password"
                    value={this.state.user.password}
                    onChange={this.changeHandler}
                  />
                  <span style={{ color : 'red'}}>{this.state.errors['password']}</span>
                </div>
                <div className="input-group mb-3">
                  <button className="btn btn-primary" onClick={this.login}>Login</button>
                </div>
                <hr/>
                <div className="d-grid mb-2">
                  <p>Don't have an account? <a href={url}>Sign Up</a></p>

                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-3"></div>
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


    login = ()=>{
        /* Validate User inputs */
        if(this.handleValidation()){
            
            /* Call the API */
            this.loginUser(this.state.user);
        }
        else{
            /* Display error messages */
            console.log('validation not passed..');
             
        }
        
    }

    handleValidation(){
        let username = this.state.user.username;
        let password = this.state.user.password; 
        let tempErrors={}
        let formValid = true; 
        if(!username){ //If name is not given
            formValid = false;
            tempErrors['name']='Username cannot be empty';
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

    async loginUser(user){
        let authCode = 'Basic ' + btoa(user.username + ':' + user.password);
        try {
            const response = axios.get('http://localhost:8585/api/user/login/',{
                headers: {'Authorization': authCode },
            })
            const data = (await response).data;
            
            console.log('login success ' + data);
            localStorage.setItem('username', data.username);
            this.setState({
                isLoggedIn : true
            })
            
           } catch (error) {
            console.error(error);
            this.setState({
                msg: 'Invalid Credentials'
            })
          }
    }
}

function mapStateToProps(state){
    return {
          
    }    
  }
  export default connect(mapStateToProps, {login })(Login); 