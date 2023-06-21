import React from "react"
import { auth } from "../firebase"
import { signInWithEmailAndPassword } from "firebase/auth"
import { Link } from "react-router-dom"

export default function Login(){

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  function handleEmailChange(event){
    const value = event.target.value
    setEmail(value)
  }

  function handlePasswordChange(event){
    const value = event.target.value
    setPassword(value)
  }

  function login(){
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        console.log("Logged In")
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return(
    <div className="login-form-container" >
          <div className="login-form">
                <div className="login-box">
                    <label htmlFor="input1">Email :</label>
                    <input type="email"
                                    name="email"
                                    id="input1"
                                    value={email}
                                    onChange={handleEmailChange}
                        />

                    <label htmlFor="input2">Password :</label>
                    <input type="password"
                                    name="password"
                                    id="input2"
                                    value={password}
                                    onChange={handlePasswordChange}
                        />

                     <button type="submit"
                            onClick={login}>
                            Login
                     </button>

                     <Link to="/register">
                            Create Account
                     </Link>
                </div>

          </div>

      </div>
  )
}
