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
    const mystyle ={
      backgroundColor: "black",
      fontFamily: "Arial",
    };
    return ( 
      <div >
           <nav className="navbar navbar-expand-lg navbar-dark mb-3" style={mystyle}>
            <div className="container-fluid">
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
                    <Link className="nav-link" aria-current="page" to="/">
                      Employee Management System
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" aria-current="page" to="/attendance">
                      Daily Attendance
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/employee">
                      Employee
                    </Link>
                  </li>
                </ul>
              <div style={{display:"flex"}}>
                { this.state.isLoggedIn? <Link to="/logout"><button className="btn btn-outline-danger" style={{marginleft: "auto"}}>
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
