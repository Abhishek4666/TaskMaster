import React from "react"
import {nanoid} from "nanoid"

export default function TaskList(props){
  return(
    <ul>
         {
           props.displayedTask.map(task => {
             return (
               <div >
                    <li  key={nanoid()} className="taskItem">

                        <span className="taskName">{task.taskName}</span>
                        <span className="taskDate">Due: {new Date(task.dueDate).toLocaleDateString()}</span>
                        <div className="taskItem-button">
                            <button onClick={() => props.deleteTask(task.id)}>
                                    Delete
                            </button>
                            <button onClick={() => props.editTask(task.id)}>
                                    Edit
                            </button>
                        </div>

                    </li>

               </div>
             )
           })
         }
    </ul>

  )
}
