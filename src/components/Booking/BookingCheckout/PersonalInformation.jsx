import './BookingCheckout.css';

const PersonalInformation = ({handleChange, selectValue}) => {
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12 col-lg-12">
                    <div className="card">
                        <div className="card-body">
                            <form>
                                <div className="info-widget">
                                    <div className="row">
                                        <div className="col-md-6 col-sm-12">
                                            <div className="form-group card-label">
                                                <label>First Name</label>
                                                <input onChange={(e) => handleChange(e)} name='firstName' value={selectValue?.firstName} className="form-control" type="text"/>
                                            </div>
                                        </div>
                                        <div className="col-md-6 col-sm-12">
                                            <div className="form-group card-label">
                                                <label>Last Name</label>
                                                <input onChange={(e) => handleChange(e)} name='lastName' value={selectValue?.lastName} className="form-control" type="text"/>
                                            </div>
                                        </div>
                                        <div className="col-md-6 col-sm-12">
                                            <div className="form-group card-label">
                                                <label>Email</label>
                                                <input onChange={(e) => handleChange(e)} name='email' value={selectValue?.email} className="form-control" type="email"/>
                                            </div>
                                        </div>
                                        <div className="col-md-6 col-sm-12">
                                            <div className="form-group card-label">
                                                <label>Phone</label>
                                                <input onChange={(e) => handleChange(e)} name='phone' value={selectValue?.phone} className="form-control" type="text"/>
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