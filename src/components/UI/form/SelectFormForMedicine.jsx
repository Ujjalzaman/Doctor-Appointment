import { Select } from 'antd';

const SelectFormForMedicine = ({ id, options, medicineList, setMedicineList, keyName, defaultValue=undefined }) => {

    const onChange = (value) => {
        const findObj = medicineList.find((item) => item.id === id);
        const updateItem = { ...findObj, [keyName]: value };
        setMedicineList(prev => {
            const findIndex = prev.findIndex((item) => item.id === id);
            if (findIndex !== -1) {
                const prevArray = [...prev];
                prevArray[findIndex] = updateItem;
                return prevArray;
            }
            else {
                return [...prev, updateItem];
            }
        })
    };
    const filterOption = (input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase());
    return (
        <Select
            showSearch={true}
            placeholder="Select"
            onChange={onChange}
            filterOption={filterOption}
            options={options}
            style={{ width: '100%' }}
            size='large'
            defaultValue={defaultValue}
        />
    )
}

export default SelectFormForMedicine;