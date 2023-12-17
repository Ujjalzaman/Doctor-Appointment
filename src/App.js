import { createContext } from 'react';
import './App.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from './components/Home/Home/Home';
import SignInForm from './components/Login/SignInForm';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import DoctorBooking from './components/Booking/DoctorBooking/DoctorBooking';
import BookingCheckout from './components/Booking/BookingCheckout/BookingCheckout';
import BookingSuccess from './components/Booking/BookingSuccess/BookingSuccess';
import BookingInvoice from './components/Booking/BookingInvoice/BookingInvoice';
import DoctorProfile from './components/Doctor/DoctorProfile/DoctorProfile';
import MainDashboard from './components/Doctor/Dashboard/Dashboard';
import Appointments from './components/Doctor/Appointments/Appointments';
import MyPatients from './components/Doctor/MyPatients/MyPatients';
import Reviews from './components/Doctor/Reviews/Reviews';
import Schedule from './components/Doctor/Schedule/Schedule';
import ProfileSetting from './components/Doctor/ProfileSetting/ProfileSetting';
import ChangePassword from './components/Doctor/ChangePassword/ChangePassword';
import AdminDashboard from './components/Admin/Dashboard/Dashboard';
import AdminAppointments from './components/Admin/Appointments/Appointments';
import Doctors from './components/Admin/Doctors/Doctors';
import Patients from './components/Admin/Patients/Patients';
import Profile from './components/Admin/Profile/Profile';
import Transactions from './components/Admin/Transactions/Transactions';
import Specialites from './components/Admin/Specialites/Specialites';
import AdminReviews from './components/Admin/Reviews/Reviews'
import PatientFavouriteDoctor from './components/Doctor/PatientFavourite/PatientFavourite';

export const UserContext = createContext();
const router = createBrowserRouter([
  { path: '/', element: <Home /> },
  { path: '/login', element: <SignInForm /> },
  { path: '/doctors/profile', element: <DoctorProfile /> },
  
  { path: '/dashboard', element: <MainDashboard /> },
  { path: '/dashboard/my-patients', element: <MyPatients /> },
  { path: '/dashboard/reviews', element: <Reviews /> },
  { path: '/dashboard/schedule', element: <Schedule /> },
  { path: '/dashboard/appointments', element: <Appointments /> },
  { path: '/dashboard/change-password', element: <ChangePassword /> },
  { path: '/dashboard/profile-setting', element: <ProfileSetting /> },
  { path: '/dashboard/favourite', element: <PatientFavouriteDoctor /> },

  { path: '/booking', element: <DoctorBooking /> },
  { path: '/booking/checkout', element: <BookingCheckout /> },
  { path: '/booking/success', element: <BookingSuccess /> },
  { path: '/booking/invoice', element: <BookingInvoice /> },

  // Dashboard
  { path: '/admin/dashboard', element: <AdminDashboard /> },
  { path: '/admin/appointments', element: <AdminAppointments /> },
  { path: '/admin/doctors', element: <Doctors /> },
  { path: '/admin/patients', element: <Patients /> },
  { path: '/admin/profile', element: <Profile /> },
  { path: '/admin/reviews', element: <AdminReviews /> },
  { path: '/admin/transaction', element: <Transactions /> },
  { path: '/admin/specialites', element: <Specialites /> },

  // { path: '/auth/review', element: <AddReview /> },
  // { path: '/appointment', element: <PrivateRoute><AppointMent /></PrivateRoute> },
])

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}
export default App;
