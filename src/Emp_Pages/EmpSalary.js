import React, { useEffect, useState } from 'react';
import axios from 'axios';

const EmpSalary = () => {
    const getUrl = "https://onlinetestapi.gerasim.in/api/TeamSync/";
    const [empId, setEmpId] = useState([]);
    const [getAllSalaryList,setGetAllSalaryList] = useState([]);
    const [addSalaryList,setAddSalaryList] = useState({
        "salaryId": 0,
        "employeeId": 0,
        "salaryDate": " ",
        "totalAdvance": 0,
        "presentDays": 0,
        "salaryAmount": 0
      })
    //****************************** Employee ID Call  *************************************** */
    const getAllEmpId = async () => {
        const result = await axios.get(`${getUrl}GetAllEmployee`);
        setEmpId(result.data.data)
    }
    //****************************** Employee Salary Info  *************************************** */
    const EmpSalaryInfo = (event,key) =>{
        setAddSalaryList(preObje =>({...preObje,[key]:event.target.value}));
    }
    //****************************** Get All Salary  *************************************** */
    const getAllSalary = async () =>{
        const result = await axios.get(`${getUrl}GetAllSalary`);
        setGetAllSalaryList(result.data.data);
    }
    //****************************** Get All Salary  *************************************** */    
    const addSalary = async () =>{
        const result = await axios.post(`${getUrl}AddSalary`,addSalaryList);
        if(result.data.data){
            alert("Salary Add success...");
        }else{
            alert(result.data.message);
        }
    }
    //******************************  Salary Edit *************************************** */    

    const onEdit = (salary) =>{
        setAddSalaryList(salary);
    }
    //****************************** Update Salary *************************************** */    

    const updateSalary =  async () =>{
        const result = await axios.post(`${getUrl}UpdateSalary`,addSalaryList);
        if(result.data.data){
            alert("Salary update success...");
        }else{
            alert(result.data.message);
        }
    }
    //****************************** Delete Salary *************************************** */    

    const onDelete =  async (salaryId) =>{
        const result = await axios.get(`${getUrl}DeleteSalaryById?salaryid=`+salaryId);
        if(result.data.data){
            alert("Salary Delete success...");
        }else{
            alert(result.data.message);
        }
    }

    useEffect (()=>{
        getAllSalary();
        getAllEmpId();
    })
    return (
        <div>
            <div className="container-fluid">
                <div className="row">
                        {JSON.stringify(addSalaryList)}
                    <div className="col-8">
                        <div className="card">
                            <div className="card-header bg-info text-center">
                                Get All Salary
                            </div>
                            <div className="card-body">
                                <table className='table table-bordered text-center'>
                                    <thead>
                                        <th>Sr.no</th>
                                        <th>EmpName</th>
                                        <th>EmpId</th>
                                        <th>salaryDate</th>
                                        <th>presentDays</th>
                                        <th>salaryAmount</th>
                                        <th>totalAdvance</th>
                                        <th>Action</th>
                                    </thead>
                                    <tbody>
                                        {
                                            getAllSalaryList.map((salary, index) => {
                                                return (
                                                    <tr>
                                                        <td>{index + 1}</td>
                                                        <td>{salary.empName}</td>
                                                        <td>{salary.employeeId}</td>
                                                        <td>{salary.salaryDate}</td>
                                                        <td>{salary.presentDays}</td>
                                                        <td>{salary.salaryAmount}</td>
                                                        <td>{salary.totalAdvance}</td>
                                                        <td>
                                                            <button type="button" className='btn btn-primary' onClick={() => { onEdit(salary) }}>Edit</button>
                                                            <button type="button" className='btn btn-danger' onClick={()=>{onDelete(salary.salaryId)}}>Del</button>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>

                            </div>
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="card">
                            <div className="card-header bg-info text-center">
                                Add Salary Info
                            </div>
                            <div className="card-body">
                                <div className="row">

                                    <div className="col-6">
                                        <label htmlFor="">Employee Id</label>
                                        <select name="" id="" className='form-select'value={addSalaryList.employeeId} onChange={(event)=>{EmpSalaryInfo(event,'employeeId')}} >

                                            {
                                                empId.map((empid) => {
                                                    return (
                                                        <option>{empid.empId}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                    </div>

                                    <div className="col-6">
                                        <label htmlFor="">Total Advance</label>
                                        <input type="text" className='form-control' value={addSalaryList.totalAdvance} onChange={(event)=>{EmpSalaryInfo(event,'totalAdvance')}} />
                                    </div>
                                    <div className="col-6">
                                        <label htmlFor="">Present Days</label>
                                        <input type="text" className='form-control' value={addSalaryList.presentDays} onChange={(event)=>{EmpSalaryInfo(event,'presentDays')}} />
                                    </div>
                                    <div className="col-6">
                                        <label htmlFor="">SalaryAmount</label>
                                        <input type="text" className='form-control' value={addSalaryList.salaryAmount} onChange={(event)=>{EmpSalaryInfo(event,'salaryAmount')}} />
                                    </div>
                                    <div className="col-12">
                                        <label htmlFor="">Salary Date</label>
                                        <input type="datetime-local" className='form-control' value={addSalaryList.salaryDate} onChange={(event)=>{EmpSalaryInfo(event,'salaryDate')}} />
                                    </div>
                                    <div className="row">
                                        {
                                            addSalaryList.salaryId == '' && <div className="col-12 text-center mt-2">
                                            <button type="button" className='btn btn-secondary' onClick={addSalary}>Save Salary</button>
                                        </div>
                                        }
                                        {
                                            addSalaryList.salaryId != '' && <div className="col-12 text-center mt-2">
                                            <button type="button" className='btn btn-warning' onClick={updateSalary}>Update Salary</button>
                                        </div>
                                        }
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default EmpSalary;