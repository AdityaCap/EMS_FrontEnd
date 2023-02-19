import { Component } from "react";
import { Link } from "react-router-dom";

export default class PageNotFound extends Component {
  constructor() {
    super();

    this.state = {};
  }

  render(){
    return (
      <div>
        <h1>Page not found- Broken Link</h1>
        <Link to="/">Go to Home</Link>
      </div>
    )
  }
}