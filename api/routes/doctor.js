import express from 'express';
import { AddAppointMentCollection, AddDoctor, AllPatientsList, appointMentByDate, DoctorList, IsDoctor } from '../controllers/doctor.js';

const router = express.Router();

// router.post('/appointByDate', appointMentByDate);
router.post('/addDoctor', AddDoctor);
router.get('/doctors', DoctorList);
router.post('/addAppointMent', AddAppointMentCollection);
router.get('/allPatients', AllPatientsList);
router.post('/isDoctor', IsDoctor);

export default router;