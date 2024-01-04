import express from 'express';
import { auth } from '../../middlewares/auth';
import { AuthUser } from '../../../enums';
import { BlogController } from './blog.controller';

const router = express.Router();
router.post('/', auth(AuthUser.DOCTOR), BlogController.createBlog)
router.get('/', BlogController.getAllBlogs);
router.get('/:id', BlogController.getBlog);
router.delete('/:id', auth(AuthUser.DOCTOR, AuthUser.SUPER_ADMIN), BlogController.deleteBlog);
router.patch('/:id',auth(AuthUser.DOCTOR), BlogController.updateBlog)

export const BlogRoutes = router;