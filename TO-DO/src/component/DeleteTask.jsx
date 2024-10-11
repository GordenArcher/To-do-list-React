import React from 'react'

const DeleteTask = ({ t, setShowDel , delTask}) => {

  return (
    <div className='delete-task'>
        <div className="shadow">
            <div className="del-task-cont">
                <h3>Are you sure You wanna delete this Task ?</h3>
            </div>

            <div className="h">
                <h1>"{t.todo}"</h1>
            </div>

            <div className="options">
                <button
                onClick={() => {
                    setShowDel((currentState) => !currentState)
                }}
                >No</button>

                <button className='yes' 
                onClick={() => {
                    delTask()
                    setShowDel((currentState) => !currentState)
                }}
                >Yes</button>
            </div>
        </div>
    </div>
  )
}

export default DeleteTask