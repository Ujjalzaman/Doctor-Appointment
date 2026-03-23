import React, { useMemo } from 'react';
import { Modal, Progress, List, Button, Spin, Alert } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import { useGetDoctorQuery } from '../../redux/api/doctorApi';
import { getUserInfo } from '../../service/auth.service';
import { getDoctorProfileProgress } from '../../utils/doctorProfileCompletion';

/**
 * For doctors: blocks the dashboard with a modal until required profile fields are filled.
 * Profile settings stay reachable so the doctor can complete the form.
 */
const DoctorProfileCompletionGate = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const onProfileSettings = location.pathname.includes('/dashboard/profile-setting');

    const auth = getUserInfo();
    const userId = auth?.userId;
    const isDoctor = auth?.role === 'doctor';

    const { data: doctor, isLoading, isFetching } = useGetDoctorQuery(userId, {
        skip: !isDoctor || !userId,
    });

    const { percent, missing, complete } = useMemo(
        () => getDoctorProfileProgress(doctor),
        [doctor]
    );

    if (!isDoctor) {
        return children;
    }

    if (isLoading || isFetching) {
        return (
            <div className="d-flex justify-content-center align-items-center py-5">
                <Spin size="large" />
            </div>
        );
    }

    if (complete) {
        return children;
    }

    if (onProfileSettings) {
        return (
            <>
                <Alert
                    className="mb-3"
                    type="warning"
                    showIcon
                    message="Profile incomplete"
                    description={
                        <>
                            <Progress percent={percent} size="small" className="mb-2" />
                            <span>Finish the required fields below to unlock the rest of the dashboard.</span>
                        </>
                    }
                />
                {children}
            </>
        );
    }

    return (
        <>
            <Modal
                open
                closable={false}
                maskClosable={false}
                keyboard={false}
                footer={[
                    <Button
                        key="profile"
                        type="primary"
                        onClick={() => navigate('/dashboard/profile-setting')}
                    >
                        Complete profile
                    </Button>,
                ]}
                title="Complete your professional profile"
            >
                <p className="mb-3">
                    Your account is active, but patients need a complete profile before you can use the
                    dashboard. Finish the items below — progress updates as you save in profile settings.
                </p>
                <Progress percent={percent} status={percent === 100 ? 'success' : 'active'} />
                <List
                    className="mt-3"
                    size="small"
                    header="Still needed"
                    dataSource={missing}
                    renderItem={(item) => <List.Item>{item}</List.Item>}
                />
            </Modal>
            <div aria-hidden className="doctor-profile-gate-placeholder" style={{ minHeight: '40vh' }} />
        </>
    );
};

export default DoctorProfileCompletionGate;
