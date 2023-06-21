import React from "react"
import { auth } from "../firebase"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { Link } from "react-router-dom"

export default function Register(){

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confPassword, setConfPassword] = React.useState('')

  function handleEmailChange(event){
    const value = event.target.value
    setEmail(value)
  }

  function handlePasswordChange(event){
    const value = event.target.value
    setPassword(value)
  }

  function handleConfPasswordChange(event){
    const value = event.target.value
    setConfPassword(value)
  }

  function register(){
    if (password === confPassword){
      createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
          console.log("Registered")
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }

  return(
    <div className="login-form-container">
          <div className="login-form">
               <div className="login-box" >
                     <label htmlFor="input1">Email :</label>
                     <input type="email"
                                    name="email"
                                    id="input1"
                                    value={email}
                                    onChange={handleEmailChange}
                        />
                     <label htmlFor="input1">Password :</label>
                     <input type="password"
                                       name="password"
                                       id="input2"
                                       value={password}
                                       onChange={handlePasswordChange}
                        />
                     <label htmlFor="input1">Confirm Password :</label>
                     <input type="password"
                                               name="confPassword"
                                               id="input3"
                                               value={confPassword}
                                               onChange={handleConfPasswordChange}
                        />
           
                     <button type="submit"
                             onClick={register}>
                             Submit
                      </button>

                      <Link to="/login">
                             Already have Account Login
                      </Link>
               </div>
          </div>
    </div>
  )
}
