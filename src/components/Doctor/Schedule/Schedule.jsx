import React from 'react';
import './Schedule.css';
import DashboardLayout from '../DashboardLayout/DashboardLayout';

const Schedule = () => {
    return (
        <DashboardLayout>
            <div className="row">
                <div className="col-sm-12">
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title">Schedule Timings</h4>
                            <div className="profile-box">
                                <div className="row">

                                    <div className="col-lg-4">
                                        <div className="form-group">
                                            <label>Timing Slot Duration</label>
                                            <select className="select form-control">
                                                <option>-</option>
                                                <option>15 mins</option>
                                                <option selected="selected">30 mins</option>
                                                <option>45 mins</option>
                                                <option>1 Hour</option>
                                            </select>
                                        </div>
                                    </div>

                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="card schedule-widget mb-0">

                                            <div className="schedule-header">

                                                <div className="schedule-nav">
                                                    <ul className="nav nav-tabs nav-justified">
                                                        <li className="nav-item">
                                                            <a className="nav-link" data-toggle="tab" href="#slot_sunday">Sunday</a>
                                                        </li>
                                                        <li className="nav-item">
                                                            <a className="nav-link active" data-toggle="tab" href="#slot_monday">Monday</a>
                                                        </li>
                                                        <li className="nav-item">
                                                            <a className="nav-link" data-toggle="tab" href="#slot_tuesday">Tuesday</a>
                                                        </li>
                                                        <li className="nav-item">
                                                            <a className="nav-link" data-toggle="tab" href="#slot_wednesday">Wednesday</a>
                                                        </li>
                                                        <li className="nav-item">
                                                            <a className="nav-link" data-toggle="tab" href="#slot_thursday">Thursday</a>
                                                        </li>
                                                        <li className="nav-item">
                                                            <a className="nav-link" data-toggle="tab" href="#slot_friday">Friday</a>
                                                        </li>
                                                        <li className="nav-item">
                                                            <a className="nav-link" data-toggle="tab" href="#slot_saturday">Saturday</a>
                                                        </li>
                                                    </ul>
                                                </div>

                                            </div>
                                            <div className="tab-content schedule-cont">

                                                <div id="slot_sunday" className="tab-pane fade">
                                                    <h4 className="card-title d-flex justify-content-between">
                                                        <span>Time Slots</span>
                                                        <a className="edit-link" data-toggle="modal" href="#add_time_slot"><i className="fa fa-plus-circle"></i> Add Slot</a>
                                                    </h4>
                                                    <p className="text-muted mb-0">Not Available</p>
                                                </div>
                                                <div id="slot_monday" className="tab-pane fade show active">
                                                    <h4 className="card-title d-flex justify-content-between">
                                                        <span>Time Slots</span>
                                                        <a className="edit-link" data-toggle="modal" href="#edit_time_slot"><i className="fa fa-edit mr-1"></i>Edit</a>
                                                    </h4>

                                                    <div className="doc-times">
                                                        <div className="doc-slot-list">
                                                            8:00 pm - 11:30 pm
                                                            <a href="javascript:void(0)" className="delete_schedule">
                                                                <i className="fa fa-times"></i>
                                                            </a>
                                                        </div>
                                                        <div className="doc-slot-list">
                                                            11:30 pm - 1:30 pm
                                                            <a href="javascript:void(0)" className="delete_schedule">
                                                                <i className="fa fa-times"></i>
                                                            </a>
                                                        </div>
                                                        <div className="doc-slot-list">
                                                            3:00 pm - 5:00 pm
                                                            <a href="javascript:void(0)" className="delete_schedule">
                                                                <i className="fa fa-times"></i>
                                                            </a>
                                                        </div>
                                                        <div className="doc-slot-list">
                                                            6:00 pm - 11:00 pm
                                                            <a href="javascript:void(0)" className="delete_schedule">
                                                                <i className="fa fa-times"></i>
                                                            </a>
                                                        </div>
                                                    </div>

                                                </div>
                                                <div id="slot_tuesday" className="tab-pane fade">
                                                    <h4 className="card-title d-flex justify-content-between">
                                                        <span>Time Slots</span>
                                                        <a className="edit-link" data-toggle="modal" href="#add_time_slot"><i className="fa fa-plus-circle"></i> Add Slot</a>
                                                    </h4>
                                                    <p className="text-muted mb-0">Not Available</p>
                                                </div>
                                                <div id="slot_wednesday" className="tab-pane fade">
                                                    <h4 className="card-title d-flex justify-content-between">
                                                        <span>Time Slots</span>
                                                        <a className="edit-link" data-toggle="modal" href="#add_time_slot"><i className="fa fa-plus-circle"></i> Add Slot</a>
                                                    </h4>
                                                    <p className="text-muted mb-0">Not Available</p>
                                                </div>
                                                <div id="slot_thursday" className="tab-pane fade">
                                                    <h4 className="card-title d-flex justify-content-between">
                                                        <span>Time Slots</span>
                                                        <a className="edit-link" data-toggle="modal" href="#add_time_slot"><i className="fa fa-plus-circle"></i> Add Slot</a>
                                                    </h4>
                                                    <p className="text-muted mb-0">Not Available</p>
                                                </div>
                                                <div id="slot_friday" className="tab-pane fade">
                                                    <h4 className="card-title d-flex justify-content-between">
                                                        <span>Time Slots</span>
                                                        <a className="edit-link" data-toggle="modal" href="#add_time_slot"><i className="fa fa-plus-circle"></i> Add Slot</a>
                                                    </h4>
                                                    <p className="text-muted mb-0">Not Available</p>
                                                </div>
                                                <div id="slot_saturday" className="tab-pane fade">
                                                    <h4 className="card-title d-flex justify-content-between">
                                                        <span>Time Slots</span>
                                                        <a className="edit-link" data-toggle="modal" href="#add_time_slot"><i className="fa fa-plus-circle"></i> Add Slot</a>
                                                    </h4>
                                                    <p className="text-muted mb-0">Not Available</p>
                                                </div>

                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal fade custom-modal" id="add_time_slot">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Add Time Slots</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="hours-info">
                                    <div className="row form-row hours-cont">
                                        <div className="col-12 col-md-10">
                                            <div className="row form-row">
                                                <div className="col-12 col-md-6">
                                                    <div className="form-group">
                                                        <label>Start Time</label>
                                                        <select className="form-control">
                                                            <option>-</option>
                                                            <option>12.00 am</option>
                                                            <option>12.30 am</option>
                                                            <option>1.00 am</option>
                                                            <option>1.30 am</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="col-12 col-md-6">
                                                    <div className="form-group">
                                                        <label>End Time</label>
                                                        <select className="form-control">
                                                            <option>-</option>
                                                            <option>12.00 am</option>
                                                            <option>12.30 am</option>
                                                            <option>1.00 am</option>
                                                            <option>1.30 am</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="add-more mb-3">
                                    <a href="javascript:void(0);" className="add-hours"><i className="fa fa-plus-circle"></i> Add More</a>
                                </div>
                                <div className="submit-section text-center">
                                    <button type="submit" className="btn btn-primary submit-btn">Save Changes</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal fade custom-modal" id="edit_time_slot">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Edit Time Slots</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="hours-info">
                                    <div className="row form-row hours-cont">
                                        <div className="col-12 col-md-10">
                                            <div className="row form-row">
                                                <div className="col-12 col-md-6">
                                                    <div className="form-group">
                                                        <label>Start Time</label>
                                                        <select className="form-control">
                                                            <option>-</option>
                                                            <option selected>12.00 am</option>
                                                            <option>12.30 am</option>
                                                            <option>1.00 am</option>
                                                            <option>1.30 am</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="col-12 col-md-6">
                                                    <div className="form-group">
                                                        <label>End Time</label>
                                                        <select className="form-control">
                                                            <option>-</option>
                                                            <option>12.00 am</option>
                                                            <option selected>12.30 am</option>
                                                            <option>1.00 am</option>
                                                            <option>1.30 am</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row form-row hours-cont">
                                        <div className="col-12 col-md-10">
                                            <div className="row form-row">
                                                <div className="col-12 col-md-6">
                                                    <div className="form-group">
                                                        <label>Start Time</label>
                                                        <select className="form-control">
                                                            <option>-</option>
                                                            <option>12.00 am</option>
                                                            <option selected>12.30 am</option>
                                                            <option>1.00 am</option>
                                                            <option>1.30 am</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="col-12 col-md-6">
                                                    <div className="form-group">
                                                        <label>End Time</label>
                                                        <select className="form-control">
                                                            <option>-</option>
                                                            <option>12.00 am</option>
                                                            <option>12.30 am</option>
                                                            <option selected>1.00 am</option>
                                                            <option>1.30 am</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12 col-md-2"><label className="d-md-block d-sm-none d-none">&nbsp;</label><a href="#" className="btn btn-danger trash"><i className="far fa-trash-alt"></i></a></div>
                                    </div>

                                    <div className="row form-row hours-cont">
                                        <div className="col-12 col-md-10">
                                            <div className="row form-row">
                                                <div className="col-12 col-md-6">
                                                    <div className="form-group">
                                                        <label>Start Time</label>
                                                        <select className="form-control">
                                                            <option>-</option>
                                                            <option>12.00 am</option>
                                                            <option>12.30 am</option>
                                                            <option selected>1.00 am</option>
                                                            <option>1.30 am</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="col-12 col-md-6">
                                                    <div className="form-group">
                                                        <label>End Time</label>
                                                        <select className="form-control">
                                                            <option>-</option>
                                                            <option>12.00 am</option>
                                                            <option>12.30 am</option>
                                                            <option>1.00 am</option>
                                                            <option selected>1.30 am</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12 col-md-2"><label className="d-md-block d-sm-none d-none">&nbsp;</label><a href="#" className="btn btn-danger trash"><i className="far fa-trash-alt"></i></a></div>
                                    </div>

                                </div>

                                <div className="add-more mb-3">
                                    <a href="javascript:void(0);" className="add-hours"><i className="fa fa-plus-circle"></i> Add More</a>
                                </div>
                                <div className="submit-section text-center">
                                    <button type="submit" className="btn btn-primary submit-btn">Save Changes</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    )
}

export default Schedule