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
        return (
            <div>
                <div className="card">
                    <h5 className="card-header">Add Attendance</h5>
                    <div className="card-body">
                        <h5 className="card-title">Enter Attendance : </h5>
                        <p className="card-text">
                            <span>{this.state.msg}</span> <br />
                            <label>Emp Id: </label>
                            <input type="number"
                                name="emp_id"
                                value={this.state.attendance.emp_id}
                                onChange={this.changeHandler} />
                            <span style={{ color: 'red' }}>{this.state.errors['emp_id']}</span>
                            <br /><br />

                            <label>Name: </label>
                            <input type="text"
                                name="name"
                                value={this.state.attendance.name}
                                onChange={this.changeHandler} />
                            <span style={{ color: 'red' }}>{this.state.errors['name']}</span>
                            <br /><br />

                            <label>Date: </label>
                            <input type="date"
                                name="date"
                                value={this.state.attendance.date}
                                onChange={this.changeHandler} />
                            <span style={{ color: 'red' }}>{this.state.errors['date']}</span>
                            <br /><br />

                            <label>Time: </label>
                            <input type="time"
                                name="time"
                                value={this.state.attendance.time}
                                onChange={this.changeHandler} />
                            <span style={{ color: 'red' }}>{this.state.errors['time']}</span>
                            <br /><br />

                            <label>Branch: </label>
                            <input type="text"
                                name="branch"
                                value={this.state.attendance.branch}
                                onChange={this.changeHandler} />
                            <span style={{ color: 'red' }}>{this.state.errors['branch']}</span>
                            <br /><br />

                            <label>Designation: </label>
                            <input type="text"
                                name="designation"
                                value={this.state.attendance.designation}
                                onChange={this.changeHandler} />
                            <span style={{ color: 'red' }}>{this.state.errors['designation']}</span>
                            <br /><br />

                            <label>Availability: </label>
                            <input type="text"
                                name="availability"
                                value={this.state.attendance.availability}
                                onChange={this.changeHandler} />
                            <span style={{ color: 'red' }}>{this.state.errors['availability']}</span>
                            <br /><br />


                            <button onClick={this.onAdd} className="btn btn-primary">Post Attendance</button>
                        </p>

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
