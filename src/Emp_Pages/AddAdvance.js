import React, { useEffect, useState } from 'react';
import axios from 'axios';
const AddAdvance = () => {
    const getUrl = "https://onlinetestapi.gerasim.in/api/TeamSync/";
    const [empId, setEmpId] = useState([]);
    const [getAllAddAdvanceList, setGetAllAddAdvanceList] = useState([]);
    const [addaddvance, setAddAddvance] = useState({
        "advanceId": 0,
        "employeeId": 0,
        "advanceDate": "",
        "advanceAmount": 0,
        "reason": " "
    })
    //****************************** Add Addvance Emp Information  *************************************** */
    const addAddvanceinfo = (event, key) => {
        setAddAddvance(preObj => ({ ...preObj, [key]: event.target.value }));
    }


    //****************************** Employee ID Call  *************************************** */
    const getAllEmpId = async () => {
        const result = await axios.get(`${getUrl}GetAllEmployee`);
        setEmpId(result.data.data)
    }
    //****************************** Get all Addvance List  *************************************** */
    const getAllAddvance = async () => {
        const result = await axios.get(`${getUrl}GetAllAdvance`);
        setGetAllAddAdvanceList(result.data.data);
    }
    //****************************** Get Add Addvance  *************************************** */
    const SaveAddAddvance = async () => {
        const result = await axios.post(`${getUrl}AddAdvance`, addaddvance);
        if (result.data.data) {
            alert("Addvance Add Success....!");
            getAllAddvance();
        } else {
            alert(result.data.message);
        }
    }
    //****************************** Edit Add Addvance  *************************************** */

    const onEdit = (addvance) => {
        setAddAddvance(addvance);
    }
    //****************************** Update Add Addvance  *************************************** */

    const updateAddvance = async () => {
        const result = await axios.post(`${getUrl}UpdateAdvance`, addaddvance);
        if (result.data.data) {
            alert("Addvance Update Success....!");
            getAllAddvance();
        } else {
            alert(result.data.message);
        }
    }
    //****************************** Delete Addvance  *************************************** */

    const onDelete = async (advanceId) => {
        const isDelete = window.confirm("Are you sure the Delete this record");
        if(isDelete){
            const result = await axios.get(`${getUrl}DeleteAdvanceById?advanceid=` + advanceId);
        if (result.data.data) {
            alert("Addvance Delete Success....!");
            getAllAddvance();
        } else {
            alert(result.data.message);
        }
        }
        
    }

    useEffect(() => {
        getAllAddvance();
        getAllEmpId();
    }, [])

    return (
        <div>
            <div className="container-fluid">
                <div className="row">
                    {JSON.stringify(addaddvance)}
                    <div className="col-8">
                        <div className="card">
                            <div className="card-header bg-info text-center">
                                Get All Advance
                            </div>
                            <div className="card-body">
                                <table className='table table-bordered text-center'>
                                    <thead>
                                        <th>Sr.no</th>
                                        <th>empName</th>
                                        <th>employeeId</th>
                                        <th>advanceDate</th>
                                        <th>advanceAmount</th>
                                        <th>reason</th>
                                        <th>Action</th>
                                    </thead>
                                    <tbody>
                                        {
                                            getAllAddAdvanceList.map((addvance, index) => {
                                                return (
                                                    <tr>
                                                        <td>{index + 1}</td>
                                                        <td>{addvance.empName}</td>
                                                        <td>{addvance.employeeId}</td>
                                                        <td>{addvance.advanceDate}</td>
                                                        <td>{addvance.advanceAmount}</td>
                                                        <td>{addvance.reason}</td>
                                                        <td>
                                                            <button type="button" className='btn btn-primary' onClick={() => { onEdit(addvance) }}>Edit</button>
                                                            <button type="button" className='btn btn-danger' onClick={() => { onDelete(addvance.advanceId) }}>Delete</button>
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
                                Add Advance Info
                            </div>
                            <div className="card-body">
                                <div className="row">

                                    <div className="col-6">
                                        <label htmlFor="">Employee </label>
                                        <select name="" id="" value={addaddvance.employeeId} className='form-select' onChange={(event) => { addAddvanceinfo(event, 'employeeId') }}>
                                            <option >Select employee</option>
                                            {
                                                empId.map((empid) => {
                                                    return (
                                                        <option value={empid.empId}>{empid.empName}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                    </div>
                                    <div className="col-6">
                                        <label htmlFor="">Advance Date</label>
                                        <input type="datetime-local" value={addaddvance.advanceDate} className='form-control' onChange={(event) => { addAddvanceinfo(event, 'advanceDate') }} />
                                    </div>
                                    <div className="col-6">
                                        <label htmlFor="">Advance Amount</label>
                                        <input type="text" value={addaddvance.advanceAmount} className='form-control' onChange={(event) => { addAddvanceinfo(event, 'advanceAmount') }} />
                                    </div>
                                    <div className="col-6">
                                        <label htmlFor="">Reason</label>
                                        <input type="text" value={addaddvance.reason} className='form-control' onChange={(event) => { addAddvanceinfo(event, 'reason') }} />
                                    </div>
                                    <div className="row text-center">
                                        <div className="col-6">
                                            <button type="button" className='btn btn-secondary mt-3'>Reset</button>
                                            
                                        </div>
                                        <div className="col-6">
                                        {
                                                addaddvance.advanceId == '' && <div className="col-12  mt-3">
                                                    <button type="button" className='btn btn-outline-success' onClick={SaveAddAddvance}>Save</button>
                                                </div>
                                            }
                                            {
                                                addaddvance.advanceId != '' && <div className="col-12  mt-3">
                                                    <button type="button" className='btn btn-outline-warning' onClick={updateAddvance}>Update</button>
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
        </div>
    );
};

export default AddAdvance;