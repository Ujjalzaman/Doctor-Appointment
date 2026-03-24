"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewRouter = void 0;
const express_1 = __importDefault(require("express"));
const reviews_controller_1 = require("./reviews.controller");
const auth_1 = require("../../middlewares/auth");
const enums_1 = require("../../../enums");
const router = express_1.default.Router();
router.get('/doctor-review/:id', (0, auth_1.auth)(enums_1.AuthUser.DOCTOR, enums_1.AuthUser.PATIENT), reviews_controller_1.ReviewController.getDoctorReviews);
router.get('/:id', reviews_controller_1.ReviewController.getSingleReview);
router.post('/', (0, auth_1.auth)(enums_1.AuthUser.PATIENT), reviews_controller_1.ReviewController.creatReview);
router.get('/', reviews_controller_1.ReviewController.getAllReview);
router.delete('/:id', (0, auth_1.auth)(enums_1.AuthUser.ADMIN), reviews_controller_1.ReviewController.deleteReview);
router.patch('/:id/reply', (0, auth_1.auth)(enums_1.AuthUser.DOCTOR), reviews_controller_1.ReviewController.replyReviewByDoctor);
router.patch('/:id', (0, auth_1.auth)(enums_1.AuthUser.ADMIN), reviews_controller_1.ReviewController.updateReview);
exports.ReviewRouter = router;
