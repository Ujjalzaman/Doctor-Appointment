import moment from 'moment'
import { DatePicker } from 'antd';

const SelectDateAndTime = ({ content, handleDateChange, disabledDateTime, selectedDate, dContent, selectTime }) => {
    return (
        <div style={{ marginTop: '5rem'}}>
            <div>
                <h5 className='text-title'>Selected Doctor</h5>
                {content}
            </div>

            <dir className="row">

                <div className="col-md-5 col-sm-12 mt-3">
                    <h5 className='text-title mb-3'>Please Select Date</h5>
                    <DatePicker
                        format="YYYY-MM-DD HH:mm:ss"
                        disabledDate={disabledDateTime}
                        open={true}
                        onChange={handleDateChange}
                    />
                </div>

                <div className="col-md-7 col-sm-12 mt-3">
                    {selectedDate && <h5 className='text-title mb-3'>Selected Date: {selectedDate && moment(selectedDate).format('LL')}
                        {selectTime && 'Time :' + selectTime}</h5> }
                    <div className="date-card rounded">
                        <div className="row text-center mt-3">
                            {
                                !selectedDate ? <h5 className='text-title d-flex justify-content-center align-items-center mt-5'>Please Select A Date First</h5> :
                                    dContent
                            }
                        </div>
                    </div>
                </div>
            </dir>
        </div>
    )
}

export default SelectDateAndTime;