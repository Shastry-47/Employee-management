/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react"
import { deleteEmployee, listEmployee } from "../services/EmployeeService"
import { useNavigate } from "react-router-dom"

const ListEmployeeComponent = () => {

    const [employees, setEmployees] = useState([])

    const navigator = useNavigate();

    useEffect(() => {
        getAllEmployees();
    }, [])

    function getAllEmployees() {
        listEmployee().then((response) => {
            setEmployees(response.data);
        }).catch(error => {
            console.error(error);
        })
    }

    function addNewEmployee() {
        navigator('/add-employee')
    }

    function editEmployee(id) {
        navigator(`/edit-employee/${id}`)
    }

    function removeEmployee(id) {
        console.log(id);
        deleteEmployee(id).then((response) => {
            getAllEmployees()
        }).catch(error => {
            console.error(error);
        })
    }

    return (
        <div className='container'>
            <h2 className='mb-1 text-center'>LIST OF EMPLOYEES</h2>
            <button className="btn btn-primary mb-3" onClick={addNewEmployee}>Add Employee</button>
            <div className="table-responsive">
                <table className='table table-bordered table-hover compact table' style={{
                    width: '100%',
                    fontSize: '1.1rem',
                    textAlign: 'left',
                }}>
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>firstName</th>
                            <th>lastName</th>
                            <th>email</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            employees.map(emp =>
                                <tr key={emp.id}>
                                    <td>{emp.id}</td>
                                    <td>{emp.firstName}</td>
                                    <td>{emp.lastName}</td>
                                    <td>{emp.email}</td>
                                    <td>
                                        <button className="btn btn-info mx-1" onClick={() => editEmployee(emp.id)}>Update</button>
                                        <button className="btn btn-danger mx-" onClick={() => removeEmployee(emp.id)}>Delete</button>
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ListEmployeeComponent
