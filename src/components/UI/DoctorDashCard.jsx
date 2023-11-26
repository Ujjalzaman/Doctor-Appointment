import './DoctorDashCard.css';
import img from '../../images/specialities/specialities-01.png';
import img2 from '../../images/specialities/specialities-02.png';
import img3 from '../../images/specialities/specialities-03.png';
const DoctorDashCard = () => {
    return (
        <div class="card dash-card">
            <div class="card-body">
                <div class="row">
                    <div class="col-md-12 col-lg-4">
                        <div class="dash-widget dct-border-rht">
                            <div class="circle-bar circle-bar1">
                                <div class="circle-graph1" data-percent="75">
                                    <img src={img} class="img-fluid" alt="patient" />
                                </div>
                            </div>
                            <div class="dash-widget-info">
                                <h6>Total Patient</h6>
                                <h3>1500</h3>
                                <p class="text-muted">Till Today</p>
                            </div>
                        </div>
                    </div>

                    <div class="col-md-12 col-lg-4">
                        <div class="dash-widget dct-border-rht">
                            <div class="circle-bar circle-bar2">
                                <div class="circle-graph2" data-percent="65">
                                    <img src={img2} class="img-fluid" alt="Patient" />
                                </div>
                            </div>
                            <div class="dash-widget-info">
                                <h6>Today Patient</h6>
                                <h3>160</h3>
                                <p class="text-muted">06, Nov 2019</p>
                            </div>
                        </div>
                    </div>

                    <div class="col-md-12 col-lg-4">
                        <div class="dash-widget">
                            <div class="circle-bar circle-bar3">
                                <div class="circle-graph3" data-percent="50">
                                    <img src={img3} class="img-fluid" alt="Patient" />
                                </div>
                            </div>
                            <div class="dash-widget-info">
                                <h6>Appoinments</h6>
                                <h3>85</h3>
                                <p class="text-muted">06, Apr 2019</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DoctorDashCard