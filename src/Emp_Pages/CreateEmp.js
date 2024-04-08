import React, { useEffect, useState } from 'react';
import axios from 'axios';
const CreateEmp = () => {
    const [getAllEmpList,setGetAllEmpList] = useState([]);
    const [createEmployee,setCreateEmployee] = useState({
        "empId": 0,
        "empName": " ",
        "empContactNo": " ",
        "empAltContactNo": "",
        "empEmail": "",
        "addressLine1": " ",
        "addressLine2": " ",
        "pincode": " ",
        "city": " ",
        "state": " ",
        "bankName": " ",
        "ifsc": " ",
        "accountNo": " ",
        "bankBranch": " ",
        "salary": 0
      })
      
    const getUrl = "https://onlinetestapi.gerasim.in/api/TeamSync/";
  //*************************** Get All Employee List ************************************** */
    const getAllEmp = async () =>{
        const result = await axios.get(`${getUrl}GetAllEmployee`);
        setGetAllEmpList(result.data.data);
    }
      //*************************** Fill Employee Information ************************************** */
    const getCreateEmployee = (event,key) =>{   
        setCreateEmployee(preObj =>({...preObj,[key]:event.target.value}));
    }
      //*************************** Save Employee ************************************** */
    const SaveEmp = async () =>{
        const result = await axios.post(`${getUrl}CreateEmployee`,createEmployee);
        if(result.data.data){
            alert("Employee Save Success...");
            getAllEmp();
        }else{
            alert(result.data.message);
        }
    }
    const onEdit = (editinfo)=>{
        setCreateEmployee(editinfo);
    } 
      //***************************Update Employee ************************************** */
    const updateEmpInfo = async() =>{
        const result = await axios.post(`${getUrl}UpdateEmployee`,createEmployee);
        if(result.data.data){
            alert("Employee Update Success...");
            getAllEmp();
        }else{
            alert(result.data.message);
        }
    }
      //*************************** DELETE Employee ************************************** */
    const onDelete =  async (empId) =>{
        const result = await axios.get(`${getUrl}DeleteEmployeeByEmpId?empid=`+empId);
        if(result.data.data){
            alert("Employee Delete Success...");
            getAllEmp();
        }else{
            alert(result.data.message);
        }
    }

    useEffect (()=>{
        getAllEmp();
    },[])
    return (
        <div>
            {JSON.stringify(createEmployee)}
           <div className="container-fluid">
           <div className="row">
                    <div className="col-8">
                        <div className="card">
                            <div className="card-header bg-info text-center">
                                <h5>Create Employee List</h5>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    {
                                        getAllEmpList.map((employee) => {
                                            return (
                                                <div className="col-4">
                                                    <div className="card m-1">
                                                        <div className="card-body">
                                                            <h6 className="card-title">{employee.empName}</h6>
                                                            <p className="card-text">
                                                                <small>{employee.empContactNo}</small><br />
                                                                <small>{employee.empEmail}</small><br />
                                                                <small>{employee.addressLine1}</small><br />
                                                                <small>{employee.state}</small>
                                                             </p>
                                                            <p>
                                                                <strong>{employee.bankBranch}</strong><br />
                                                                <strong>{employee.salary}</strong>
                                                            </p>
                                                            
                                                            <span>
                                                            <button className='btn btn-secondary m-1' onClick={()=>{onEdit(employee)}}>Edit</button>
                                                            <button className='btn btn-primary' onClick={()=>{onDelete(employee.empId)}}>Delete</button>
                                                      
                                                            </span>
                                                          </div>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                <div className="col-4">
                <div className="card">
                        <div className="card-header bg-info text-center">
                            <h5>Create Employee</h5>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-6">
                                    <label htmlFor="">Emp Name</label>
                                    <input type="text" value={createEmployee.empName} className='form-control' onChange={(event)=>{getCreateEmployee(event,'empName')}}/>
                                </div>
                                <div className="col-6">
                                    <label htmlFor="">Emp Contact No</label>
                                    <input type="text" value={createEmployee.empContactNo} className='form-control' onChange={(event)=>{getCreateEmployee(event,'empContactNo')}}/>
                                </div>
                                <div className="col-6">
                                    <label htmlFor="">Emp AltContact No</label>
                                    <input type="text" value={createEmployee.empAltContactNo} className='form-control' onChange={(event)=>{getCreateEmployee(event,'empAltContactNo')}}/>
                                </div>
                                <div className="col-6">
                                    <label htmlFor="">Emp Email</label>
                                    <input type="text" value={createEmployee.empEmail} className='form-control' onChange={(event)=>{getCreateEmployee(event,'empEmail')}}/>
                                </div>
                                <div className="col-6">
                                    <label htmlFor="">Address Line1</label>
                                    <textarea type="text" value={createEmployee.addressLine1} className='form-control' onChange={(event)=>{getCreateEmployee(event,'addressLine1')}}/>
                                </div>
                                <div className="col-6">
                                    <label htmlFor="">Address Line2</label>
                                    <textarea type="text" value={createEmployee.addressLine2} className='form-control' onChange={(event)=>{getCreateEmployee(event,'addressLine2')}}/>
                                </div>
                                <div className="col-4">
                                    <label htmlFor="">Pincode</label>
                                    <input type="text" value={createEmployee.pincode} className='form-control' onChange={(event)=>{getCreateEmployee(event,'pincode')}}/>
                                </div>
                                <div className="col-4">
                                    <label htmlFor="">City</label>
                                    <input type="text" value={createEmployee.city} className='form-control' onChange={(event)=>{getCreateEmployee(event,'city')}}/>
                                </div>
                                <div className="col-4">
                                    <label htmlFor="">State</label>
                                    <input type="text" value={createEmployee.state} className='form-control' onChange={(event)=>{getCreateEmployee(event,'state')}}/>
                                </div>
                                <div className="col-6">
                                    <label htmlFor="">Bank Name</label>
                                    <input type="text" value={createEmployee.bankName} className='form-control' onChange={(event)=>{getCreateEmployee(event,'bankName')}}/>
                                </div>
                                <div className="col-6">
                                    <label htmlFor="">IFSC</label>
                                    <input type="text" value={createEmployee.ifsc} className='form-control' onChange={(event)=>{getCreateEmployee(event,'ifsc')}}/>
                                </div>
                                <div className="col-12">
                                    <label htmlFor="">Account No</label>
                                    <input type="text" value={createEmployee.accountNo} className='form-control' onChange={(event)=>{getCreateEmployee(event,'accountNo')}}/>
                                </div>
                                <div className="col-6">
                                    <label htmlFor="">Bank Branch</label>
                                    <input type="text" value={createEmployee.bankBranch} className='form-control' onChange={(event)=>{getCreateEmployee(event,'bankBranch')}}/>
                                </div>
                                <div className="col-6">
                                    <label htmlFor="">Salary</label>
                                    <input type="text" value={createEmployee.salary} className='form-control' onChange={(event)=>{getCreateEmployee(event,'salary')}}/>
                                </div>
                            </div>
                            <div className="row">
                                {
                                    createEmployee.empId == ' ' &&  <div className="col-12 mt-4 text-center">
                                    <button type="button" className='btn btn-success' onClick={SaveEmp}>Save</button>
                                </div>
                                }
                                {
                                    createEmployee.empId != '' && <div className="col-12 mt-4 text-center">
                                    <button type="button" className='btn btn-warning' onClick={updateEmpInfo}>Update</button>
    
                                    </div>
                                }
                               
                                
                            </div>
                           
                        </div>
                    </div>
                </div>
            </div>
           </div>
        </div>
    );
};

export default CreateEmp;