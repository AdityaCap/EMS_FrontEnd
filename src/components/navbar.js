import { Component } from "react";
import { Link, Outlet } from "react-router-dom";
import Login from "./auth/login";

export default class NavBar extends Component {
  constructor() {
    super();
    this.state = {
      isLoggedIn : false
    };
  }

  componentDidMount(){
    let username = localStorage.getItem('username');
     
    if(username === null || username === undefined) 
          this.setState({isLoggedIn: false})
    else
          this.setState({isLoggedIn: true})
  }

  render() {
    return ( 
      <div >
           <nav className="navbar navbar-expand-lg navbar-light bg-light mb-3">
            <div className="container-fluid">
              <Link className="navbar-brand" to="/">
                Employee Management System
              </Link>
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <Link className="nav-link" aria-current="page" to="/posts">
                      Daily Attendance
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/employee">
                      Employee
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/sign-up">
                      Sign Up
                    </Link>
                  </li>
                </ul>
              <div className="col-sm-2">
                { this.state.isLoggedIn? <Link to="/logout"><button className="btn btn-outline-danger">
                   Logout </button>  </Link>   : ''
                }
               
              
              </div>
            </div>
            </div>
          </nav>
         
      </div>
    );
  }
 
}
