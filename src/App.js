import { createContext, lazy, useState } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Outlet,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Suspense } from 'react';
import Header from './components/Home/Header/Header';
import Footer from './components/Shared/Footer/Footer';
import Home from './components/Home/Home/Home';

//previous imported component
// import Home from './components/Home/Home/Home';
// import Dashboard from './components/Dashboard/Dashboard/Dashboard';
// import AppointMent from './components/AppointMent/AppointMent/AppointMent';
// import AllPatients from './components/AppointMent/AllPatients/AllPatients';
// import SignInForm from './components/Login/LoginMain/SignInForm';


// import AddDoctor from './components/Dashboard/AddDoctor/AddDoctor';
// import PrivateRoute from './components/Login/PrivateRoute/PrivateRoute';
// import { getDecodeUser } from './components/Login/LoginMain/LoginManager';
// import PageNotFound from './components/Shared/PageNotFound/PageNotFound.jsx';
// import PreLoad from './components/Shared/Preload/PreLoad';

// const Home = lazy(() => import('./components/Home/Home/Home'))
// const Dashboard = lazy(() => import('./components/Dashboard/Dashboard/Dashboard'))
// const AppointMent = lazy(() => import('./components/AppointMent/AppointMent/AppointMent'))
// const AllPatients = lazy(() => import('./components/AppointMent/AllPatients/AllPatients'))
// const SignInForm = lazy(() => import('./components/Login/LoginMain/SignInForm'))


export const UserContext = createContext();

const Layout = () =>{
  return (
    <>
      <Header/>
      <Outlet/>
      <Footer/>
    </>
  )
}

const router = createBrowserRouter([
  // {
  //   path: '/',
  //   element: <Layout/>,
  //   children: [
  //     {path:'/', element: <Home/>}
  //   ]
  // },
  {path: '/', element:<Home/>}
])

function App() {
  // const [loggedInUser, setLoggedInUser] = useState(getDecodeUser)
  return (
    <div>
      <RouterProvider router={router}/>
    </div>
    // <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
    //   <Router>

    //     <Suspense fallback={<PreLoad />}>
    //       <Switch>

    //         <Route exact path="/">
    //           <Home />
    //         </Route>

    //         <Route path="/home">
    //           <Home />
    //         </Route>

    //         <Route path="/login">
    //           <SignInForm />
    //         </Route>

    //         <PrivateRoute path="/allpatient">
    //           <Dashboard />
    //         </PrivateRoute>

    //         <PrivateRoute path="/dashboard">
    //           <AllPatients />
    //         </PrivateRoute>

    //         <PrivateRoute path="/addDoctor">
    //           <AddDoctor></AddDoctor>
    //         </PrivateRoute>

    //         <PrivateRoute path="/get-appointment">
    //           <AppointMent />
    //         </PrivateRoute>

    //         <Route exact path="*">
    //           <PageNotFound />
    //         </Route>

    //       </Switch>
    //     </Suspense>
    //   </Router>
    // </UserContext.Provider>

  );
}
export default App;
