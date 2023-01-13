import { createContext, lazy, useState } from 'react';
import './App.css';
import {
  Outlet,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Suspense } from 'react';
import Header from './components/Home/Header/Header';
import Footer from './components/Shared/Footer/Footer';
import Home from './components/Home/Home/Home';
import SignInForm from './components/Login/LoginMain/SignInForm';
import Dashboard from './components/Dashboard/Dashboard/Dashboard';
import AppointMent from './components/AppointMent/AppointMent/AppointMent';
import AllPatients from './components/AppointMent/AllPatients/AllPatients';
import AddDoctor from './components/Dashboard/AddDoctor/AddDoctor';
import DoctorList from './components/Dashboard/DoctorList/DoctorList';
import AddReview from './components/Dashboard/My Review/AddReview';


// import PrivateRoute from './components/Login/PrivateRoute/PrivateRoute';
// import { getDecodeUser } from './components/Login/LoginMain/LoginManager';
// import PageNotFound from './components/Shared/PageNotFound/PageNotFound.jsx';
// import PreLoad from './components/Shared/Preload/PreLoad';

// const Home = lazy(() => import('./components/Home/Home/Home'))

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
  {path: '/', element:<Home/>},
  {path: '/login', element:<SignInForm/>},
  {path: '/dashboard', element:<Dashboard/>},
  {path: '/patients', element:<AllPatients/>},
  {path: '/addDoctor', element:<AddDoctor/>},
  {path: '/appointment', element:<AppointMent/>},
  {path: '/doctors', element:<DoctorList/>},
  {path: '/auth/review', element:<AddReview/>},
])

function App() {
  return (
    <div>
      <RouterProvider router={router}/>
    </div>
    // <Suspense fallback={<PreLoad />}>
    // <Route exact path="*">
    // <PageNotFound />

  );
}
export default App;
