import { Select } from 'antd'
import React from 'react'

const SelectForm = ({ showSearch, onChange, onSearch, filterOption, options, placeholder="Select" }) => {
    return (
        <Select
            showSearch={showSearch}
            placeholder={placeholder}
            onChange={onChange}
            onSearch={onSearch}
            filterOption={filterOption}
            options={options}
            style={{ width: '100%' }}
            size='large'
        />
    )
}

export default SelectForm