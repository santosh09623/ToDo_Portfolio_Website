import axios from "axios";
import { useEffect } from "react";
import { useCookies } from "react-cookie"
import { useNavigate } from "react-router-dom";
import {useState} from "react";
import { useFormik } from "formik";


export function UserDashBoard(){

    const [cookies, setCookie, removeCookie] = useCookies('userid');
    const [appointments, setAppointments] = useState([{Appointment_Id:0, Title:'',Description:'', Date:''}]);
    const [EditTasks, setEditTasks] = useState([{Appointment_Id:0, Title:'',Description:'', Date:''}]);
    let navigate = useNavigate();
    
    useEffect(()=>{
        axios.get(`http://127.0.0.1:4000/appointments/${cookies['userid']}`)
        .then(response=>{
            setAppointments(response.data);
        })
    },[]);


    function handleSignout(){
        removeCookie('userid');
        navigate('/login');
        window.location.reload();
    }

    function handleCloseClick(e){
        axios.delete(`http://127.0.0.1:4000/delete-task/${e.target.name}`)
        .then(()=>{
            alert('Appointment Deleted...!')
        });
        window.location.reload();

    }
    const formik = useFormik({
        initialValues: {
            Appointment_Id:'',
            Title:'',
            Description:'',
            Date:new Date(),
            UserId:cookies['userid']
        },
        onSubmit: (task)=>{
            axios.post('http://127.0.0.1:4000/add-task',task);
            alert('Task Added Successfully...!');
            window.location.reload();
        }
    })

    function handleEditClick(id){
        axios.get(`http://127.0.0.1:4000/get-task/${id}`)
        .then(response=>{
            setEditTasks(response.data);      
        })

    }

    const editFormik = useFormik({
        
        initialValues:{
            Appointment_Id:EditTasks[0].Appointment_Id,
            Title:EditTasks[0].Title,
            Description:EditTasks[0].Description,
            Date:`${EditTasks[0].Date.slice(0,EditTasks[0].Date.indexOf("T"))}`,
            UserId:EditTasks[0].UserId
        },
        onSubmit:(task)=>{
            axios.put(`http://127.0.0.1:4000/edit-task/${task.Appointment_Id}`,task);
            alert('Task Edited successfully....!');
            window.location.reload();

        },
        enableReinitialize:true
        
    })

    return(
       <div className="bg-light p-4" style={{height:'100vh', width:'100%'}}>
             <h2>Your Appointments <button onClick={handleSignout} className='btn btn-warning'>Signout</button></h2>
             <div className="mb-3">
                <button data-bs-target="#addTask" data-bs-toggle="modal" className="btn btn-primary bi bi-calendar-check">Add Appointments</button>
                <div className="modal fade" id="addTask">
                    <div className="modal-dialog modal-dialog-centered">
                       <div className="modal-content">
                             <div className="modal-header">
                                <h2>Add Appointment</h2>
                                <button data-bs-dismiss="modal" className="btn btn-close"></button>
                            </div>
                                <div className="modal-body">
                                <form onSubmit={formik.handleSubmit}>
                                    <dl>
                                        <dt>Appointment Id</dt>
                                        <dd><input onChange={formik.handleChange} type="text" className="form-control" value={formik.values.Appointment_Id} name="Appointment_Id"/></dd>
                                        <dt>Title</dt>
                                        <dd><input onChange={formik.handleChange} type="text" className="form-control" name="Title"/></dd>
                                        <dt>Description</dt>
                                        <dd>
                                            <textarea onChange={formik.handleChange} rows="4" className="form-control" cols="40" name="Description"></textarea>
                                        </dd>
                                        <dt>Date</dt>
                                        <dd>
                                            <input onChange={formik.handleChange} type="date" className="form-control" name="Date"/>
                                        </dd>
                                    </dl>
                                    <button type="submit" className="btn btn-warning">Add Task</button>
                                </form>
                            </div>
                       </div>
                    </div>
                </div>
             </div>
             {
                appointments.map(appointment=>
                    <div key={appointment.Appointment_Id} className="alert alert-success alert-dismissible">
                          <button name={appointment.Appointment_Id} className="btn btn-close" data-bs-dismiss="alert" onClick={handleCloseClick}></button>
                          <h2>{appointment.Title}</h2>
                          <p>{appointment.Description}</p>
                          <p>{appointment.Date}</p>
                          <button onClick={()=> handleEditClick(appointment.Appointment_Id)} data-bs-target="#editTask" data-bs-toggle="modal" className="btn btn-warning bi bi-pen-fill">Edit</button>
                      
                    </div>
                )
             }
             <div className="modal fade" id="editTask">
                    <div className="modal-dialog modal-dialog-centered">
                       <div className="modal-content">
                             <div className="modal-header">
                                <h2>EditTask</h2>
                                <button data-bs-dismiss="modal" className="btn btn-close"></button>
                            </div>
                                <div className="modal-body">
                                <form onSubmit={editFormik.handleSubmit}>
                                    <dl>
                                        <dt>Title</dt>
                                        <dd><input value={editFormik.values.Title} onChange={editFormik.handleChange} type="text" name="Title" className="form-control"/></dd>
                                        <dt>Description</dt>
                                        <dd>
                                            <textarea value={editFormik.values.Description} onChange={editFormik.handleChange} rows="4" cols="40" className="form-control" name="Description"></textarea>
                                        </dd>
                                        <dt>Date</dt>
                                        <dd>
                                            <input value={editFormik.values.Date} onChange={editFormik.handleChange} type="date" className="form-control" name="Date"/>
                                        </dd>
                                    </dl>
                                    <button type="submit" className="btn btn-success">Save</button>
                                </form>
                            </div>
                       </div>
                    </div>
                </div>

       </div>
    )
}




