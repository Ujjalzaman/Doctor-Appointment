import { AutoComplete } from 'antd';
import { useState } from 'react';
const mockVal = (str, repeat = 1) => ({
    value: str.repeat(repeat),
});

const InputAutoCompleteForm = ({ id, medicineList,setMedicineList, defaultValue=undefined }) => {
    const [options, setOptions] = useState([]);
    const getPanelValue = (searchText) => !searchText ? [] : [mockVal(searchText), mockVal(searchText, 2), mockVal(searchText, 3)];

    const onChange = (e) => {
        const findIndex = medicineList.find((item) => item.id === id);
        const updateItem = {...findIndex, medicine: e}
        setMedicineList(prev => {
            const indexToUpdate = prev.findIndex(item => item.id === id)
            if(indexToUpdate !== -1){
                const updateArray = [...prev];
                updateArray[indexToUpdate] = updateItem;
                return updateArray
            }else{
                return [...prev, updateItem]
            }
        })
    };

    return (
        <AutoComplete
            options={options}
            style={{ width: '100%' }}
            onChange={onChange}
            onSearch={(text) => setOptions(getPanelValue(text))}
            size='large'
            placeholder="Medicine..."
            defaultValue={defaultValue}
        />
    )
}

export default InputAutoCompleteForm;