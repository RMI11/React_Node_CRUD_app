import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';

const AddTask = () => {
    const [employees, setEmployees] = useState([]);

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [assignedTo, setAssignedTo] = useState('');
    const [status, setStatus] = useState('Active');
    const [dueDate, setDueDate] = useState('');
    const [notes, setNotes] = useState('');

    const navigate = useNavigate();

    const {id} = useParams();


    const baseURL = 'http://localhost:3000/api/tasks/';
    const employeesURL = 'http://localhost:3000/api/employees/';

    const getEmployees = async () => {
        const response = await fetch(employeesURL)
          .then((response) => response.json());
    
        setEmployees(response);
      };
    
      useEffect(() => {
        getEmployees();
      }, []);

      const addTaskToEmployee = (task) => {
        employees.map(employee => {
            if(task.assignedTo === employee._id) {
                employee.tasks.push(task)
                const url = employeesURL + task.assignedTo
                fetch(url, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                body: JSON.stringify(employee),
        }).catch(err => console.log(err))
            }
        })
      }
        

    const getTaskById = () => {
        fetch(baseURL + id)
          .then((response) => response.json())
          .then(data => {
            setTitle(data.title)
            setDescription(data.description)
            setAssignedTo(data.assignedTo)
            setStatus(data.status)
            setDueDate(moment(data.dueDate).utc().format('DD-MM-YYYY'))
            setNotes(data.notes)
          }).catch(err => console.log(err))
    
        }
        
        useEffect(() => {getTaskById()}, [])

    const newTask = (task) => {
        fetch(baseURL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(task),
        }).catch(err => console.log(err))  
      };

      const updateTask = (task) => {
        const url = baseURL + id
        fetch(url, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(task),
        }).catch(err => console.log(err))
      };

    const saveOrUpdateTask = (e) => {
        e.preventDefault();

        const task = {title, description, assignedTo, status, dueDate, notes};

        if(id) {
            updateTask(task)
        } else {
            newTask(task);
            addTaskToEmployee(task);
        }

        navigate('/')
    }

  return (
    <div className="relative flex flex-col justify-center min-h-[800px] overflow-hidden">
            <div className="w-full p-6 m-auto bg-white rounded-md shadow-xl shadow-rose-600/40 ring-2 ring-indigo-600 lg:max-w-xl">
                <h1 className="text-3xl font-semibold text-center text-indigo-700 uppercase">
                    Add Task
                </h1>
                <form className="mt-6">
                    <div className="mb-2">
                        <label
                            htmlFor="title"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Title
                        </label>
                        <input
                            type="text"
                            name='title'
                            className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            value={title}
                            required
                            onChange={(e) => setTitle(e.target.value)}
                        
                        />
                    </div>
                    <div className="mb-2">
                        <label
                            htmlFor="description"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Description
                        </label>
                        <input
                            type="text-area"
                            name='description'
                            className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            value={description}
                            required
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                    <div className="mb-2">
                        <label
                            htmlFor="assignedto"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Assigned To
                        </label>
                        <select required onChange={(e) => setAssignedTo(e.target.value)} name='assignedto' id='assignedto' className='w-full border-gray-400 border-2'>
                                <option selected="true" disabled>Select...</option>
                            {employees.map((employee) => {
                                return <option key={employee._id} value={employee._id}>{employee.fullName}</option>
                            })}
                            
                        </select>
                    </div>
                    <div className="mb-2">
                        <label
                            htmlFor="status"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Status
                        </label>
                        <select required onChange={(e) => setStatus(e.target.value)} name='status' id='status' className='w-full border-gray-400 border-2'>
                            <option selected="true" disabled>Select...</option>
                            <option value="Active">Active</option>
                            <option value="Completed">Completed</option>
                        </select>
                        
                    </div>
                    <div className="mb-2">
                        <label
                            htmlFor="duedate"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Due Date
                        </label>
                        <input
                            type="date"
                            name='duedate'
                            className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            value={dueDate}
                            required
                            onChange={(e) => setDueDate(e.target.value)}
                        />
                    </div>
                    <div className="mb-2">
                        <label
                            htmlFor="notes"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Notes
                        </label>
                        <input
                            type="text-area"
                            name='notes'
                            className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                        />
                    </div>
                    <div className="flex mt-6">
                        <button onClick={(e) => saveOrUpdateTask(e)} className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-indigo-700 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600">
                            { id ? 'Update Task' : 'Add New Task' }
                        </button>
                        <Link to="/" className=" px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-red-500 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600">Cancel</Link>
                    </div>
                </form>

            </div>
        </div>
  )
}

export default AddTask