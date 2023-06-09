import React from "react"

export default function TaskForm(props){
  return(
    <div className="input-task">

         {!props.editingTask && <div className="addTask">

             <label htmlFor="input1">Task : </label>
             <input
                   type="text"
                   name="taskName1"
                   id="input1"
                   value={props.task.taskName}
                   onChange={props.handleNameChange}
                   />

             <label htmlFor="date">Due Date : </label>
             <input
                   type="date"
                   name="dueDate"
                   id="date"
                   value={props.task.dueDate}
                   onChange={props.handleDateChange}
                   />

             <button onClick={props.addTask}>Add Task</button>

         </div>}


         {props.editingTask && <div className="editTask">

             <label htmlFor="input2">Edit Task : </label>
             <input
                   type="text"
                   name="taskName2"
                   id="input2"
                   value={props.editingTask.taskName}
                   onChange={props.handleChange2}
                   />

             <label htmlFor="date2">Edit Due Date : </label>
             <input
                type="date"
                name="dueDate2"
                id="date2"
                value={props.editingTask.dueDate}
                onChange={props.handleDateChange2}
                />
             <button onClick={props.saveTask}>Save Task</button>

         </div>}

    </div>
  )
}
