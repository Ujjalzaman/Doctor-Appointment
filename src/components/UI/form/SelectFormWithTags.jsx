import { Select } from 'antd';

const SelectFormWithTags = ({ onChange, options }) => {
    return (
        <Select
            mode="tags"
            onChange={onChange}
            tokenSeparators={[',']}
            options={options}
            style={{ width: '100%' }}
            placeholder="Select"
            size='large'
        />
    )
}

export default SelectFormWithTags;