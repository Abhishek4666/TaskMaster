import React from "react"
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom"
import { onAuthStateChanged } from "firebase/auth"
import { collection, doc, setDoc } from "firebase/firestore"
import { AuthProvider } from "./AuthContext"
import { auth, db } from "./firebase"
import Register from "./components/Register"
import Login from "./components/Login"
import Home from "./components/Home"

export default function App(){

  const [currentUser, setCurrentUser] = React.useState()
  //const navigate = useNavigate()

  React.useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user){
        if (user.metadata.creationTime === user.metadata.lastSignInTime){
          const userCollection = collection(db, "users")
          const userDoc = doc(userCollection, user.uid)
          setDoc(userDoc, {email: user.email, user_id: user.uid})
            .then()
            .catch(err => console.log(err))
        }
        setCurrentUser(user);
      }
      //navigate('/');
    })
  }, [])

  return (
    <BrowserRouter>
          <AuthProvider value={{currentUser, setCurrentUser}}>
                <Routes>
                    <Route exact path="/" element={currentUser ? <Home /> : <Login />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Routes>
          </AuthProvider>
    </BrowserRouter>
  )
}
