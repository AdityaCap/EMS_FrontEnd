import { Component } from "react"
import Login from "./login";

export default class  Logout extends Component{

    constructor(props){
        super(props);

        this.state={

        }
    }

    componentDidMount(){
        localStorage.clear();
    }

    render(){
        return(
            <Login />
        )
    }
}