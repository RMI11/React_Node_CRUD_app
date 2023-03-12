import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom'
import moment from "moment";

const AddEmployee = (employee) => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [birthday, setBirthday] = useState('');
    const [salary, setSalary] = useState('');

    const navigate = useNavigate();
    const {id} = useParams();
    const baseURL = 'http://localhost:3000/api/employees/';

    
    const getEmployeeById = () => {
    fetch(baseURL + id)
      .then((response) => response.json())
      .then(data => {
        setFullName(data.fullName)
        setEmail(data.email)
        setPhoneNumber(data.phoneNumber)
        setBirthday(moment(data.birthday).utc().format('DD-MM-YYYY'))
        setSalary(data.salary)
      }).catch(err => console.log(err))

    }
    
    useEffect(() => {getEmployeeById()}, [])
    
    const newEmployee = (employee) => {
        fetch(baseURL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(employee),
        }).catch(err => console.log(err))
      };
    
      const updateEmployee = (employee) => {
        const url = baseURL + id
        fetch(url, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(employee),
        }).catch(err => console.log(err))
      };

    const saveOrUpdateEmployee = (e) => {
        e.preventDefault();

        const employee = {fullName, email, phoneNumber, birthday, salary}
       
        if(id) {
            updateEmployee(employee);
        } else {
            newEmployee(employee);
        }


        navigate('/')
    }


  return (
    <div className="relative flex flex-col justify-center min-h-[800px] overflow-hidden">
            <div className="w-full p-6 m-auto bg-white rounded-md shadow-xl shadow-rose-600/40 ring-2 ring-indigo-600 lg:max-w-xl">
                <h1 className="text-3xl font-semibold text-center text-indigo-700 uppercase">
                { id ? 'Update Employee' : 'Add Employee' }
                </h1>

                <form className="mt-6">
                    <div className="mb-2">
                        <label
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Full Name
                        </label>
                        <input
                            type="text"
                            name='fullName'
                            required
                            className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                        
                        />
                    </div>
                    <div className="mb-2">
                        <label
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            name='email'
                            required
                            className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-2">
                        <label
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Phone Number
                        </label>
                        <input
                            type="phone"
                            name='phonenumber'
                            className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            value={phoneNumber}
                            required
                            onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                    </div>
                    <div className="mb-2">
                        <label
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Birthday
                        </label>
                        <input
                            type="date"
                            name='birthday'
                            className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            value={birthday}
                            required
                            onChange={(e) => setBirthday(e.target.value)}
                        />
                    </div>
                    <div className="mb-2">
                        <label
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Monthly Salary
                        </label>
                        <input
                            type="number"
                            name='salary'
                            className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            value={salary}
                            required
                            onChange={(e) => setSalary(e.target.value)}
                        />
                    </div>
                    <div className="flex w-[70%] justify-between mt-6 mx-auto">
                        <button onClick={(e) => saveOrUpdateEmployee(e)} className=" px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-indigo-700 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600">
                            { id ? 'Update Employee' : 'Add New Employee' }
                        </button>
                        <Link to="/" className=" px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-red-500 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600">Cancel</Link>
                    </div>
                </form>

            </div>
        </div>
  )
}

export default AddEmployee