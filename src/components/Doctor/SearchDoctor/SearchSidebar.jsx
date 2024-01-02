import React from 'react'
import { Slider, Button, DatePicker, Radio } from 'antd';
import { FaSearch, FaRedoAlt } from "react-icons/fa";
import Search from 'antd/es/input/Search';

const SearchSidebar = ({ setSearchTerm, setSorByGender, setSpecialist, setPriceRange, resetFilter, query }) => {
  const handleDateChange = (_date, _dateString) => { }
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
  const onSelectGender = (e) => setSorByGender(e.target.value)

  const specialOptions = [
    {
      label: 'Urology',
      value: 'urology',
    },
    {
      label: 'Neurology',
      value: 'neurology',
    },
    {
      label: 'Cardiologist',
      value: 'Cardiologist',
    },
    {
      label: 'Orthopedic',
      value: 'orthopedic',
    },
    {
      label: 'Dentist',
      value: 'dentist',
    },
  ];

  const onSelectSepcialist = (e) => setSpecialist(e.target.value)

  const onRangeChange = (range) => {
    const obj = {
      min: range[0],
      max: range[1]
    }
    setPriceRange(obj)
  }
  const onSearch = (value) => {
    setSearchTerm(value);
  }
  return (
    <div class="col-md-12 col-lg-4 col-xl-3 theiaStickySidebar">

      <div class="card search-filter shadow">
        <div class="card-header bg-white">
          <h4 class="card-title mb-0">Search Filter</h4>
        </div>
        <div class="card-body">
          <div className="mb-2">
            <Search placeholder="Search..." onSearch={onSearch} enterButton allowClear />
          </div>
          <div className='mb-2'>
            <DatePicker
              style={{ width: "100%" }}
              format="YYYY-MM-DD HH:mm:ss"
              onChange={handleDateChange}
            />
          </div>
          <div className='mb-2'>
            <h5>Gender</h5>
            <div className='d-flex flex-column'>
              <Radio.Group options={options} onChange={onSelectGender} />
            </div>
          </div>
          <div className='mb-2'>
            <h5>Price Range</h5>
            <Slider range defaultValue={[50, 100]} onChange={onRangeChange} />
          </div>

          <div>
            <h5>Select Specialist</h5>
            <div className='d-flex flex-column'>
              <Radio.Group options={specialOptions} onChange={onSelectSepcialist} />
            </div>
          </div>
          <Button className='w-100 mt-4 mb-2' type="primary" shape="round" icon={<FaSearch />} size="large">Search</Button>
          {
            Object.keys(query).length > 4 && <Button className='w-100 mt-4 mb-2' onClick={resetFilter} type="primary" shape="round" icon={<FaRedoAlt />} size="large">Reset</Button>
          }
        </div>
      </div>

    </div>
  )
}

export default SearchSidebar