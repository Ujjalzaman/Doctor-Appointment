import './index.css';
import { appointStatusDsc } from "../../constant/appointmentStatus";
const AppointmentTimeLine = ({data}) => {
 
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="time-line-section">
              <ul className="timeline timeline-horizontal">

                <li className="timeline-item mb-5 position-relative">
                  <div className="timeline-badge bg-white"></div>
                  <div className="timeline-panel position-relative shadow rounded p-2" style={{maxWidth:'220px'}}>
                    <div>
                      <h6>Payment - {data?.paymentStatus}</h6>
                      <p className="form-text mb-0">{appointStatusDsc?.payment}</p>
                    </div>
                  </div>
                </li>

                <li className="timeline-item mb-5 position-relative">
                  <div className="timeline-badge bg-white"></div>
                  <div className="timeline-panel position-relative shadow rounded p-2" style={{maxWidth:'220px'}}>
                    <div>
                      <h6>Appointment - {data?.status}</h6>
                      <p className="form-text mb-0">{appointStatusDsc.appointment[data?.status]}</p>
                    </div>
                  </div>
                </li>

                <li className="timeline-item mb-5 position-relative">
                  <div className="timeline-badge bg-white"></div>
                  <div className="timeline-panel position-relative shadow rounded p-2" style={{maxWidth:'220px'}}>
                    <div>
                      <h6>Follow-up Date - {data?.followUp ? data?.followUp : 'Not Scheduled Yet'}</h6>
                      <p className="form-text mb-0">{data?.followUp && appointStatusDsc.followUpDate}</p>
                    </div>
                  </div>
                </li>

                <li className="timeline-item mb-5 position-relative">
                  <div className="timeline-badge bg-white"></div>
                  <div className="timeline-panel position-relative shadow rounded p-2" style={{maxWidth:'220px'}}>
                    <div>
                      <h6>Prescription - {data?.prescriptionStatus}</h6>
                      <p className="form-text mb-0">{appointStatusDsc.prescriptionStatus[data?.prescriptionStatus]}</p>
                    </div>
                  </div>
                </li>

              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AppointmentTimeLine;