import React from 'react'

const AddedTodo = ({ t }) => {
  return (
    <li>
        <div className="view-todo">
            <div className="view">
                <div className="main-todo">
                    <h3>{t.todo}</h3>
                </div>

                <div className="todo-actions">
                    <div className="edit ac">
                        <button>
                            <i className='bi bi-pencil'></i>
                        </button>
                    </div>

                    <div className="delete ac">
                        <button>
                            <i className='bi bi-trash'></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </li>
  )
}

export default AddedTodo