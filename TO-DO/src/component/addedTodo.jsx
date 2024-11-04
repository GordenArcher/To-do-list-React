import { useState } from 'react'
import DeleteTask from './DeleteTask'
import EditTask from './EditTask'

const AddedTodo = ({ t, setAllTodo, allTodo, toast }) => {

    const [showDelete, setShowDel] = useState(false)
    const [showEdit, setShowEdit] = useState(false)

    const handleIsCompleted = () => {
        const cp = allTodo.map((comp) => {
            if (comp.id === t.id) {
                return {...comp, isCompleted : true}
            }
            else return comp
        })
        localStorage.setItem("todoItem", JSON.stringify(cp))
        setAllTodo(cp)

        toast("Congrats! You Completed Your task")
    }

    const delTask = () => {
        const delTodo = allTodo.filter((del) => del.id !== t.id)
        localStorage.setItem("todoItem", JSON.stringify(delTodo))
        setAllTodo(delTodo)
        toast("Task Deleted")
    }

    const completed = {
        color : 'green',
        alignItems : 'center',
        height : '10px',
    }

  return (
    <>
    <li>
        <div className="view-todo">
            <div className="view" style={t.isCompleted ? completed : null}>
                <div className="main-todo">
                    <h3>{t.todo}</h3>
                    {/* {`${h} - ${m} ${h > 0 && h < 12 ? am : pm} `} */}
                </div>

                <div className="todo-actions">
                    {
                        t.isCompleted ? 
                        <div className='compt'>
                            <h5>Task Completed</h5>
                            <button
                            onClick={() => {
                                const delTodo = allTodo.filter((del) => del.id !== t.id)
                                localStorage.setItem("todoItem", JSON.stringify(delTodo))
                                setAllTodo(delTodo)
                            }}
                            >Remove</button>
                        </div>

                        :

                        <>
                            <div className="edit ac">
                                <button onClick={() => {
                                    setShowEdit((currentEdit) => !currentEdit)
                                }}>
                                    <i className='bi bi-pencil'></i>
                                </button>

                                <p>Edit</p>
                            </div>

                            <div className="delete ac">
                                <button
                                onClick={() => {
                                    setShowDel((currentDel) => !currentDel)
                                }}
                                >
                                    <i className='bi bi-trash'></i>
                                </button>

                                <p>Delete</p>
                            </div>

                            <div className="complete ac">
                                <button 
                                onClick={() => {
                                    handleIsCompleted()
                                }}
                                >
                                    <i className={`bi bi-check-all`}></i>
                                </button>

                                <p>Complete?</p>
                            </div>
                        </>
                    }
                </div>
            </div>
        </div>
    </li>

    {
        showDelete && <DeleteTask t={t} delTask={delTask} setShowDel={setShowDel} />
    }

    {
        showEdit && <EditTask t={t} toast={toast} setShowEdit={setShowEdit} setAllTodo={setAllTodo} allTodo={allTodo} />
    }
    
    </>
  )
}

export default AddedTodo
