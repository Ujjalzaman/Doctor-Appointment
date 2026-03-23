import { Checkbox, message, Card, Input, Select } from 'antd';
import { useEffect, useState } from 'react';
import useAuthCheck from '../../redux/hooks/useAuthCheck';
import { visitReasonOptions } from '../../constant/global';
import '../../components/Appointment/AppointmentFlow.css';

const { TextArea } = Input;

const PersonalInformation = ({ handleChange, selectValue, setPatientId = () => {} }) => {
  const { firstName, lastName, email, phone, reasonForVisit, description, address, problemType } = selectValue;
  const [checked, setChecked] = useState(false);
  const { data } = useAuthCheck();

  const onChange = (e) => setChecked(e.target.checked);

  const onFieldChange = (name, value) => {
    handleChange({ target: { name, value } });
  };

  useEffect(() => {
    if (checked) {
      if (data?.id) {
        setPatientId(data.id);
        message.success('Your account details have been linked.');
      } else {
        message.warning('Please log in to link your account.');
      }
    }
  }, [checked, data, setPatientId]);

  return (
    <div className="appointment-step appointment-step--patient">
      <p className="appointment-step__title">Patient information</p>
      <p className="appointment-step__subtitle">Please provide your details and reason for the visit.</p>

      <Card className="patient-form-card" size="small">
        <p className="patient-form-card__title">Account</p>
        <Checkbox checked={checked} onChange={onChange}>
          I already have an account — use my saved details
        </Checkbox>
      </Card>

      <Card className="patient-form-card" size="small">
        <p className="patient-form-card__title">Personal details</p>
        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label">First name</label>
            <Input
              placeholder="First name"
              name="firstName"
              value={firstName || ''}
              onChange={(e) => handleChange(e)}
              size="large"
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Last name</label>
            <Input
              placeholder="Last name"
              name="lastName"
              value={lastName || ''}
              onChange={(e) => handleChange(e)}
              size="large"
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Email</label>
            <Input
              type="email"
              placeholder="email@example.com"
              name="email"
              value={email || ''}
              onChange={(e) => handleChange(e)}
              size="large"
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Phone</label>
            <Input
              placeholder="Phone number"
              name="phone"
              value={phone || ''}
              onChange={(e) => handleChange(e)}
              size="large"
            />
          </div>
          <div className="col-12">
            <label className="form-label">Address (optional)</label>
            <Input
              placeholder="Street, city, state, ZIP"
              name="address"
              value={address || ''}
              onChange={(e) => handleChange(e)}
              size="large"
            />
          </div>
        </div>
      </Card>

      <Card className="patient-form-card" size="small">
        <p className="patient-form-card__title">Visit details</p>
        <div className="row g-3">
          <div className="col-12">
            <label className="form-label">Type of visit / Problem</label>
            <Select
              placeholder="Select type of visit"
              options={visitReasonOptions}
              value={problemType || undefined}
              onChange={(value) => onFieldChange('problemType', value)}
              allowClear
              style={{ width: '100%' }}
              size="large"
            />
          </div>
          <div className="col-12">
            <label className="form-label">Reason for visit *</label>
            <TextArea
              rows={3}
              placeholder="Describe your main reason for this appointment, symptoms, or concerns."
              name="reasonForVisit"
              value={reasonForVisit || ''}
              onChange={(e) => handleChange(e)}
              size="large"
            />
          </div>
          <div className="col-12">
            <label className="form-label">Additional notes (optional)</label>
            <TextArea
              rows={2}
              placeholder="Any other details you want the doctor to know (medications, allergies, etc.)."
              name="description"
              value={description || ''}
              onChange={(e) => handleChange(e)}
              size="large"
            />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default PersonalInformation;
