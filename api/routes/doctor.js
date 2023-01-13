import express from 'express';
import { AddAppointMentCollection, AppointmentPatientsList, appointMentByDate, DoctorList, IsDoctor, AddServices, ServicesList, AddReview, ReviewsList, UpdateUserInfo } from '../controllers/doctor.js';
import { login, register, viewUser } from '../controllers/user.js';
import { verifyAdmin, verifyToken } from '../utils/verifyToken.js';

const router = express.Router();
router.get("/checkauthentication",verifyToken, (req, res, next)=>{
  res.send("working token ")
})
//admin can access
router.post('/auth/addServices',verifyToken,verifyAdmin, AddServices);


//user or admin can access
router.post('/auth/addAppointMent',verifyToken, AddAppointMentCollection);
router.post('/auth/appointByDate', verifyToken,appointMentByDate);
router.post('/auth/addReview', AddReview);
router.put('/auth/updateInfo/:id', verifyToken,UpdateUserInfo);
router.get('/auth/patients', verifyToken,AppointmentPatientsList);
router.get('/auth/users', verifyToken,viewUser);


//global
router.get('/auth/ourServices', ServicesList);
router.post('/auth/isDoctor',verifyAdmin, IsDoctor);
router.get('/auth/reviews', ReviewsList);
router.get('/auth/doctors', DoctorList);



//auth
router.post('/auth/register', register);
router.post('/auth/login', login);
export default router;