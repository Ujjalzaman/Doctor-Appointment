import { createContext } from 'react';
import './App.css';
import {createBrowserRouter,RouterProvider} from "react-router-dom";
import Home from './components/Home/Home/Home';
import SignInForm from './components/Login/LoginMain/SignInForm';
import Dashboard from './components/Dashboard/Dashboard/Dashboard';
import AppointMent from './components/AppointMent/AppointMent/AppointMent';
import AllPatients from './components/AppointMent/AllPatients/AllPatients';
import AddDoctor from './components/Dashboard/AddDoctor/AddDoctor';
import DoctorList from './components/Dashboard/DoctorList/DoctorList';
import AddReview from './components/Dashboard/My Review/AddReview';
import PrivateRoute from './components/Login/PrivateRoute/PrivateRoute';
import DoctorBooking from './components/Booking/DoctorBooking/DoctorBooking';
import BookingCheckout from './components/Booking/BookingCheckout/BookingCheckout';
import BookingSuccess from './components/Booking/BookingSuccess/BookingSuccess';
import BookingInvoice from './components/Booking/BookingInvoice/BookingInvoice';
import DoctorProfile from './components/Doctor/DoctorProfile/DoctorProfile';
import MainDashboard from './components/Doctor/Dashboard/Dashboard';
import Appointments from './components/Doctor/Appointments/Appointments';
export const UserContext = createContext();

const router = createBrowserRouter([
  { path: '/', element: <Home /> },
  { path: '/login', element: <SignInForm /> },
  { path: '/dashboard', element: <Dashboard /> },
  { path: '/patients', element: <AllPatients /> },
  { path: '/addDoctor', element: <AddDoctor /> },
  { path: '/doctors', element: <DoctorList /> },
  { path: '/doctors/profile', element: <DoctorProfile /> },
  { path: '/doctor/dashboard', element: <MainDashboard /> },
  { path: '/doctor/appointments', element: <Appointments /> },
  { path: '/booking', element: <DoctorBooking /> },
  { path: '/booking/checkout', element: <BookingCheckout /> },
  { path: '/booking/success', element: <BookingSuccess /> },
  { path: '/booking/invoice', element: <BookingInvoice /> },
  { path: '/auth/review', element: <AddReview /> },
  {path: '/appointment', element: <PrivateRoute><AppointMent /></PrivateRoute>},
])

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}
export default App;
