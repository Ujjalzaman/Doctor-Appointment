import React from 'react';
import './ProfileSetting.css';
import DashboardLayout from '../DashboardLayout/DashboardLayout';
import PatientProfileSetting from '../../UI/PatientProfileSetting';
import DoctorProfileSetting from '../../UI/DoctorProfileSetting';
import useAuthCheck from '../../../redux/hooks/useAuthCheck';

const ProfileSetting = () => {
    const { data, role } = useAuthCheck();
    return (
        <DashboardLayout>
            {role === 'doctor' ? <DoctorProfileSetting />: <PatientProfileSetting/>}
        </DashboardLayout>
    )
}
export default ProfileSetting;