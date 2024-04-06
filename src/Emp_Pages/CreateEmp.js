import React, { useEffect, useState } from 'react';
import axios from 'axios';
const CreateEmp = () => {
    const [getAllEmpList,setGetAllEmpList] = useState([]);
    const getUrl = "https://onlinetestapi.gerasim.in/api/TeamSync/";
    const getAllEmp = async () =>{
        const result = await axios.get(`${getUrl}GetAllEmployee`);
        setGetAllEmpList(result.data.data);
    }
    useEffect (()=>{
        getAllEmp();
    },[])
    return (
        <div>
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
                                                <div className="col-3">
                                                    <div className="card m-1">
                                                        <div className="card-body">
                                                            <h6 className="card-title">{employee.empName}</h6>
                                                            <p className="card-text">
                                                                <small>{employee.empContactNo}</small><br />
                                                                <small>{employee.empEmail}</small>
                                                                <small>{employee.addressLine1}</small>

                                                            </p>
                                                            <p>
                                                                <strong>{employee.bankBranch}</strong><br />
                                                                <strong>{employee.salary}</strong>
                                                            </p>
                                                            <button className='btn btn-secondary'>Edit</button>
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
                                    <input type="text" className='form-control'/>
                                </div>
                                <div className="col-6">
                                    <label htmlFor="">Emp Contact No</label>
                                    <input type="text" className='form-control'/>
                                </div>
                                <div className="col-6">
                                    <label htmlFor="">Emp AltContact No</label>
                                    <input type="text" className='form-control'/>
                                </div>
                                <div className="col-6">
                                    <label htmlFor="">Emp Email</label>
                                    <input type="text" className='form-control'/>
                                </div>
                                <div className="col-6">
                                    <label htmlFor="">Address Line1</label>
                                    <input type="text" className='form-control'/>
                                </div>
                                <div className="col-6">
                                    <label htmlFor="">Address Line2</label>
                                    <input type="text" className='form-control'/>
                                </div>
                                <div className="col-6">
                                    <label htmlFor="">Pincode</label>
                                    <input type="text" className='form-control'/>
                                </div>
                                <div className="col-6">
                                    <label htmlFor="">City</label>
                                    <input type="text" className='form-control'/>
                                </div>
                                <div className="col-6">
                                    <label htmlFor="">State</label>
                                    <input type="text" className='form-control'/>
                                </div>
                                <div className="col-6">
                                    <label htmlFor="">Bank Name</label>
                                    <input type="text" className='form-control'/>
                                </div>
                                <div className="col-6">
                                    <label htmlFor="">IFSC</label>
                                    <input type="text" className='form-control'/>
                                </div>
                                <div className="col-6">
                                    <label htmlFor="">Account No</label>
                                    <input type="text" className='form-control'/>
                                </div>
                                <div className="col-6">
                                    <label htmlFor="">Bank Branch</label>
                                    <input type="text" className='form-control'/>
                                </div>
                                <div className="col-6">
                                    <label htmlFor="">Salary</label>
                                    <input type="text" className='form-control'/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12 mt-4 text-center">
                                    <button type="button" className='btn btn-success'>Save</button>
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

export default CreateEmp;