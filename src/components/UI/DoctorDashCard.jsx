import './DoctorDashCard.css';
import img from '../../images/specialities/specialities-01.png';
import img2 from '../../images/specialities/specialities-02.png';
import img3 from '../../images/specialities/specialities-03.png';
const DoctorDashCard = () => {
    return (
        <div className="card dash-card">
            <div className="card-body">
                <div className="row">
                    <div className="col-md-12 col-lg-4">
                        <div className="dash-widget dct-border-rht">
                            <div className="circle-bar circle-bar1">
                                <div className="circle-graph1" data-percent="75">
                                    <img src={img} className="img-fluid" alt="patient" />
                                </div>
                            </div>
                            <div className="dash-widget-info">
                                <h6>Total Patient</h6>
                                <h3>1500</h3>
                                <p className="text-muted">Till Today</p>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-12 col-lg-4">
                        <div className="dash-widget dct-border-rht">
                            <div className="circle-bar circle-bar2">
                                <div className="circle-graph2" data-percent="65">
                                    <img src={img2} className="img-fluid" alt="Patient" />
                                </div>
                            </div>
                            <div className="dash-widget-info">
                                <h6>Today Patient</h6>
                                <h3>160</h3>
                                <p className="text-muted">06, Nov 2019</p>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-12 col-lg-4">
                        <div className="dash-widget">
                            <div className="circle-bar circle-bar3">
                                <div className="circle-graph3" data-percent="50">
                                    <img src={img3} className="img-fluid" alt="Patient" />
                                </div>
                            </div>
                            <div className="dash-widget-info">
                                <h6>Appoinments</h6>
                                <h3>85</h3>
                                <p className="text-muted">06, Apr 2019</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DoctorDashCard