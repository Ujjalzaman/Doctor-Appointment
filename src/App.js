import { createContext, useState } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Home from './components/Home/Home/Home';
import Dashboard from './components/Dashboard/Dashboard/Dashboard';
import AddDoctor from './components/Dashboard/AddDoctor/AddDoctor';
import AppointMent from './components/AppointMent/AppointMent/AppointMent';
import AllPatients from './components/AppointMent/AllPatients/AllPatients';
import PrivateRoute from './components/Login/PrivateRoute/PrivateRoute';
import SignInForm from './components/Login/LoginMain/SignInForm';
import { getDecodeUser } from './components/Login/LoginMain/LoginManager';
export const UserContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState(getDecodeUser)
  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <Router>
        <Switch>

          <Route exact path="/">
            <Home />
          </Route>

          <Route path="/home">
            <Home />
          </Route>

          <Route path="/login">
            <SignInForm />
          </Route>

          <PrivateRoute path="/allpatient">
            <Dashboard />
          </PrivateRoute>

          <PrivateRoute path="/dashboard">
            <AllPatients />
          </PrivateRoute>

          <PrivateRoute path="/addDoctor">
            <AddDoctor></AddDoctor>
          </PrivateRoute>

          <PrivateRoute path="/get-appointment">
            <AppointMent />
          </PrivateRoute>

        </Switch>
      </Router>
    </UserContext.Provider>

  );
}
export default App;
