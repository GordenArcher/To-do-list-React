import React, { useState } from 'react'

const EditTask = ({ t, setShowEdit, setAllTodo, allTodo, toast }) => {
    const [editValue, setEditValue] = useState(t.todo)

    const savedTodo = () => {
        const save = allTodo.map((s) => {
            if (s.id === t.id) {
                return {...s, todo : editValue}
            }
            else return s
        })

        setAllTodo(save)
        setShowEdit(false)
        localStorage.setItem("todoItem", JSON.stringify(save))
        toast("Task Changed Sucessfully")
    } 
  return (
    <div className='edit-task'>
        <div className="edit-container">
            <h2>Edit Task</h2>

            <div className="edit-main">
                <div className="edit-input">
                    <input 
                    type="text" 
                    name='edit'
                    id='edit'
                    value={editValue}
                    onChange={(e) => {
                        setEditValue(e.target.value)
                    }}
                    />
                </div>

                <div className="options">
                    <button
                    onClick={() => {
                        setShowEdit((currentEdit) => !currentEdit)
                    }}
                    >Cancel</button>

                    <button
                    onClick={() => savedTodo()}
                    >Save</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default EditTask