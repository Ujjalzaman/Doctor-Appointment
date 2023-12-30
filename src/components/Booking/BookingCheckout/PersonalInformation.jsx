import './BookingCheckout.css';

const PersonalInformation = () => {
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12 col-lg-12">
                    <div className="card">
                        <div className="card-body">
                            <form action="">

                                <div className="info-widget">
                                    <div className="row">
                                        <div className="col-md-6 col-sm-12">
                                            <div className="form-group card-label">
                                                <label>First Name</label>
                                                <input className="form-control" type="text" />
                                            </div>
                                        </div>
                                        <div className="col-md-6 col-sm-12">
                                            <div className="form-group card-label">
                                                <label>Last Name</label>
                                                <input className="form-control" type="text" />
                                            </div>
                                        </div>
                                        <div className="col-md-6 col-sm-12">
                                            <div className="form-group card-label">
                                                <label>Email</label>
                                                <input className="form-control" type="email" />
                                            </div>
                                        </div>
                                        <div className="col-md-6 col-sm-12">
                                            <div className="form-group card-label">
                                                <label>Phone</label>
                                                <input className="form-control" type="text" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PersonalInformation;