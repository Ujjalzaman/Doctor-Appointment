import React from 'react'
import { DateRangePresets } from '../../../constant/global';
import { DatePicker } from "antd";

const { RangePicker } = DatePicker;
const MedicineRangePickerForm = ({ id, medicineList, setMedicineList }) => {
    const onRangeChange = (dates, dateStrings) => {
        if (dates) {
            const durationData = dateStrings[0] + ',' + dateStrings[1];
            const findObj = medicineList.find((item) => item.id === id);
            const updateObj = { ...findObj, duration: durationData };

            setMedicineList(prev => {
                const findToIndex = prev.findIndex(item => item.id === id);
                if (findToIndex !== -1) {
                    const prevArray = [...prev];
                    prevArray[findToIndex] = updateObj;
                    return prevArray;
                } else {
                    return [...prev, updateObj]
                }
            })
        }
    };

    return (
        <RangePicker
            presets={DateRangePresets}
            onChange={onRangeChange}
            size="large"
            style={{ width: '100%' }}
        />
    )
}

export default MedicineRangePickerForm;