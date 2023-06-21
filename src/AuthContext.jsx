import React from "react"

export const AuthContext = React.createContext()

export function AuthProvider({ children, value }){
  return(
    <AuthContext.Provider value={value}>
                          {children}
    </AuthContext.Provider>
  )
}
