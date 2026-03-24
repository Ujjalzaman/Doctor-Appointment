"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = require("../../middlewares/auth");
const enums_1 = require("../../../enums");
const blog_controller_1 = require("./blog.controller");
const uploadHelper_1 = require("../../../helpers/uploadHelper");
const router = express_1.default.Router();
router.post('/', (0, auth_1.auth)(enums_1.AuthUser.DOCTOR), uploadHelper_1.CloudinaryHelper.upload.single('file'), (req, res, next) => {
    return blog_controller_1.BlogController.createBlog(req, res, next);
});
router.get('/', blog_controller_1.BlogController.getAllBlogs);
router.get('/:id', blog_controller_1.BlogController.getBlog);
router.delete('/:id', (0, auth_1.auth)(enums_1.AuthUser.DOCTOR, enums_1.AuthUser.SUPER_ADMIN), blog_controller_1.BlogController.deleteBlog);
router.patch('/:id', uploadHelper_1.CloudinaryHelper.upload.single('file'), (0, auth_1.auth)(enums_1.AuthUser.DOCTOR), (req, res, next) => {
    return blog_controller_1.BlogController.updateBlog(req, res, next);
});
exports.BlogRoutes = router;
