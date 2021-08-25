import React, { useEffect, useState } from 'react'
import { Login } from './components/login/login';
import { Signup } from './components/signup/signup';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Home from './components/home/home';

function App() {
  const [user, setUser] = useState();

  useEffect(() => {
    console.log("this is the token", user?.token)
  }, [user])

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('profile')))
  }, [])

  const handlelogout = () => {
    window.location.reload();
    JSON.parse(localStorage.clear('profile'));
    setUser(null);


  }

  const Button = () => {
    return (
      <>
        <button onClick={handlelogout}>Logout</button>

      </>
    )
  }

  if (!user) {

  }
  return (
    <Router>
      <Switch>
        {
          user ?
            (
              <>

                <Redirect to={{ pathname: '/home' }} />
                <Route path='/home' exact>
                  <Button />
                  <Home />
                </Route>
              </>
            ) : (
              <>
                <Redirect to={{ pathname: '/login' }} />
                <Route path='/login' exact component={Login} />
                <Route path='/signup' exact component={Signup} />
                <Route path='/home' exact>
                  <Button />
                  <Home />
                </Route>
              </>
            )
        }
      </Switch>
    </Router >
  )
}

export default App
