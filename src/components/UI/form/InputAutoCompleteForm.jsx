import { AutoComplete } from 'antd';
import { useState } from 'react';
const mockVal = (str, repeat = 1) => ({
    value: str.repeat(repeat),
});

const InputAutoCompleteForm = () => {
    const [options, setOptions] = useState([]);

    const getPanelValue = (searchText) =>
        !searchText ? [] : [mockVal(searchText), mockVal(searchText, 2), mockVal(searchText, 3)];
    const onSelect = (data) => {
        console.log('onSelect', data);
    };

    return (
        <AutoComplete
            options={options}
            style={{width:'100%'}}
            onSelect={onSelect}
            onSearch={(text) => setOptions(getPanelValue(text))}
            size='large'
        />
    )
}

export default InputAutoCompleteForm;