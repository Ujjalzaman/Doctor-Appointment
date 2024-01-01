import React from 'react'
import { Checkbox, Button, DatePicker } from 'antd';
import { FaSearch } from "react-icons/fa";
const SearchSidebar = () => {
  const handleDateChange = (_date, _dateString) => {
  }

  const options = [
    {
      label: 'Male',
      value: 'male',
    },
    {
      label: 'Female',
      value: 'female',
    },
    {
      label: 'Shemale',
      value: 'shemale',
    },
  ];

  const specialOptions = [
    {
      label: 'Urology',
      value: 'Urology',
    },
    {
      label: 'Neurology',
      value: 'Neurology',
    },
    {
      label: 'Cardiologist',
      value: 'Cardiologist',
    },
    {
      label: 'Orthopedic',
      value: 'Orthopedic',
    },
    {
      label: 'Dentist',
      value: 'Dentist',
    },
  ];

  const onChange = (checkedValues) => {
    console.log('checked = ', checkedValues);
  };
  return (
    <div class="col-md-12 col-lg-4 col-xl-3 theiaStickySidebar">

      <div class="card search-filter shadow">
        <div class="card-header bg-white">
          <h4 class="card-title mb-0">Search Filter</h4>
        </div>
        <div class="card-body">
          <div className='mb-2'>
            <DatePicker
              style={{ width: "100%" }}
              format="YYYY-MM-DD HH:mm:ss"
              onChange={handleDateChange}
            />
          </div>
          <div>
            <h5>Gender</h5>
            <div className='d-flex flex-column'>
              <Checkbox.Group options={options} onChange={onChange} />
            </div>
          </div>

          <div>
            <h5>Select Specialist</h5>
            <div className='d-flex flex-column'>
              <Checkbox.Group options={specialOptions} defaultValue={['male']} onChange={onChange} />
            </div>
          </div>
          <Button className='w-100 mt-4 mb-2' type="primary" shape="round" icon={<FaSearch />} size="large">Search</Button>
        </div>
      </div>

    </div>
  )
}

export default SearchSidebar