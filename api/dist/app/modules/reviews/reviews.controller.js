"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewController = void 0;
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const reviews_service_1 = require("./reviews.service");
const creatReview = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield reviews_service_1.ReviewService.create(req.user, req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        message: 'Successfully review Created !!',
        success: true,
        data: result
    });
}));
const getAllReview = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield reviews_service_1.ReviewService.getAllReviews(req.query);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        message: 'Successfully Retrieve review !!',
        success: true,
        data: result,
    });
}));
const getSingleReview = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield reviews_service_1.ReviewService.getSingleReview(req.params.id);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        message: 'Successfully Retrieve review !!',
        success: true,
        data: result,
    });
}));
const getDoctorReviews = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield reviews_service_1.ReviewService.getDoctorReviews(req.params.id);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        message: 'Successfully Retrieve review !!',
        success: true,
        data: result,
    });
}));
const deleteReview = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield reviews_service_1.ReviewService.deleteReviews(req.params.id);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        message: 'Successfully Deleted review !!',
        success: true,
        data: result,
    });
}));
const updateReview = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield reviews_service_1.ReviewService.updateReview(req.params.id, req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        message: 'Successfully Updated review !!',
        success: true,
        data: result,
    });
}));
const replyReviewByDoctor = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield reviews_service_1.ReviewService.replyReviewByDoctor(req.user, req.params.id, req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        message: 'Successfully Reply review !!',
        success: true,
        data: result,
    });
}));
exports.ReviewController = {
    creatReview,
    updateReview,
    getAllReview,
    getDoctorReviews,
    deleteReview,
    getSingleReview,
    replyReviewByDoctor
};
