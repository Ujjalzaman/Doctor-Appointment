import moment from 'moment';
import { TimePicker } from 'antd';

const TimePicer = ({ id, time, handleFunction, showValue = false }) => {
    const defaultTime = moment(time, 'h:mm a')
    return (
        <TimePicker
            defaultValue={showValue && defaultTime}
            use12Hours
            format="h:mm a"
            onChange={(time, timeString) => handleFunction(id, time, timeString)}
        />
    )
};
export default TimePicer;