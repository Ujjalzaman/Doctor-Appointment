import { Button } from 'antd';
import moment from 'moment';
import { FaBriefcase, FaRegClock, FaLocationArrow, FaLink, FaCalendarAlt } from 'react-icons/fa';
import { doctorTimeSlot } from '../../constant/global';
import './AppointmentFlow.css';
import './index.css';

const SelectApppointment = ({ selectedDate, handleDateChange, selectTime, setSelectTime, selectedDoctor }) => {
  const handleSelectTime = (time) => setSelectTime(time);

  const amTimeSlot = doctorTimeSlot.filter((item) => item.includes('AM'));
  const pmTimeSlot = doctorTimeSlot.filter((item) => item.includes('PM'));

  const next7Days = Array.from({ length: 7 }, (_, i) => moment().clone().add(i + 1, 'days'));

  const fullName = selectedDoctor
    ? `Dr. ${(selectedDoctor.firstName || '')} ${(selectedDoctor.lastName || '')}`.trim() || 'Doctor'
    : 'Doctor';

  return (
    <div className="appointment-step appointment-step--datetime">
      <p className="appointment-step__title">Select date & time</p>
      <p className="appointment-step__subtitle">Pick an available slot for your appointment.</p>

      <div className="datetime-summary">
        <div className="datetime-summary__row">
          <FaBriefcase className="icon" />
          <span className="datetime-summary__label">Doctor</span>
          <span className="datetime-summary__value">{fullName}</span>
        </div>
        <div className="datetime-summary__row">
          <FaRegClock className="icon" />
          <span className="datetime-summary__label">Duration</span>
          <span className="datetime-summary__value">30 min</span>
        </div>
        <div className="datetime-summary__row">
          <FaLocationArrow className="icon" />
          <span className="datetime-summary__label">Location</span>
          <span className="datetime-summary__value">Sylhet, Bangladesh · Zoom Meeting</span>
        </div>
        {(selectedDate || selectTime) && (
          <div className="datetime-summary__row">
            <FaCalendarAlt className="icon" />
            <span className="datetime-summary__label">Selected</span>
            <span className="datetime-summary__value">
              {selectedDate && moment(selectedDate).format('LL')}
              {selectTime && ` · ${selectTime}`}
            </span>
          </div>
        )}
      </div>

      <p className="appointment-step__subtitle" style={{ marginBottom: '0.5rem' }}>
        {selectedDate ? `Selected date: ${moment(selectedDate).format('LL')}` : 'Pick a date'}
      </p>
      <div className="datetime-dates">
        {next7Days.map((day) => {
          const isActive =
            selectedDate && moment(selectedDate).format('YYYY-MM-DD') === day.format('YYYY-MM-DD');
          return (
            <div
              key={day.valueOf()}
              className={`datetime-date-card ${isActive ? 'datetime-date-card--active' : ''}`}
              onClick={() => handleDateChange(day)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && handleDateChange(day)}
              aria-pressed={isActive}
            >
              <div className="day-num">{day.format('D')}</div>
              <div className="month-year">{day.format('MMM YYYY')}</div>
              <div className="weekday">{day.format('dddd')}</div>
            </div>
          );
        })}
      </div>

      <p className="appointment-step__subtitle" style={{ marginBottom: '0.5rem' }}>
        {selectTime
          ? `Selected: ${selectTime} – ${moment(selectTime, 'hh:mm A').add(30, 'minutes').format('hh:mm A')}`
          : 'Pick a time'}
      </p>
      <div className="datetime-times-section">
        <h4>Morning (8AM – 12PM)</h4>
        <div>
          {amTimeSlot.map((slot) => (
            <Button
              key={slot}
              type={slot === selectTime ? 'primary' : 'default'}
              size="small"
              onClick={() => handleSelectTime(slot)}
            >
              {slot}
            </Button>
          ))}
        </div>
      </div>
      <div className="datetime-times-section">
        <h4>Afternoon (1PM – 5PM)</h4>
        <div>
          {pmTimeSlot.map((slot) => (
            <Button
              key={slot}
              type={slot === selectTime ? 'primary' : 'default'}
              size="small"
              onClick={() => handleSelectTime(slot)}
            >
              {slot}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SelectApppointment;
