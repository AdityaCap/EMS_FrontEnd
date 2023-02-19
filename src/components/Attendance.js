import axios from "axios";
import { Component } from "react";


export default class Attendance extends Component {

    constructor(props) {
        super(props);

        this.state = {
            attendance: {
                emp_id:0,
                name: '',
                date: '',
                time: '',
                branch: '',
                designation: '',
                availability: ''
            },
            errors: {},
            msg: '',

        };
    }

    componentDidMount() {
    }

    render() {
        const mystyle={
            backgroundColor: "#b69de0",
            fontFamily: "Arial",
          };
        return (
            <div style={mystyle} className="container-fluid">
                <div className="row">
                    <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                        <div className="card border-0 shadow rounded-3">
                            <div className="card-body p-4 p-sm-5">
                                    <h2 className="card-header text-center mb-4 fw-bold fs-5">Mark Your Attendance</h2>
                                    <form>
                                        {/* <h5 className="card-title">Enter Attendance</h5> */}
                                        <span>{this.state.msg}</span>
                                        <div className="form-outline mb-2">
                                            <label className="form-label" for="form3Example3cg">Employee Id: </label>
                                            <input type="number" id="form3Example3cg" className="form-control" name="emp_id" value={this.state.attendance.emp_id} onChange={this.changeHandler} />
                                            <span style={{ color: 'red' }}>{this.state.errors['emp_id']}</span>
                                        </div>

                                        <div className="form-outline mb-2">
                                            <label className="form-label" for="form3Example3cg">Name: </label>
                                            <input type="text" className="form-control" id="form3Example3cg" name="name" value={this.state.attendance.name} onChange={this.changeHandler} />
                                            <span style={{ color: 'red' }}>{this.state.errors['name']}</span>
                                        </div>

                                        <div className="form-outline mb-2">
                                            <label className="form-label" for="form3Example3cg">Date: </label>
                                            <input type="date" name="date" className="form-control" id="form3Example3cg" value={this.state.attendance.date} onChange={this.changeHandler} />
                                            <span style={{ color: 'red' }}>{this.state.errors['date']}</span>
                                        </div>

                                        <div className="form-outline mb-2">
                                            <label className="form-label" for="form3Example3cg">Time: </label>
                                            <input type="time" name="time" className="form-control" id="form3Example3cg" value={this.state.attendance.time} onChange={this.changeHandler} />
                                            <span style={{ color: 'red' }}>{this.state.errors['time']}</span>
                                        </div>

                                        <div className="form-outline mb-2">
                                            <label className="form-label" for="form3Example3cg">Branch: </label>
                                            <input type="text" name="branch" className="form-control" id="form3Example3cg" value={this.state.attendance.branch} onChange={this.changeHandler} />
                                            <span style={{ color: 'red' }}>{this.state.errors['branch']}</span>
                                        </div>

                                        <div className="form-outline mb-2">
                                            <label className="form-label" for="form3Example3cg">Designation: </label>
                                            <input type="text" name="designation" className="form-control" id="form3Example3cg" value={this.state.attendance.designation} onChange={this.changeHandler} />
                                            <span style={{ color: 'red' }}>{this.state.errors['designation']}</span>
                                        </div>

                                        <div className="form-outline mb-3">
                                            <label className="form-label" for="form3Example3cg">Availability: </label>
                                            <input type="text" name="availability" className="form-control" id="form3Example3cg" value={this.state.attendance.availability} onChange={this.changeHandler} />
                                            <span style={{ color: 'red' }}>{this.state.errors['availability']}</span>
                                        </div>
                                        
                                        <div className="d-grid">
                                            <button onClick={this.onAdd} className="btn btn-primary">Post Attendance</button>
                                        </div>
                                        
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
        );
    }

    changeHandler = (event) => {
        this.setState({
            attendance: {
                ...this.state.attendance,
                [event.target.name]: event.target.value
            }
        });
    }

    onAdd = () => {
        /* Validate User inputs */
        if (this.handleValidation()) {
            console.log(this.state.attendance);
            /* Call the API */
            this.postAttendance(this.state.attendance);
        }
        else {
            /* Display error messages */
            console.log('validation not passed..');
        }
    }

    handleValidation() {
        let emp_id = this.state.attendance.emp_id;
        let name = this.state.attendance.name;
        let date = this.state.attendance.date;
        let time = this.state.attendance.time;
        let branch = this.state.attendance.branch;
        let designation = this.state.attendance.designation;
        let availability = this.state.attendance.availability;

        let tempErrors = {}
        let formValid = true;

        if (!emp_id) { //If title is not given
            formValid = false;
            tempErrors['emp_id'] = 'Employee ID cannot be empty';
        }

        if (!name) { //If title is not given
            formValid = false;
            tempErrors['name'] = 'Name cannot be empty';
        }

        if (!date) { //If name is not given
            formValid = false;
            tempErrors['date'] = 'DATE cannot be empty';
        }

        if (!time) { //If title is not given
            formValid = false;
            tempErrors['time'] = 'Time cannot be empty';
        }

        if (!branch) { //If title is not given
            formValid = false;
            tempErrors['branch'] = 'Branch cannot be empty';
        }

        if (!designation) { //If title is not given
            formValid = false;
            tempErrors['designation'] = 'Designation cannot be empty';
        }

        if (!availability) { //If title is not given
            formValid = false;
            tempErrors['availability'] = 'Availability cannot be empty';
        }

        this.setState({
            errors: tempErrors
        });

        return formValid;
    }

    async postAttendance(p) {
        let att = {
            emp_id: p.emp_id,
            name: p.name,
            date: p.date,
            time: p.time,
            branch: p.branch,
            designation: p.designation,
            availability: p.availability
        }
        try {
            const response = axios.post("http://localhost:8585/api/attendance/add", att);
            const data = (await response).data;
            console.log('API success');
            console.log(data);
            this.setState({
                msg: "Attendance Added"
            })
            this.props.addAttendance(data);
        } catch (error) {
            this.setState({
                msg: 'Operation Failed'
            })
        }
    }
}
