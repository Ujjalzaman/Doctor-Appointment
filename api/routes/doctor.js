import express from 'express';
import { AddAppointMentCollection, AppointmentPatientsList, appointMentByDate, DoctorList, IsDoctor, AddServices, ServicesList, AddReview, ReviewsList, UpdateUserInfo } from '../controllers/doctor.js';
import { login, register, viewUser } from '../controllers/user.js';

const router = express.Router();

router.post('/auth/appointByDate', appointMentByDate);
router.post('/auth/addAppointMent', AddAppointMentCollection);
router.get('/auth/patients', AppointmentPatientsList);
router.post('/auth/addServices', AddServices);
router.get('/auth/ourServices', ServicesList);

router.post('/auth/addReview', AddReview);
router.get('/auth/reviews', ReviewsList);

router.post('/auth/isDoctor', IsDoctor);
router.get('/auth/users', viewUser);
router.get('/auth/doctors', DoctorList);
router.put('/auth/updateInfo/:id', UpdateUserInfo);

//auth
router.post('/auth/register', register);
router.post('/auth/login', login);
export default router;