import { Link, useNavigate } from 'react-router-dom'
import '../assets/css/global.css'
import { useContext, useState } from 'react'
import { Loader } from '../component/Loader'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from '../utils/context/AuthContext.jsx';


export const Register = () => {
    const notify = (e) => toast(e);
    const navigate = useNavigate()
    const { saveToken } = useContext(AuthContext)


    const [isloading, setIsLoading] = useState(false)

    const [registeruser, setRegisterUser] = useState({
        username : "",
        email : "",
        password : "",
        password2 : "",
    })

    const RegisterUserApi = "http://127.0.0.1:8000/api/register/"

    const registerUser = async (e) => {
        e.preventDefault()

        if (!registeruser.username || !registeruser.email || !registeruser.password || !registeruser.password2) {
            return notify("All fields are required");
        }

        if (registeruser.password !== registeruser.password2) {
            setIsLoading(false);
            return notify("Passwords do not match");
        }
        
        try {

            setIsLoading(true)
            const response = await fetch(RegisterUserApi, {
                method : 'POST',
                headers : {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify({
                    username : registeruser.username,
                    email : registeruser.email,
                    password : registeruser.password,
                    password2 : registeruser.password2,
                })
            })

            if (response.ok) {
                setIsLoading(false)
                const data = await response.json();
                saveToken(data.token);
                notify(`${registeruser.username} registered sucessful`);
                console.log(response)
                setTimeout(() => {
                 navigate('/auth/login');
                }, 2000)
            }else{
                const errorData = await response.json();
                notify(errorData.error || "Registeration Failed")
                setIsLoading(false)
            }

        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }

  return (
    <div className="login">
        <div className="login-page">
            <div className="login_">
                <div className="login_left">
                    <h2>Hey there 👋</h2>
                    <h2>Ready to make some TODO LIST!! Register</h2>
                    <div className="d">
                        <p>Already have an account ? <Link to="/auth/login" > Login </Link></p>
                    </div>
                </div>

                <div className="login_right">
                    <div className="log_head">
                        <p>Enter your crendentials</p>
                    </div>

                    <form className='logs' 
                    onSubmit={(e) => registerUser(e)}
                    >
                        <div className="login_inputs">
                            <div className="username inp">
                                <input type="text" name='username' id='username' value={registeruser.username} 
                                onChange={(e) => {
                                    setRegisterUser((currentInputValue) => ({
                                        ...currentInputValue, username : e.target.value
                                    }))
                                }}
                                />
                                <label htmlFor="username">Username</label>
                            </div>

                            <div className="email inp">
                                <input type="email" name='email' id='email' value={registeruser.email}
                                onChange={(e) => {
                                    setRegisterUser((currentInputValue) => ({
                                        ...currentInputValue, email : e.target.value
                                    }))
                                }} 
                                />
                                <label htmlFor="email">Email</label>
                            </div>

                            <div className="password inp">
                                <input type="password" name='password' id='password' value={registeruser.password} 
                                onChange={(e) => {
                                    setRegisterUser((currentInputValue) => ({
                                        ...currentInputValue, password : e.target.value
                                    }))
                                }}
                                />
                                <label htmlFor="password">Password</label>
                            </div>

                            <div className="password inp">
                                <input type="password" name='password2' id='password2' value={registeruser.password2}  
                                onChange={(e) => {
                                    setRegisterUser((currentInputValue) => ({
                                        ...currentInputValue, password2 : e.target.value
                                    }))
                                }}
                                />
                                <label htmlFor="password">Confirm Password</label>
                            </div>
                        </div>

                        <div className="log_but">
                            <button>
                                {isloading ? <Loader /> : "Register" }
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

        <ToastContainer
            position="top-center"
            autoClose={3000}
            hideProgressBar
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
        />
    </div>
  )
}
