import React, { useState, useEffect } from 'react';
import DashboardLayout from '../DashboardLayout/DashboardLayout';
import useAuthCheck from '../../../redux/hooks/useAuthCheck';
import PatientProfileSetting from './PatientProfileSetting';
import DoctorProfileSetting from './DoctorProfileSetting';
import { Card, Form, Input, Button, Select, DatePicker, message, Avatar, Tabs } from 'antd';
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import { useUpdateDoctorMutation } from '../../../redux/api/doctorApi';
import { useUpdatePatientMutation } from '../../../redux/api/patientApi';
import ImageUploadWithCrop from '../../UI/ImageUploadWithCrop';
import moment from 'moment';
import { doctorSpecialistOptions } from '../../../constant/global';

const ProfileSetting = () => {
    const { role, data } = useAuthCheck();
    const [form] = Form.useForm();
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(data?.img || null);
    const [isImageModalVisible, setIsImageModalVisible] = useState(false);
    const [selectedServices, setSelectedServices] = useState([]);
    
    const [updateDoctor, { isLoading: doctorLoading }] = useUpdateDoctorMutation();
    const [updatePatient, { isLoading: patientLoading }] = useUpdatePatientMutation();

    const isLoading = role === 'doctor' ? doctorLoading : patientLoading;

    useEffect(() => {
        if (data) {
            form.setFieldsValue({
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                phone: data.phone,
                gender: data.gender,
                dob: data.dob ? moment(data.dob) : null,
                address: data.address,
                city: data.city,
                state: data.state,
                country: data.country,
                postalCode: data.postalCode,
                ...(role === 'doctor' && {
                    biography: data.biography,
                    clinicName: data.clinicName,
                    clinicAddress: data.clinicAddress,
                    price: data.price,
                    specialization: data.specialization,
                    degree: data.degree,
                    college: data.college,
                    completionYear: data.completionYear,
                    experienceHospitalName: data.experienceHospitalName,
                    expericenceStart: data.expericenceStart,
                    expericenceEnd: data.expericenceEnd,
                    designation: data.designation,
                    award: data.award,
                    awardYear: data.awardYear,
                    registration: data.registration,
                    year: data.year,
                }),
            });
            if (role === 'doctor' && data.services) {
                setSelectedServices(data.services.split(','));
            }
        }
    }, [data, form, role]);

    const handleImageCropped = (file, preview) => {
        setImageFile(file);
        setImagePreview(preview);
    };

    const handleSubmit = async (values) => {
        try {
            const formData = new FormData();
            
            if (imageFile) {
                formData.append('file', imageFile);
            }

            const dataToSubmit = {
                ...values,
                dob: values.dob ? moment(values.dob).format('YYYY-MM-DD') : undefined,
                ...(role === 'doctor' && { services: selectedServices.join(',') }),
            };

            formData.append('data', JSON.stringify(dataToSubmit));

            if (role === 'doctor') {
                await updateDoctor({ data: formData, id: data.id }).unwrap();
            } else {
                await updatePatient({ data: formData, id: data.id }).unwrap();
            }

            message.success('Profile updated successfully!');
        } catch (error) {
            message.error('Failed to update profile');
        }
    };

    return (
        <DashboardLayout>
            <div className="dashboard-card">
                <div className="dashboard-card-header">
                    <h3 className="dashboard-card-title">Profile Settings</h3>
                </div>

                <Card>
                    <div className="profile-header-section mb-4">
                        <Avatar src={imagePreview} icon={<FaUser />} size={120} />
                        <Button
                            type="primary"
                            onClick={() => setIsImageModalVisible(true)}
                            className="mt-3"
                        >
                            Change Photo
                        </Button>
                    </div>

                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={handleSubmit}
                    >
                        <Tabs
                            items={[
                                {
                                    key: '1',
                                    label: 'Basic Information',
                                    children: (
                                        <>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <Form.Item
                                                        label="First Name"
                                                        name="firstName"
                                                        rules={[{ required: true, message: 'Please enter first name' }]}
                                                    >
                                                        <Input prefix={<FaUser />} size="large" />
                                                    </Form.Item>
                                                </div>
                                                <div className="col-md-6">
                                                    <Form.Item
                                                        label="Last Name"
                                                        name="lastName"
                                                        rules={[{ required: true, message: 'Please enter last name' }]}
                                                    >
                                                        <Input prefix={<FaUser />} size="large" />
                                                    </Form.Item>
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="col-md-6">
                                                    <Form.Item
                                                        label="Email"
                                                        name="email"
                                                        rules={[
                                                            { required: true, message: 'Please enter email' },
                                                            { type: 'email', message: 'Please enter valid email' }
                                                        ]}
                                                    >
                                                        <Input prefix={<FaEnvelope />} size="large" />
                                                    </Form.Item>
                                                </div>
                                                <div className="col-md-6">
                                                    <Form.Item label="Phone" name="phone">
                                                        <Input prefix={<FaPhone />} size="large" />
                                                    </Form.Item>
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="col-md-6">
                                                    <Form.Item label="Gender" name="gender">
                                                        <Select size="large">
                                                            <Select.Option value="male">Male</Select.Option>
                                                            <Select.Option value="female">Female</Select.Option>
                                                            <Select.Option value="other">Other</Select.Option>
                                                        </Select>
                                                    </Form.Item>
                                                </div>
                                                <div className="col-md-6">
                                                    <Form.Item label="Date of Birth" name="dob">
                                                        <DatePicker size="large" style={{ width: '100%' }} format="YYYY-MM-DD" />
                                                    </Form.Item>
                                                </div>
                                            </div>

                                            {role === 'doctor' && (
                                                <Form.Item label="Biography" name="biography">
                                                    <Input.TextArea rows={4} />
                                                </Form.Item>
                                            )}
                                        </>
                                    ),
                                },
                                {
                                    key: '2',
                                    label: 'Contact Details',
                                    children: (
                                        <>
                                            <Form.Item label="Address" name="address">
                                                <Input prefix={<FaMapMarkerAlt />} size="large" />
                                            </Form.Item>

                                            <div className="row">
                                                <div className="col-md-6">
                                                    <Form.Item label="City" name="city">
                                                        <Input size="large" />
                                                    </Form.Item>
                                                </div>
                                                <div className="col-md-6">
                                                    <Form.Item label="State/Province" name="state">
                                                        <Input size="large" />
                                                    </Form.Item>
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="col-md-6">
                                                    <Form.Item label="Country" name="country">
                                                        <Input size="large" />
                                                    </Form.Item>
                                                </div>
                                                <div className="col-md-6">
                                                    <Form.Item label="Postal Code" name="postalCode">
                                                        <Input size="large" />
                                                    </Form.Item>
                                                </div>
                                            </div>

                                            {role === 'doctor' && (
                                                <>
                                                    <h4 className="mt-4 mb-3">Clinic Information</h4>
                                                    <div className="row">
                                                        <div className="col-md-6">
                                                            <Form.Item label="Clinic Name" name="clinicName">
                                                                <Input size="large" />
                                                            </Form.Item>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <Form.Item label="Clinic Address" name="clinicAddress">
                                                                <Input size="large" />
                                                            </Form.Item>
                                                        </div>
                                                    </div>
                                                </>
                                            )}
                                        </>
                                    ),
                                },
                                ...(role === 'doctor' ? [{
                                    key: '3',
                                    label: 'Professional Details',
                                    children: (
                                        <>
                                            <h4 className="mb-3">Services & Specialization</h4>
                                            <Form.Item label="Services" name="services">
                                                <Select
                                                    mode="multiple"
                                                    size="large"
                                                    placeholder="Select services"
                                                    value={selectedServices}
                                                    onChange={setSelectedServices}
                                                    options={doctorSpecialistOptions}
                                                />
                                            </Form.Item>

                                            <Form.Item label="Specialization" name="specialization">
                                                <Input size="large" />
                                            </Form.Item>

                                            <Form.Item label="Consultation Fee (30 min)" name="price">
                                                <Input type="number" prefix="$" size="large" />
                                            </Form.Item>

                                            <h4 className="mt-4 mb-3">Education</h4>
                                            <div className="row">
                                                <div className="col-md-4">
                                                    <Form.Item label="Degree" name="degree">
                                                        <Input size="large" />
                                                    </Form.Item>
                                                </div>
                                                <div className="col-md-4">
                                                    <Form.Item label="College/Institute" name="college">
                                                        <Input size="large" />
                                                    </Form.Item>
                                                </div>
                                                <div className="col-md-4">
                                                    <Form.Item label="Year of Completion" name="completionYear">
                                                        <Input size="large" />
                                                    </Form.Item>
                                                </div>
                                            </div>

                                            <h4 className="mt-4 mb-3">Experience</h4>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <Form.Item label="Hospital Name" name="experienceHospitalName">
                                                        <Input size="large" />
                                                    </Form.Item>
                                                </div>
                                                <div className="col-md-6">
                                                    <Form.Item label="Designation" name="designation">
                                                        <Input size="large" />
                                                    </Form.Item>
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="col-md-6">
                                                    <Form.Item label="From" name="expericenceStart">
                                                        <Input size="large" />
                                                    </Form.Item>
                                                </div>
                                                <div className="col-md-6">
                                                    <Form.Item label="To" name="expericenceEnd">
                                                        <Input size="large" />
                                                    </Form.Item>
                                                </div>
                                            </div>
                                        </>
                                    ),
                                }] : []),
                            ]}
                        />

                        <div className="text-center mt-4">
                            <Button type="primary" htmlType="submit" size="large" loading={isLoading}>
                                Save Changes
                            </Button>
                        </div>
                    </Form>
                </Card>
            </div>

            <ImageUploadWithCrop
                visible={isImageModalVisible}
                onCancel={() => setIsImageModalVisible(false)}
                onImageCropped={handleImageCropped}
                aspect={1}
                maxSizeMB={0.5}
                cropShape="round"
            />
        </DashboardLayout>
    );
};

export default ProfileSetting;
