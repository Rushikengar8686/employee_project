import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AddLeave = () => {
    const getUrl = "https://onlinetestapi.gerasim.in/api/TeamSync/";
    const [getAllLeavList, setGetAllLeaveList] = useState([]);
    const [empId, setEmpId] = useState([]);
    const [addleaveList, setAddLeaveList] = useState({
        "leaveId": 0,
        "employeeId": 0,
        "leaveDate": " ",
        "leaveReason": " ",
        "noOfFullDayLeaves": 0,
        "noOfHalfDayLeaves": 0
    })
    //****************************** Employee ID Call  *************************************** */
    const getAllEmpId = async () => {
        const result = await axios.get(`${getUrl}GetAllEmployee`);
        setEmpId(result.data.data)
    }
    //****************************** Get All Leave  *************************************** */
    const getAllLeave = async () => {
        const result = await axios.get(`${getUrl}GetAllLeaves`);
        setGetAllLeaveList(result.data.data);
    }
    //****************************** Get All Leave Info  *************************************** */
    const leaveInfo = (event, key) => {
        setAddLeaveList(preObj => ({ ...preObj, [key]: event.target.value }));
    }
    //****************************** Get All Leave Info  *************************************** */
    const SaveLeave = async () => {
        const result = await axios.post(`${getUrl}AddLeave`, addleaveList);
        if (result.data.data) {
            alert("Leave Save Success....");
        } else {
            alert(result.data.message);
        }
    }
    //****************************** Edit Leave Info  *************************************** */
    const onEdit = (addLeave) => {
        setAddLeaveList(addLeave);
    }
    //****************************** Update Leave   *************************************** */
    const UpdateLeave = async () => {
        const result = await axios.post(`${getUrl}UpdateLeave`, addleaveList);
        if (result.data.data) {
            alert("Update Leave Success....");
        } else {
            alert(result.data.message);
        }
    }
    //****************************** Delete Leave   *************************************** */
     const onDelete = async (leaveId) =>{
        const result = await axios.get(`${getUrl}DeleteLeaveById?leaveid=` + leaveId);
        if (result.data.data) {
            alert("Delete Leave Success....");
        } else {
            alert(result.data.message);
        }
     }
    useEffect(() => {
        getAllLeave();
        getAllEmpId();
    })
    return (
        <div>
            <div className="container-fluid">
                <div className="row">
                    {JSON.stringify(addleaveList)}
                    <div className="col-8">
                        <div className="card">
                            <div className="card-header bg-info text-center">
                                Get All Leave
                            </div>
                            <div className="card-body">
                                <table className='table table-bordered text-center'>
                                    <thead>
                                        <th>Sr.no</th>
                                        <th>EmpName</th>
                                        <th>EmpId</th>
                                        <th>Leave Date</th>
                                        <th>Leave Reason</th>
                                        <th>Full Day Leave</th>
                                        <th>Half Day Leave</th>
                                        <th>Action</th>
                                    </thead>
                                    <tbody>
                                        {
                                            getAllLeavList.map((addLeave, index) => {
                                                return (
                                                    <tr>
                                                        <td>{index + 1}</td>
                                                        <td>{addLeave.empName}</td>
                                                        <td>{addLeave.employeeId}</td>
                                                        <td>{addLeave.leaveDate}</td>
                                                        <td>{addLeave.leaveReason}</td>
                                                        <td>{addLeave.noOfFullDayLeaves}</td>
                                                        <td>{addLeave.noOfHalfDayLeaves}</td>
                                                        <td>
                                                            <button type="button" className='btn btn-primary' onClick={() => { onEdit(addLeave) }}>Edit</button>
                                                            <button type="button" className='btn btn-danger' onClick={()=>{onDelete(addLeave.leaveId)}}>Del</button>
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
                                Add Leave Info
                            </div>
                            <div className="card-body">
                                <div className="row">

                                    <div className="col-6">
                                        <label htmlFor="">Employee Id</label>
                                        <select name="" id="" value={addleaveList.employeeId} className='form-select' onChange={(event) => { leaveInfo(event, 'employeeId') }} >

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
                                        <label htmlFor="">Leave Reason</label>
                                        <input type="text" value={addleaveList.leaveReason} className='form-control' onChange={(event) => { leaveInfo(event, 'leaveReason') }} />
                                    </div>
                                    <div className="col-6">
                                        <label htmlFor="">No Of Full Day Leaves</label>
                                        <input type="text" value={addleaveList.noOfFullDayLeaves} className='form-control' onChange={(event) => { leaveInfo(event, 'noOfFullDayLeaves') }} />
                                    </div>
                                    <div className="col-6">
                                        <label htmlFor="">No Of Half Day Leaves</label>
                                        <input type="text" value={addleaveList.noOfHalfDayLeaves} className='form-control' onChange={(event) => { leaveInfo(event, 'noOfHalfDayLeaves') }} />
                                    </div>
                                    <div className="col-12">
                                        <label htmlFor="">Leave Date</label>
                                        <input type="datetime-local" value={addleaveList.leaveDate} className='form-control' onChange={(event) => { leaveInfo(event, 'leaveDate') }} />
                                    </div>
                                    <div className="row">
                                        {
                                            addleaveList.leaveId == ' ' && <div className="col-12 text-center mt-2">
                                                <button type="button" className='btn btn-secondary' onClick={SaveLeave}>Save Leave</button>
                                            </div>
                                        }{
                                            addleaveList.leaveId != '' && <div className="col-12 text-center mt-2">
                                                <button type="button" className='btn btn-warning' onClick={UpdateLeave}>Update</button>
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

export default AddLeave;
