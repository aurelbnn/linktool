import React, {useState, useContext, createContext} from 'react'

const AuthContext = createContext()

function AuthProvider(props) {

    const [state, setState] = useState({
        isLogged: false,
        token: null,
        user: null,
    })

  // code for pre-loading the user's information if we have their token in
  // localStorage goes here
  // 🚨 this is the important bit.
  // Normally your provider components render the context provider with a value.
  // But we post-pone rendering any of the children until after we've determined
  // whether or not we have a user token and if we do, then we render a spinner
  // while we go retrieve that user's information.

  const localStorageUser = JSON.parse(localStorage.getItem('user'))

  if(localStorageUser != null) {

    const token = window.localStorage.getItem('token')

    if (!state.isLogged) {
      setState({isLogged: true, token: token, user: localStorageUser})
    }
    
  }
  
  const updateUser = (token, username, profilePicture) => {
    const user = {username: username, profilePicture: profilePicture}
    window.localStorage.setItem('user', JSON.stringify(user))
    window.localStorage.setItem('token', token)
    setState({isLogged: true, token: token, user: user})
  }

  const login = (token, username, profilePicture) => {
    const user = {username: username, profilePicture: profilePicture}
    window.localStorage.setItem('user', JSON.stringify(user))
    window.localStorage.setItem('token', token)
    setState({isLogged: true, token: token, user: user})
  } // make a login request
  
  const logout = () => {
    setState({isLogged: false})
    localStorage.removeItem('user')
  } // clear the token in localStorage and the user data
  // note, I'm not bothering to optimize this `value` with React.useMemo here
  // because this is the top-most component rendered in our app and it will very
  // rarely re-render/cause a performance problem.
  return (
    <AuthContext.Provider value={{state, login, logout, updateUser}} {...props} />
  )
}

const useAuth = () => useContext(AuthContext)
export {AuthProvider, useAuth}