import React, { useEffect, useState } from 'react';
import axios from 'axios';
const EmpAddAttendance = () => {
    const getUrl = "https://onlinetestapi.gerasim.in/api/TeamSync/"
    const [empId, setEmpId] = useState([]);
    const [getAllAttendanceList, setGetAllAttendanceList] = useState([]);
    const [fillAttendance, setFillAttendance] = useState(
        {
            "attendanceId": 0,
            "employeeId": 0,
            "attendanceDate": "",
            "inTime": "",
            "outTime": "",
            "isFullDay": false
        }
    )
    //*************************** FILL ATTENDANCE ************************************** */

    const attendanceFill = (event, key) => {
        setFillAttendance(preObj => ({ ...preObj, [key]: event.target.value }));
        if (key === "isFullDay") {
            const isChecked = event.target.checked;
            setFillAttendance((preObj) => ({ ...preObj, isFullDay: isChecked }))
        }

    }

    const getAllEmpId = async () => {
        const result = await axios.get(`${ getUrl }GetAllEmployee`);
        setEmpId(result.data.data)
    }
    //*************************** SAVE ATTENDANCE ************************************** */

    const addAttendance = async () => {
        const result = await axios.post(`${ getUrl }AddAttendance`, fillAttendance);
        if (result.data.data) {
            alert("Attendance Fill success...");
            getAllAttendance();
        } else {
            alert(result.data.message);
        }
    }
    //*ATTENDANCE LIST ************************************** */

    const getAllAttendance = async () => {
        const result = await axios.get(`${ getUrl }GetAllAttendance`);
        setGetAllAttendanceList(result.data.data);
    }
    //*************************** EDIT ATTENDANCE ************************************** */
    const onEdit = (editInfo) => {
        setFillAttendance(editInfo);
    }
    //********************* UPDATE ATTENDANCE  ************************* */
    const updateAttendance = async () => {
        const result = await axios.post(`${ getUrl }UpdateAttendance`, fillAttendance);
        if (result.data.data) {
            alert("Attendance update success...");
            getAllAttendance();


        } else {
            alert(result.data.message);
        }
    }
    //*************************** DELETE ATTENDANCE ************************************** */

    const onDelete = async (attendanceId) => {
        const result = await axios.get(`${ getUrl }DeleteAttendanceById?attendanceid=` + attendanceId);
        if (result.data.data) {
            alert("Attendance delete success...");
            getAllAttendance();
        } else {
            alert(result.data.message);
        }
    }

    useEffect(() => {
        getAllAttendance();
        getAllEmpId();
    }, [])
    return (
        <div>
            {JSON.stringify(fillAttendance)}
            <div className="container-fluid">
                <div className="row">
                    <div className="col-8">
                        <div className="card">
                            <div className="card-header bg-info text-center">
                                <h5>Employee Attendances List</h5>
                            </div>
                            <div className="card-body">
                                <table className='table table-bordered text-center'>
                                    <thead>
                                        <th>Sr.No</th>
                                        <th>Emp name</th>
                                        <th>Emp Id</th>
                                        <th>Attend Date</th>
                                        <th>In-Time</th>
                                        <th>Out-Time</th>
                                        <th>Action</th>
                                    </thead>
                                    <tbody>
                                        {
                                            getAllAttendanceList.map((fillAttend, index) => {
                                                return (
                                                    <tr>
                                                        <td>{index + 1}</td>
                                                        <td>{fillAttend.empName}</td>
                                                        <td>{fillAttend.employeeId}</td>
                                                        <td>{fillAttend.attendanceDate}</td>
                                                        <td>{fillAttend.inTime}</td>
                                                        <td>{fillAttend.outTime}</td>
                                                        <td>
                                                            <button type="button" className='btn btn-primary' onClick={() => { onEdit(fillAttend) }}>Edit</button>
                                                            <button type="button" className='btn btn-danger' onClick={() => { onDelete(fillAttend.attendanceId) }}>Delete</button>
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
                                <h5>Employee Attendances</h5>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-6">
                                        <label htmlFor="">Employee Id</label>
                                        <select name="" id="" className='form-select' value={fillAttendance.employeeId} onChange={(event) => { attendanceFill(event, 'employeeId') }}>
                                            <option ></option>
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
                                        <label htmlFor="">Attendance Date</label>
                                        <input type="datetime-local" className='form-control' value={fillAttendance.attendanceDate} onChange={(event) => { attendanceFill(event, 'attendanceDate') }} />
                                    </div>
                                    <div className="col-6">
                                        <label htmlFor="">InTime</label>
                                        <input type="datetime-local" className='form-control' value={fillAttendance.inTime} onChange={(event) => { attendanceFill(event, 'inTime') }} />
                                    </div>
                                    <div className="col-6">
                                        <label htmlFor="">OutTime</label>
                                        <input type='datetime-local' className='form-control' value={fillAttendance.outTime} onChange={(event) => { attendanceFill(event, 'outTime') }} />
                                    </div>
                                    <div className='col-6'>
                                        <input type='checkbox' className='form-check-input' value={fillAttendance.isFullDay} onChange={(event) => { attendanceFill(event, 'isFullDay') }} /><label>Full Day</label>
                                    </div>


                                </div>
                                <div className="row">
                                    {
                                        fillAttendance.attendanceId == '' && <div className="col-12 mt-2 text-center">

                                            <button type="button" className='btn btn-success' onClick={addAttendance}>Save Attendance</button>
                                        </div>
                                    }
                                    {
                                        fillAttendance.attendanceId != '' && <div className="col-12 mt-2 text-center">
                                            <button type="button" className='btn btn-warning' onClick={updateAttendance}>Update Attendance</button>
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

export default EmpAddAttendance;