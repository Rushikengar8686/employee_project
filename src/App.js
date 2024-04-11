import logo from './logo.svg';
import './App.css';
import{BrowserRouter, Link, Route, Routes} from 'react-router-dom';
import CreateEmp from './Emp_Pages/CreateEmp';
import EmpAddAttendance from './Emp_Pages/EmpAddAttendance';
import AddAdvance from './Emp_Pages/AddAdvance';
import AddLeave from './Emp_Pages/AddLeave';
import EmpSalary from './Emp_Pages/EmpSalary';

function App() {
  return (
    <div>
       <BrowserRouter>
        <nav className="navbar navbar-expand-sm bg-primary navbar-light">
          <div className="container">
            <ul className="navbar-nav">
              <li className="nav-item">
               <Link className="nav-link Active" to="Create_Emp">Create Employee</Link>
              </li>
              <li className="nav-item">
               <Link className="nav-link Active" to="AddAttendance">Add Attendance</Link>
              </li>
              <li className="nav-item">
               <Link className="nav-link Active" to="Add-Advance">Add-Advance</Link>
              </li>
              <li className="nav-item">
               <Link className="nav-link Active" to="Add-Leave">Add-Leave</Link>
              </li>
              <li className="nav-item">
               <Link className="nav-link Active" to="Emp-Salary">Salary</Link>
              </li>
            </ul>
          </div>
        </nav>
        <Routes>
          <Route path='Create_Emp' element={<CreateEmp></CreateEmp>}></Route>
          <Route path='AddAttendance' element={<EmpAddAttendance></EmpAddAttendance>}></Route>
          <Route path='Add-Advance' element={<AddAdvance></AddAdvance>}></Route>
          <Route path='Add-Leave' element={<AddLeave></AddLeave>}></Route>
          <Route path='Emp-Salary' element={<EmpSalary></EmpSalary>}></Route>
        </Routes>

     </BrowserRouter>
    
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    </div>
  );
}

export default App;
