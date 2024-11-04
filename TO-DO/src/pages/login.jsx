import { Link } from 'react-router-dom'
import '../assets/css/global.css'
import { Loader } from '../component/Loader'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { AuthContext } from '../utils/context/AuthContext.jsx';

export const Login = () => {
    const notify = (e) => toast(e);
    const { saveToken } = useContext(AuthContext)
    const navigate = useNavigate()

    const [loginData, setLoginData] = useState({
        username : '',
        password : ''
    })

    const [isloading, setIsLoading] = useState(false)

    const loguserIn = async () => {
        if(!loginData.username || !loginData.password){
            return notify("All Fields required")
        }

        try{
            setIsLoading(true)
            const response = await fetch("http://127.0.0.1:8000/api/login/", {
                method : "POST",
                headers : {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify({
                    username : loginData.username,
                    password : loginData.password
                })
            })

            if(response.ok){
                setIsLoading(false)
                const data = await response.json();
                saveToken(data.token);
                notify(data.message)
                console.log(response)
                navigate("/")
            }
            else{
                setIsLoading(false)
                const errorData = await response.json();
                notify(errorData.error || "Login Failed")
            }

        }

        catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false);
        }
        
    }

  return (
    <div className="login">
        <div className="login-page">
            <div className="login_">
                <div className="login_left">
                    <h2>Welcome back 👋</h2>
                    <h2>login to continue where you started</h2>
                    <div className="d">
                        <p>Don&apos;t have an account ? <Link to="/" > register </Link></p>
                    </div>
                </div>

                <div className="login_right">
                    <div className="log_head">
                        <p>Enter your crendentials</p>
                    </div>

                    <div className='logs'>
                        <div className="login_inputs">
                            <div className="username inp">
                                <input 
                                type="text" 
                                name='username' 
                                id='username' 
                                onChange={(e) => {
                                    setLoginData((currentInputValue) => ({...currentInputValue, username : e.target.value}))
                                }} />
                                <label htmlFor="username">Username</label>
                            </div>

                            <div className="password inp">
                                <input 
                                type="password" 
                                name='password' 
                                id='password'
                                onChange={(e) => {
                                    setLoginData((currentInputValue) => ({...currentInputValue, password : e.target.value}))
                                }}
                                />
                                <label htmlFor="password">Password</label>
                            </div>
                        </div>

                        <div className="log_but">
                            <button onClick={loguserIn} >{isloading ? <Loader /> : "Login" }</button>
                        </div>
                    </div>
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
