import React from 'react'
import DashboardLayout from '../DashboardLayout/DashboardLayout'
import DoctorDashCard from '../../UI/DoctorDashCard'
import PatientAppointment from '../../UI/PatientAppointment'

const MainDashboard = () => {
    return (
        <>
            <DashboardLayout>
                <div className="row">
                    <div className="col-md-12">
                        <DoctorDashCard />
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-12">
                        <h4 className="mb-4">Patient Appoinment</h4>
                        <PatientAppointment />
                    </div>
                </div>
            </DashboardLayout>
        </>
    )
}

export default MainDashboard