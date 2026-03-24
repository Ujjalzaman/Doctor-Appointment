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
exports.ReviewService = void 0;
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const apiError_1 = __importDefault(require("../../../errors/apiError"));
const http_status_1 = __importDefault(require("http-status"));
const create = (user, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isUserExist = yield prisma_1.default.patient.findUnique({
        where: {
            id: user.userId
        }
    });
    if (!isUserExist) {
        throw new apiError_1.default(http_status_1.default.NOT_FOUND, 'Patient Account is not found !!');
    }
    const isDoctorExist = yield prisma_1.default.doctor.findUnique({
        where: {
            id: payload.doctorId
        }
    });
    if (isUserExist) {
        payload.patientId = isUserExist.id;
    }
    if (!isDoctorExist) {
        throw new apiError_1.default(http_status_1.default.NOT_FOUND, 'Doctor Account is not found !!');
    }
    const result = yield prisma_1.default.reviews.create({
        data: payload
    });
    return result;
});
const getAllReviews = (options) => __awaiter(void 0, void 0, void 0, function* () {
    const limit = Number(options.limit) || 10;
    const result = yield prisma_1.default.reviews.findMany({
        take: limit,
        include: {
            doctor: {
                select: {
                    firstName: true,
                    lastName: true,
                    img: true
                }
            },
            patient: {
                select: {
                    firstName: true,
                    lastName: true,
                    img: true
                }
            }
        }
    });
    return result;
});
const getSingleReview = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.reviews.findUnique({
        where: {
            id: id
        },
        include: {
            doctor: {
                select: {
                    firstName: true,
                    lastName: true
                }
            },
            patient: {
                select: {
                    firstName: true,
                    lastName: true
                }
            }
        }
    });
    return result;
});
const getDoctorReviews = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isUserExist = yield prisma_1.default.doctor.findUnique({
        where: {
            id: id
        }
    });
    if (!isUserExist) {
        throw new apiError_1.default(http_status_1.default.NOT_FOUND, 'Doctor Account is not found !!');
    }
    const result = yield prisma_1.default.reviews.findMany({
        where: {
            doctorId: isUserExist.id
        },
        include: {
            doctor: {
                select: {
                    firstName: true,
                    lastName: true
                }
            },
            patient: {
                select: {
                    firstName: true,
                    lastName: true
                }
            }
        }
    });
    return result;
});
const deleteReviews = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.reviews.delete({
        where: {
            id: id
        }
    });
    return result;
});
const updateReview = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.reviews.update({
        data: payload,
        where: {
            id: id
        }
    });
    return result;
});
const replyReviewByDoctor = (user, id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isUserExist = yield prisma_1.default.doctor.findUnique({
        where: {
            id: user.userId
        }
    });
    if (!isUserExist) {
        throw new apiError_1.default(http_status_1.default.NOT_FOUND, 'Doctor Account is not found !!');
    }
    const result = yield prisma_1.default.reviews.update({
        data: {
            response: payload.response
        },
        where: {
            id: id
        }
    });
    return result;
});
exports.ReviewService = {
    create,
    getAllReviews,
    getDoctorReviews,
    deleteReviews,
    updateReview,
    getSingleReview,
    replyReviewByDoctor
};
