
import { useContext, useState } from 'react'
import '../App.css'
import AddedTodo from '../component/addedTodo'
import EmptyImg from '../assets/images/empt.jpg'
import {ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FetchTaskData } from '../utils/hooks/fetchTaskData';
import { AuthContext } from '../utils/context/AuthContext';

export const Home = () => {

    const allTodo = FetchTaskData()
    console.log(allTodo)

    const [todoInput, setTodoInput] = useState("")
    const notify = (e) => toast(e);
    const { token } = useContext(AuthContext)
 

    const mtdapisend = "http://127.0.0.1:8000/api/sendtodo/"

    const getTodo = async (e) => {
        e.preventDefault()

        if(!todoInput){
            return notify("Didn't add anything!")
        }

        try {
            const response = await fetch(mtdapisend, {
                method : "POST",
                headers : {
                    'Content-Type':"application/json",
                    'Authorization': `Token ${token}`
                },
                body : JSON.stringify({
                    todo : todoInput
                })
            })

            if(response.ok){
                const data = await response.json()
                console.log(data)
                notify("Added Sucessfully")
                setTodoInput("")
            }else{
                const data = await response.json()
                notify(data.error || "Couldn't add todo")
            }

        } catch (error) {
            console.log(error)
        }
    }


  return (
    <div>
        <div className="app">
        <div className="history">
          <div className="view-history">
          </div>
        </div>
        <div className="todo-container">
          <h2>Create Your Todo List </h2>
          <div className="todo_sub">
            <form onSubmit={getTodo}>
              <div className="todo-app">
                <div className="todo_input">
                  <input 
                  type="text" 
                  name='todo'
                  id='todo-input'
                  value={todoInput}
                  onChange={(e) => {
                    setTodoInput(e.target.value)
                  }}
                  placeholder='Enter Your Todo here '
                  />
                </div>

                <div className="add-todo">
                  <button>Add Todo</button>
                </div>
              </div>
            </form>
          </div>

          <div className="todo-diaplay">
            <div className="added-todo">

              {
                allTodo == 0 ?
                <div>
                  <div className="empty">
                    <p style={{textAlign:'center'}}>No Todo here</p>
                    <img src={EmptyImg} alt="empty todo" />
                  </div>
                </div>

                :

                <div className='td'>
                  <ul>
                    {allTodo.map((t, index) => <AddedTodo key={index} t={t} /> )}
                  </ul>
                </div>
              }
            </div>
          </div>
        </div>
      </div>

      <div>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar
        newestOnTop
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
        theme="dark"
        transition: Slide
        />
      </div>
    </div>
  )
}
