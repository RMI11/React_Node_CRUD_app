import moment from 'moment';
import React, { useEffect, useState } from 'react'

const TopEmployees = () => {
  const [employees, setEmployees] = useState([]);

  const baseURL = "http://localhost:3000/api/employees/";

  const getEmployees = async () => {
    const response = await fetch(baseURL)
      .then((response) => response.json());

    setEmployees(response);
  };

  useEffect(() => {
    getEmployees();
  }, []);


  let completedTasks = employees.map((employee) => {
    let filter = employee.tasks.filter((task) => task.status === 'Completed')
    let prevMonth = moment().subtract(1, 'month').month();
    let monthFilter = [];
    filter.forEach((f) => {
      if(moment(f.dueDate).month() == prevMonth) {
        monthFilter.push(f);
      }
    })
    filter = monthFilter
    if(filter.length > 0) return filter.length
  })

  return (
    <div className='min-h-[500px] flex flex-col justify-start items-center mt-4 overflow-auto '>
      <table className='w-[90%] border-black border-2 text-center'>
        <thead>
          <tr>
            <th>Fullname</th>
            <th>Email</th>
            <th>Phone number</th>
            <th>Birthday</th>
            <th>Monthly Salary</th>
            <th>Total Tasks Completed</th>
          </tr>
        </thead>
        <tbody>
          {employees && 
            employees.map((employee, index) => (
              <tr key={employee._id}>
                <td>{employee.fullName}</td>
                <td>{employee.email}</td>
                <td>{employee.phoneNumber}</td>
                <td>{moment(employee.birthday).utc().format('DD-MM-YYYY')}</td>
                <td>${employee.salary}</td>
                <td>{completedTasks[index] || 0}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  )
}

export default TopEmployees;