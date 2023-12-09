import React from 'react';
import './ProfileSetting.css';
import img from '../../../images/john.png';
import DashboardLayout from '../DashboardLayout/DashboardLayout';

const ProfileSetting = () => {
    return (
        <DashboardLayout>
            <div className="card">
                <div className="card-body">
                    <h4 className="card-title">Basic Information</h4>
                    <div className="row form-row">
                        <div className="col-md-12">
                            <div className="form-group">
                                <div className="change-avatar">
                                    <div className="profile-img">
                                        <img src={img} alt="User Image" />
                                    </div>
                                    <div className="upload-img">
                                        <div className="change-photo-btn">
                                            <span><i className="fa fa-upload"></i> Upload Photo</span>
                                            <input type="file" className="upload" />
                                        </div>
                                        <small className="form-text text-muted">Allowed JPG, GIF or PNG. Max size of 2MB</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label>Username <span className="text-danger">*</span></label>
                                <input type="text" className="form-control" readonly />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label>Email <span className="text-danger">*</span></label>
                                <input type="email" className="form-control" readonly />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label>First Name <span className="text-danger">*</span></label>
                                <input type="text" className="form-control" />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label>Last Name <span className="text-danger">*</span></label>
                                <input type="text" className="form-control" />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label>Phone Number</label>
                                <input type="text" className="form-control" />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label>Gender</label>
                                <select className="form-control select">
                                    <option>Select</option>
                                    <option>Male</option>
                                    <option>Female</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group mb-0">
                                <label>Date of Birth</label>
                                <input type="text" className="form-control" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="card">
                <div className="card-body">
                    <h4 className="card-title">About Me</h4>
                    <div className="form-group mb-0">
                        <label>Biography</label>
                        <textarea className="form-control" rows="5"></textarea>
                    </div>
                </div>
            </div>
            <div className="card">
                <div className="card-body">
                    <h4 className="card-title">Clinic Info</h4>
                    <div className="row form-row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label>Clinic Name</label>
                                <input type="text" className="form-control" />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label>Clinic Address</label>
                                <input type="text" className="form-control" />
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className="form-group">
                                <label>Clinic Images</label>
                                <form action="#" className="dropzone"></form>
                            </div>
                            <div className="upload-wrap">
                                <div className="upload-images">
                                    <img src="assets/img/features/feature-01.jpg" alt="Upload Image" />
                                    <a href="javascript:void(0);" className="btn btn-icon btn-danger btn-sm"><i className="far fa-trash-alt"></i></a>
                                </div>
                                <div className="upload-images">
                                    <img src="assets/img/features/feature-02.jpg" alt="Upload Image" />
                                    <a href="javascript:void(0);" className="btn btn-icon btn-danger btn-sm"><i className="far fa-trash-alt"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="card contact-card">
                <div className="card-body">
                    <h4 className="card-title">Contact Details</h4>
                    <div className="row form-row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label>Address Line 1</label>
                                <input type="text" className="form-control" />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label className="control-label">Address Line 2</label>
                                <input type="text" className="form-control" />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label className="control-label">City</label>
                                <input type="text" className="form-control" />
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="form-group">
                                <label className="control-label">State / Province</label>
                                <input type="text" className="form-control" />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label className="control-label">Country</label>
                                <input type="text" className="form-control" />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label className="control-label">Postal Code</label>
                                <input type="text" className="form-control" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="card">
                <div className="card-body">
                    <h4 className="card-title">Pricing</h4>

                    <div className="form-group mb-0">
                        <div id="pricing_select">
                            <div className="custom-control custom-radio custom-control-inline">
                                <input type="radio" id="price_free" name="rating_option" className="custom-control-input" value="price_free" checked />
                                <label className="custom-control-label" for="price_free">Free</label>
                            </div>
                            <div className="custom-control custom-radio custom-control-inline">
                                <input type="radio" id="price_custom" name="rating_option" value="custom_price" className="custom-control-input" />
                                <label className="custom-control-label" for="price_custom">Custom Price (per hour)</label>
                            </div>
                        </div>

                    </div>

                    <div className="row custom_price_cont" id="custom_price_cont" style={{display: "none"}}>
                        <div className="col-md-4">
                            <input type="text" className="form-control" id="custom_rating_input" name="custom_rating_count" value="" placeholder="20" />
                            <small className="form-text text-muted">Custom price you can add</small>
                        </div>
                    </div>

                </div>
            </div>
            <div className="card services-card">
                <div className="card-body">
                    <h4 className="card-title">Services and Specialization</h4>
                    <div className="form-group">
                        <label>Services</label>
                        <input type="text" data-role="tagsinput" className="input-tags form-control" placeholder="Enter Services" name="services" value="Tooth cleaning " id="services" />
                        <small className="form-text text-muted">Note : Type & Press enter to add new services</small>
                    </div>
                    <div className="form-group mb-0">
                        <label>Specialization </label>
                        <input className="input-tags form-control" type="text" data-role="tagsinput" placeholder="Enter Specialization" name="specialist" value="Children Care,Dental Care" id="specialist" />
                        <small className="form-text text-muted">Note : Type & Press  enter to add new specialization</small>
                    </div>
                </div>
            </div>
            <div className="card">
                <div className="card-body">
                    <h4 className="card-title">Education</h4>
                    <div className="education-info">
                        <div className="row form-row education-cont">
                            <div className="col-12 col-md-10 col-lg-11">
                                <div className="row form-row">
                                    <div className="col-12 col-md-6 col-lg-4">
                                        <div className="form-group">
                                            <label>Degree</label>
                                            <input type="text" className="form-control" />
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-6 col-lg-4">
                                        <div className="form-group">
                                            <label>College/Institute</label>
                                            <input type="text" className="form-control" />
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-6 col-lg-4">
                                        <div className="form-group">
                                            <label>Year of Completion</label>
                                            <input type="text" className="form-control" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="add-more">
                        <a href="javascript:void(0);" className="add-education"><i className="fa fa-plus-circle"></i> Add More</a>
                    </div>
                </div>
            </div>
            <div className="card">
                <div className="card-body">
                    <h4 className="card-title">Experience</h4>
                    <div className="experience-info">
                        <div className="row form-row experience-cont">
                            <div className="col-12 col-md-10 col-lg-11">
                                <div className="row form-row">
                                    <div className="col-12 col-md-6 col-lg-4">
                                        <div className="form-group">
                                            <label>Hospital Name</label>
                                            <input type="text" className="form-control" />
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-6 col-lg-4">
                                        <div className="form-group">
                                            <label>From</label>
                                            <input type="text" className="form-control" />
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-6 col-lg-4">
                                        <div className="form-group">
                                            <label>To</label>
                                            <input type="text" className="form-control" />
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-6 col-lg-4">
                                        <div className="form-group">
                                            <label>Designation</label>
                                            <input type="text" className="form-control" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="add-more">
                        <a href="javascript:void(0);" className="add-experience"><i className="fa fa-plus-circle"></i> Add More</a>
                    </div>
                </div>
            </div>
            <div className="card">
                <div className="card-body">
                    <h4 className="card-title">Awards</h4>
                    <div className="awards-info">
                        <div className="row form-row awards-cont">
                            <div className="col-12 col-md-5">
                                <div className="form-group">
                                    <label>Awards</label>
                                    <input type="text" className="form-control" />
                                </div>
                            </div>
                            <div className="col-12 col-md-5">
                                <div className="form-group">
                                    <label>Year</label>
                                    <input type="text" className="form-control" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="add-more">
                        <a href="javascript:void(0);" className="add-award"><i className="fa fa-plus-circle"></i> Add More</a>
                    </div>
                </div>
            </div>
            <div className="card">
                <div className="card-body">
                    <h4 className="card-title">Memberships</h4>
                    <div className="membership-info">
                        <div className="row form-row membership-cont">
                            <div className="col-12 col-md-10 col-lg-5">
                                <div className="form-group">
                                    <label>Memberships</label>
                                    <input type="text" className="form-control" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="add-more">
                        <a href="javascript:void(0);" className="add-membership"><i className="fa fa-plus-circle"></i> Add More</a>
                    </div>
                </div>
            </div>
            <div className="card">
                <div className="card-body">
                    <h4 className="card-title">Registrations</h4>
                    <div className="registrations-info">
                        <div className="row form-row reg-cont">
                            <div className="col-12 col-md-5">
                                <div className="form-group">
                                    <label>Registrations</label>
                                    <input type="text" className="form-control" />
                                </div>
                            </div>
                            <div className="col-12 col-md-5">
                                <div className="form-group">
                                    <label>Year</label>
                                    <input type="text" className="form-control" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="add-more">
                        <a href="javascript:void(0);" className="add-reg"><i className="fa fa-plus-circle"></i> Add More</a>
                    </div>
                </div>
            </div>
            <div className="submit-section submit-btn-bottom">
                <button type="submit" className="btn btn-primary submit-btn">Save Changes</button>
            </div>
        </DashboardLayout>
    )
}
export default ProfileSetting;