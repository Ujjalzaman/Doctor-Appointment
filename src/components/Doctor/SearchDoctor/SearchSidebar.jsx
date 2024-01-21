import React from 'react'
import { Slider, Button, DatePicker, Radio } from 'antd';
import { FaSearch, FaRedoAlt } from "react-icons/fa";
import Search from 'antd/es/input/Search';
import { doctorSpecialistOptions } from '../../../constant/global';

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
    <div className="col-md-12 col-lg-4 col-xl-3">

      <div className="p-3 rounded" style={{ background: '#f3f3f3' }}>
        <h5 className='text-center mb-3' style={{ color: '#05335c' }}>Doctor Filter</h5>
        <div className="mb-3">
          <Search placeholder="Search..." onSearch={onSearch} enterButton allowClear />
        </div>

        <div className='mb-3'>
          <h6 style={{ color: '#05335c' }}>Date Range</h6>
          <DatePicker
            style={{ width: "100%" }}
            format="YYYY-MM-DD HH:mm:ss"
            onChange={handleDateChange}
          />
        </div>

        <div className='mb-3'>
          <h6 style={{ color: '#05335c' }}>Gender</h6>
          <div className='d-flex flex-column'>
            <Radio.Group options={options} onChange={onSelectGender} />
          </div>
        </div>

        <div className='mb-3'>
          <h6 style={{ color: '#05335c' }}>Price Range</h6>
          <Slider range defaultValue={[75, 150]} onChange={onRangeChange} />
        </div>

        <div className='mb-3'>
          <h6 style={{ color: '#05335c' }}>Select Specialist</h6>
          <div className='d-flex flex-column'>
            <Radio.Group options={doctorSpecialistOptions} onChange={onSelectSepcialist} />
          </div>
        </div>

        <Button className='w-100 mt-4 mb-2' type="primary" style={{backgroundColor:'#1977cc'}} shape="round" icon={<FaSearch />} size="sm">Search</Button>
        {
          Object.keys(query).length > 4 && <Button className='w-100 mt-4 mb-2' style={{backgroundColor:'#1977cc'}} onClick={resetFilter} type="primary" shape="round" icon={<FaRedoAlt />} size="sm">Reset</Button>
        }
      </div>

    </div>
  )
}

export default SearchSidebar