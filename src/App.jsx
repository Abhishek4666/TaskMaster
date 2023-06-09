import React from "react"
import { nanoid } from "nanoid"



export default function App(){

  // state variable to store list of tasks
  const [taskList, setTaskList] = React.useState([])

  // state variable to temporarily store currently entering task
  const [task, setTask] = React.useState({
    id: null,
    taskName: "",
    dueDate: ""
  })

  // state variable to store currently editing task
  const [editingTask, setEditingTask] = React.useState(null)

  //
  const [sort, setSort] = React.useState(false)

  // changes the `task` state variable on every keyStroke
  function handleNameChange(event){
    const value = event.target.value
    setTask(prevTask => ({ ...prevTask, taskName: value }))
  }

  // stores the date
  function handleDateChange(event){
    const value = event.target.value
    setTask(prevTask => ({ ...prevTask, dueDate: value }))
  }

  // adds the new task in `taskList` and reset the `task` variable
  function addTask(event){
    if (task.taskName){
      setTaskList(oldTaskList => [...oldTaskList, {id : nanoid(), taskName: task.taskName, dueDate: task.dueDate}])
      setTask({id: null, taskName: "", dueDate: ""})
    }
  }

 // filter out the task to be deleted and removes from `taskList`
  function deleteTask(id){
    setTaskList(oldTaskList => oldTaskList.filter(taskObj => !(taskObj.id === id)))
  }

  // sets the editingTask
  function editTask(id){
    const taskToEdit = taskList.find(task => task.id === id)
    setEditingTask({...taskToEdit})
  }

  function saveTask(){
    setTaskList(prevTaskList => {
        return prevTaskList.map(taskObj =>
        taskObj.id === editingTask.id ? editingTask : taskObj
       );
    });
    setEditingTask(null)
  }

 // looks for changes in editingTask
  function handleChange2(event) {
      const value = event.target.value
      setEditingTask(prevEditingTask => {
        return ({...prevEditingTask, taskName: value})
      })
    }


 // sort function
 function sortTask(){
   const arr = [...taskList]
   arr.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
   return arr

 }

 const arr = sortTask()
 const displayedTask = sort ? arr : taskList
  return(
    <div className="main">
        <div className="form">
             <div className="input-task">
                  <div className="addTask">
                      <label htmlFor="input1">Task : </label>
                      <input
                            type="text"
                            name="taskName1"
                            id="input1"
                            value={task.taskName}
                            onChange={handleNameChange}
                            />
                      <label htmlFor="date">Due Date : </label>
                      <input
                            type="date"
                            name="dueDate"
                            id="date"
                            value={task.dueDate}
                            onChange={handleDateChange}
                            />

                      <button onClick={addTask}>Add Task</button>
                  </div>


                  {editingTask && <div className="editTask">
                      <label htmlFor="input2">Edit Task : </label>
                      <input
                            type="text"
                            name="taskName2"
                            id="input2"
                            value={editingTask.taskName}
                            onChange={handleChange2}
                            />

                      <button onClick={saveTask}>Save Task</button>
                  </div>}

             </div>

             <button onClick={() => setSort(prevState => !prevState)} className="sortButton">
                     <i className="material-icons">sort</i>
             </button>

             <ul>
                  {
                    displayedTask.map(task => {
                      return (
                        <div >
                             <li  key={nanoid()} className="taskItem">

                                 <span className="taskName">{task.taskName}</span>
                                 <span className="taskDate">Due: {new Date(task.dueDate).toLocaleDateString()}</span>
                                 <div className="taskItem-button">
                                     <button onClick={() => deleteTask(task.id)}>
                                             Delete
                                     </button>
                                     <button onClick={() => editTask(task.id)}>
                                             Edit
                                     </button>
                                 </div>

                             </li>

                        </div>
                      )
                    })
                  }
             </ul>

        </div>

    </div>
  )
}
