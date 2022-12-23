import express from 'express';
import { AddAppointMentCollection, AppointmentPatientsList, appointMentByDate, DoctorList, IsDoctor } from '../controllers/doctor.js';
import { login, register, viewUser } from '../controllers/user.js';

const router = express.Router();

router.post('/appointByDate', appointMentByDate);
router.post('/addAppointMent', AddAppointMentCollection);
router.get('/allPatients', AppointmentPatientsList);

router.post('/auth/isDoctor', IsDoctor);
router.get('/auth/users', viewUser);
router.get('/auth/doctors', DoctorList);

//auth
router.post('/auth/register', register);
router.post('/auth/login', login);
export default router;