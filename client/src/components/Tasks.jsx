import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import moment from "moment";

const Tasks = () => {
  const [tasks, setTasks] = useState();
  const [employees, setEmployees] = useState([]);

  const baseURL = "http://localhost:3000/api/tasks/";
  const employeeURL = "http://localhost:3000/api/employees/";

  const getTasks = async () => {
    const response = await fetch(baseURL)
      .then((response) => response.json());

    setTasks(response);
  };

  useEffect(() => {
    getTasks();
  }, [tasks]);

    const deleteTask = (taskId) => {
    const url = baseURL + taskId;
     fetch(url, {
      method: 'DELETE',
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

  const getEmployees = async () => {
    const response = await fetch(employeeURL)
      .then((response) => response.json());

    setEmployees(response);
  };

  useEffect(() => {
    getEmployees();
  }, []);


  return (
    <div className='flex flex-col justify-center items-center mt-4'>
      <table className='w-[90%] border-black border-2 text-center'>
      <thead>
        <tr>
          <th>Title</th>
          <th>Description</th>
          <th>Assigned To</th>
          <th>Status</th>
          <th>Due Date</th>
          <th>Notes</th>
          <th>Edit/Delete</th>
          
        </tr>
      </thead>
      <tbody>

        {tasks &&
          tasks.map(task => (
              <tr key={task._id}>
                <td>{task.title}</td>
                <td>{task.description}</td>
                <td>{employees.map((employee) => {
                 return task.assignedTo?._id == employee._id ? employee.fullName : ''
                })}</td>
                <td>{task.status}</td>
                <td>{moment(task.dueDate).utc().format('DD-MM-YYYY')}</td>
                <td>{task.notes}</td>
                <td>
                <button className='pr-4 w-full bg-green-400 border-black border-y'>
                  <Link to={`/edit-task/${task._id}`} >Edit</Link>
                </button>
                  <button onClick={() => deleteTask(task._id)} className='pr-4 bg-red-400 w-full'>Delete</button>
                </td>
                
              </tr>
            
          ))
        }
        
      </tbody>
    </table>

    <div className='flex justify-end p-12 w-[95%]'>
          <Link to="/add-task" className='p-4 bg-blue-400'>Add Task</Link>
    </div>

    </div>
  )
}

export default Tasks