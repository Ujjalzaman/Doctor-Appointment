import React from 'react'
import DashboardLayout from '../DashboardLayout/DashboardLayout'
import DoctorDashCard from '../../UI/DoctorDashCard'
import PatientAppointment from '../../UI/PatientAppointment'
import useAuthCheck from '../../../redux/hooks/useAuthCheck'
import PatientAppointments from '../../UI/PatientAppointments'

const MainDashboard = () => {
    const { authChecked, data, role } = useAuthCheck();
    return (
        <>
            <DashboardLayout>
                <div className="row">
                    <div className="col-md-12">
                        {role === 'doctor' && <DoctorDashCard />}
                    </div>
                </div>

                <div className="row">
                    {role === 'patient' ?
                        <div className="col-md-12">
                            <h4 className="mb-4">My Appointments</h4>
                            <PatientAppointments />
                        </div>
                        :
                        <div className="col-md-12">
                            <h4 className="mb-4">Patient Appoinments</h4>
                            <PatientAppointment />
                        </div>
                    }

                </div>
            </DashboardLayout>
        </>
    )
}

export default MainDashboard