import React, { useState } from 'react';
import Employees from './Employees';
import Tasks from './Tasks';
import TopEmployees from './TopEmployees';

const MainSection = () => {
    const [window, setWindow] = useState('Employee')

  return (
    <div className='border-black border-2 h-full m-10'>
        <div className=''>
            <button onClick={()=>setWindow('Employee')} className='w-[100px] p-4 bg-blue-200'>Employees</button>
            <button onClick={()=>setWindow('Tasks')} className='w-[100px] p-4 ml-2 bg-blue-400'>Tasks</button>
            <button onClick={()=>setWindow('TopEmployees')} className='w-[150px] p-4 ml-2 bg-blue-400'>Top Employees</button>
        </div>

        <div className=''>
            {window == 'Employee' ? <Employees /> : window == 'Tasks' ? <Tasks /> : <TopEmployees />}
        </div>
    </div>
  )
}

export default MainSection