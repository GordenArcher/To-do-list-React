import { useEffect, useState } from 'react'
import './App.css'
import AddedTodo from './component/addedTodo'
import EmptyImg from './assets/images/empt.jpg'
import {ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  const [todoInput, setTodoInput] = useState("")
  const [allTodo, setAllTodo] = useState([])
  const notify = () => toast("Added Todo Sucessfully");

  useEffect(() => {
    const savedTodo = JSON.parse(localStorage.getItem("todoItem")) || []
    setAllTodo(savedTodo)
  }, [])

  return (
    <>
      <div className="app">
        <div className="history">
          <div className="view-history">
            {/* <button>View History</button> */}
          </div>
        </div>
        <div className="todo-container">
          <h2 style={{textAlign:'center', fontSize:40}}>Create Your Todo List </h2>
          <div className="todo_sub">
            <form method='get' onSubmit={(e) => {
              e.preventDefault()
              if (!todoInput) return toast("Please Enter Something!");
              const listedTodo = {
                id : Date.now(),
                todo : todoInput,
                isCompleted : false
              }
          
              const q = [...allTodo, listedTodo]
              setAllTodo(q)
              setTodoInput("")
          
              localStorage.setItem("todoItem", JSON.stringify(q))
              notify()
            }}>
              <div className="todo-app">
                <div className="todo_input">
                  <input 
                  type="text" 
                  name='todoInput'
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
                    {allTodo.map((t) => {
                      return <AddedTodo key={t.id} t={t} allTodo={allTodo} setAllTodo={setAllTodo} toast={toast} />
                    })}
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
        theme="light"
        transition: Slide
        />
      </div>

    </>
  )
}

export default App
