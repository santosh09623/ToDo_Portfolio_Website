import axios from "axios";
import { useFormik } from "formik";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";


export function UserLogin(){

    const [users , setUsers]  = useState([]);
    const [cookies ,setCookie,removeCookie] = useCookies('userid');
    let navigate = useNavigate();

    useEffect(()=>{
        axios.get('http://127.0.0.1:4000/users')
        .then(response=>{
            setUsers(response.data);
        });

    },[]);

    const formik = useFormik({
        initialValues:{
            UserId:'',
            Password:''
        },
        onSubmit:(formdata)=>{
            var userDetails = users.find(user=> user.UserId===formdata.UserId);
            if(userDetails.Password===formdata.Password) {
                setCookie('userid',formdata.UserId);
                navigate('/dashboard');
                window.location.reload();
            }else{
                navigate('/invalid');
            }


        }

    })



    return(
        <div>
            <form onSubmit={formik.handleSubmit} autoComplete="off" className="bg-light p-2 rounded-2 p-4">
                <h2>User Login</h2>
                    <dl>
                        <dt>User Id</dt>
                        <dd><input type="text" className="form-control" onChange={formik.handleChange} name="UserId"/></dd>
                        <dt>Password</dt>
                        <dd><input type="password" className="form-control" onChange={formik.handleChange} name="Password"/></dd>
                    </dl>
                    <button type="submit" className="btn btn-warning w-100">Login</button>
            </form>
        </div>
    )
}

