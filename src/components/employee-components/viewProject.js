import { Component } from "react";
import { connect } from "react-redux";
import { listProject } from "../../store/action/project";
export class ProjectList extends Component{
    constructor(props) {
        super(props);
    
        this.state = {
          
        };
      }
    
      componentDidMount() {
          this.props.listProject();
      }

      render(){
        return(
            <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Id</th>
                <th scope="col">Title</th>
                <th scope="col">Credits</th>
                
              </tr>
            </thead>
            <tbody>
              {
                this.props.projectList.list.map((e, index) => (
                 
                  <tr key={e.id}>
                    <th scope="row" key={e.id}> {index + 1}</th>
                    <td>{e.id}</td>
                    <td>{e.title}</td>
                    <td>{e.credits}</td>                    
                    {/* <td> 
                      {e.projects.map(p=> (
                          <li key={index}>
                              {p.title} 
                          </li>
                      ))}
                    </td> */}
                  </tr>
                
              ))}   
            </tbody>
          </table>
          )
      }
}

function mapStateToProps(state) {
    return {
      projectList: state.project
    }; 
  }
  
  export default connect(mapStateToProps, {listProject})(ProjectList);