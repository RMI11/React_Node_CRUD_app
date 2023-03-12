import React, { useEffect, useState } from 'react';
import moment from "moment";
import { Link } from 'react-router-dom';

const Employees = () => {
  const [employees, setEmployees] = useState([]);

  const baseURL = "http://localhost:3000/api/employees/";

  const getEmployees = async () => {
    const response = await fetch(baseURL)
      .then((response) => response.json());

    setEmployees(response);
  };

  useEffect(() => {
    getEmployees();
  }, [employees]);

  const deleteEmployee = (employeeId) => {
    const url = baseURL + employeeId;
      fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => {
          if(!response.ok) {
            throw new Error('Somthing went wrong');
          }
        })
          .catch((e) => {
            console.log(e)
          })
  }


  return (
    <div className='flex flex-col justify-center items-center mt-4 overflow-auto '>
      <table className='w-[90%] border-black border-2 text-center'>
      <thead>
        <tr>
          <th>Fullname</th>
          <th>Email</th>
          <th>Phone number</th>
          <th>Birthday</th>
          <th>Monthly Salary</th>
          <th>Edit/Delete</th>
        </tr>
      </thead>
      <tbody>
        {employees && 
          employees.map(employee => (
            <tr key={employee._id}>
            <td>{employee.fullName}</td>
            <td>{employee.email}</td>
            <td>{employee.phoneNumber}</td>
            <td>{moment(employee.birthday).utc().format('DD-MM-YYYY')}</td>
            <td>${employee.salary}</td>
            <td>
                  
              <button className='pr-4 w-full bg-green-400 border-black border-y'>
                <Link to={`/edit-employee/${employee._id}`} >Edit</Link>
              </button> 
                  
              <button onClick={() => deleteEmployee(employee._id)} className='pr-4 bg-red-400 w-full'>Delete</button>
                </td>
            </tr>
            
          ))
        
        }
        
      </tbody>
    </table>

        <div className='flex justify-end p-12 w-[95%]'>
          <Link to="/add-employee" className='p-4 bg-blue-400'>Add Employee</Link>
        </div>
    </div>
  )
}

export default Employees