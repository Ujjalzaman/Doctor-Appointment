import './BookingCheckout.css';

const PersonalInformation = ({ handleChange, selectValue }) => {
    const { firstName, lastName, email, phone, reasonForVisit, description, address } = selectValue
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
                                                <input onChange={(e) => handleChange(e)} name='firstName' value={firstName && firstName} className="form-control" type="text" />
                                            </div>
                                        </div>
                                        <div className="col-md-6 col-sm-12">
                                            <div className="form-group card-label">
                                                <label>Last Name</label>
                                                <input onChange={(e) => handleChange(e)} name='lastName' value={lastName && lastName} className="form-control" type="text" />
                                            </div>
                                        </div>
                                        <div className="col-md-6 col-sm-12">
                                            <div className="form-group card-label">
                                                <label>Email</label>
                                                <input onChange={(e) => handleChange(e)} name='email' value={email && email} className="form-control" type="email" />
                                            </div>
                                        </div>
                                        <div className="col-md-6 col-sm-12">
                                            <div className="form-group card-label">
                                                <label>Phone</label>
                                                <input onChange={(e) => handleChange(e)} name='phone' value={phone && phone} className="form-control" type="text" />
                                            </div>
                                        </div>
                                        <div className="col-md-6 col-sm-12">
                                            <div className="form-group card-label">
                                                <label>Reason For Visit</label>
                                                <textarea rows={8} onChange={(e) => handleChange(e)} name='reasonForVisit' value={reasonForVisit && reasonForVisit} className="form-control" type="text" />
                                            </div>
                                        </div>
                                        <div className="col-md-6 col-sm-12">
                                            <div className="form-group card-label">
                                                <label>Description</label>
                                                <textarea rows={8} onChange={(e) => handleChange(e)} name='description' value={description && description} className="form-control" type="text" />
                                            </div>
                                        </div>
                                        <div className="col-md-6 col-sm-12">
                                            <div className="form-group card-label">
                                                <label>Address</label>
                                                <input onChange={(e) => handleChange(e)} name='address' value={address && address} className="form-control" type="text" />
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