import express from 'express';
import { DepartmentController } from './department.controller';

const router = express.Router();

router.get('/:id', DepartmentController.getSingleDepartment);
router.post('/create', DepartmentController.createDepartment);
router.get('/', DepartmentController.getAllDepartment);
router.patch('/:id', DepartmentController.updateDepartment);
router.delete('/:id', DepartmentController.deleteDepartment);
export const DepartmentRoutes = router;