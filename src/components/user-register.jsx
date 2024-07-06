import { useFormik } from "formik";
import  axios  from "axios";
import { useNavigate } from "react-router-dom";


export function UserRegister(){

    let navigate = useNavigate();

    const formik = useFormik({
        initialValues:{
            UserId:'',
            UserName:'',
            Password:'',
            Mobile:'',
            Email:''
        },
        onSubmit:(user)=>{
            axios.post('http://127.0.0.1:4000/register-user',user);
            alert('Register Successfully...');
            navigate('/login');

        }
    })

    return(
        <div>
            <form className="bg-light p-3 rounded-2" autoComplete="off" onSubmit={formik.handleSubmit}>
                <h2>Register User</h2>
                <dl>
                    <dt>User Id</dt>
                    <dd><input type="text" name="UserId" className="form-control" onChange={formik.handleChange}/></dd>
                    <dt>User Name</dt>
                    <dd><input type="text" name="UserName" className="form-control" onChange={formik.handleChange}/></dd>
                    <dt>Password</dt>
                    <dd><input type="password" name="Password" className="form-control" onChange={formik.handleChange}/></dd>
                    <dt>Mobile</dt>
                    <dd><input type="text" name="Mobile" className="form-control" onChange={formik.handleChange}/></dd>
                    <dt>Email</dt>
                    <dd><input type="email" name="Email" className="form-control" onChange={formik.handleChange}/></dd>
                </dl>
                <button className="btn btn-warning w-100 rounded-2">Register</button>

            </form>
        </div>
    )
}
