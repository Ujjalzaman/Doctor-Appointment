import moment from 'moment'
import { DatePicker } from 'antd';

const SelectDateAndTime = ({content,handleDateChange, disabledDateTime, selectedDate, dContent,selectTime }) => {
    return (
        <div className="col-12">
            {content}
            <div className="card py-2 d-flex justify-content-between" style={{ height: '70vh' }}>
                <div className="row m-2">
                    <div className="col-6">
                        <DatePicker
                            format="YYYY-MM-DD HH:mm:ss"
                            disabledDate={disabledDateTime}
                            open={true}
                            onChange={handleDateChange}
                        />
                    </div>
                    <div className="col-6">
                        {selectedDate ? <h4>Selected Date: {selectedDate && moment(selectedDate).format('LL')}
                            {selectTime && 'Time :' + selectTime}</h4> : "Please Select A Date First"}
                        <div className="schedule-cont">
                            <div className="row">
                                {dContent}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SelectDateAndTime