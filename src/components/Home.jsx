import React from "react"
import { nanoid } from "nanoid"
import TaskForm from "./TaskForm"
import TaskList from "./TaskList"
import { db, auth } from "../firebase"
import { collection, addDoc, onSnapshot, doc, deleteDoc, updateDoc } from "firebase/firestore"
import { AuthContext } from "../AuthContext"
import { signOut } from "firebase/auth"

export default function Home(){
  const {currentUser, setCurrentUser} = React.useContext(AuthContext)

  const taskCollection = collection(db, currentUser.uid)

  // state variable that stores fetched taskList from firestore
  const [fetchList, setFetchList] = React.useState([])

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

  React.useEffect(() => {
    const unsubscribe = onSnapshot(taskCollection, function(snapshot){
      const tasksArray = snapshot.docs.map(doc => {
        return {...doc.data(), id: doc.id }
      })
      setFetchList(tasksArray)
    })
    return unsubscribe
  }, [])


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


  async function addTask(event){
    if (task.taskName){
      try {
         await addDoc(taskCollection, {taskName: task.taskName, dueDate: task.dueDate})
      } catch (err) {
        console.log(err);
      }

      setTask({id: null, taskName: "", dueDate: ""})
    }
  }

 // filter out the task to be deleted and removes from `taskList`
  async function deleteTask(id){
    const docRef = doc(taskCollection, id)
    await deleteDoc(docRef)
  }

  // sets the editingTask
  function editTask(id){
    const taskToEdit = fetchList.find(task => task.id === id)
    setEditingTask({...taskToEdit})
  }

  function saveTask(){
    const docRef = doc(taskCollection, editingTask.id)
    updateDoc(docRef, {taskName: editingTask.taskName, dueDate: editingTask.dueDate})
    setEditingTask(null)
  }

 // looks for changes in editingTask
  function handleChange2(event) {
      const value = event.target.value
      setEditingTask(prevEditingTask => {
        return ({...prevEditingTask, taskName: value})
      })
    }
  function handleDateChange2(event){
    const value = event.target.value
    setEditingTask(prevEditingTask => {
      return ({...prevEditingTask, dueDate: value})
    })
  }

 // sort function
 function sortTask(){
   const arr = [...fetchList]
   arr.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
   return arr

 }

 function logout(){
   signOut(auth)
     .then(() => {
       setCurrentUser();
       console.log("Logout Successful")
     })
     .catch((err) => console.log(err))
 }

 const arr = sortTask()
 const displayedTask = sort ? arr : fetchList
  return(
    <div className="main">
        <div className="form">

             <TaskForm
                  task = {task}
                  handleNameChange = {handleNameChange}
                  handleDateChange = {handleDateChange}
                  addTask = {addTask}
                  editingTask = {editingTask}
                  handleChange2 = {handleChange2}
                  handleDateChange2 = {handleDateChange2}
                  saveTask = {saveTask}
             />

             {fetchList.length > 0 && <button onClick={() => setSort(prevState => !prevState)} className="sortButton">
                     <i className="material-icons">sort</i>
             </button>}

             <TaskList
                  displayedTask = {displayedTask}
                  deleteTask = {deleteTask}
                  editTask = {editTask}
             />

        </div>
        <button
               className="logout-button"
               onClick={logout}>
               <i className="material-icons">logout</i>
        </button>
    </div>
  )
}
