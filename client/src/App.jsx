import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AddEmployee from './components/AddEmployee'
import AddTask from './components/AddTask'
import Employees from './components/Employees'
import Header from "./components/Header"
import MainSection from "./components/MainSection"
import Tasks from './components/Tasks'

function App() {

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<MainSection />} />
        <Route path='/add-employee' element={<AddEmployee />} />
        <Route path='/edit-employee/:id' element={<AddEmployee />} />
        <Route path='/add-task' element={<AddTask />} />
        <Route path='/edit-task/:id' element={<AddTask />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
