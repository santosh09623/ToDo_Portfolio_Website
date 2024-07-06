import './App.css';
import { BrowserRouter , Routes, Route, useNavigate} from 'react-router-dom';
import { Link } from 'react-router-dom';
import { UserLogin } from './components/user-login';
import { UserRegister } from './components/user-register';
import { UserDashBoard } from './components/user-dashboard';
import { UserInvalid } from './components/user-invalid';
import { useCookies } from 'react-cookie';


function App() {

  const [cookies, setCookie, removeCookie] = useCookies('userid');
  

  return (
    <div className="container-fluid">
      <div className='bg-shade'>
      <BrowserRouter>
          <header className='text-center p-4'>
              <h1 className='text-white'>To-Do</h1>
              <p className='text-white'>Your Appointments Organizer</p>
             {
                (cookies['userid']===undefined)?
                <div>
                     <Link to="/login" className="btn btn-warning">Existing User Sign in</Link>
                     <Link to="/register" className="btn btn-light ms-2">New User Rester</Link>
                </div>
                :<div className='bg-light p-4'>{cookies['userid']}</div>
             }
          </header>
          <section className='d-flex justify-content-center align-items-center p-4' style={{height:'100vh'}}>
            <Routes>
              <Route path='login' element={<UserLogin />} />
              <Route path='register' element={<UserRegister />} />
              <Route path='dashboard' element={<UserDashBoard />}/>
              <Route path='invalid' element={<UserInvalid />} />
              
            </Routes>
          
          </section>
         
      </BrowserRouter>
      </div>
     
    </div>
  );
}

export default App;
