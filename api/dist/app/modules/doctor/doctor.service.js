"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DoctorService = void 0;
const client_1 = require("@prisma/client");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const apiError_1 = __importDefault(require("../../../errors/apiError"));
const http_status_1 = __importDefault(require("http-status"));
const doctor_interface_1 = require("./doctor.interface");
const paginationHelper_1 = __importDefault(require("../../../shared/paginationHelper"));
const uploadHelper_1 = require("../../../helpers/uploadHelper");
const moment_1 = __importDefault(require("moment"));
const emailTransporter_1 = require("../../../helpers/emailTransporter");
const path = __importStar(require("path"));
const config_1 = __importDefault(require("../../../config"));
const { v4: uuidv4 } = require('uuid');
const sendVerificationEmail = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const currentUrl = process.env.NODE_ENV === 'production' ? config_1.default.backendLiveUrl : config_1.default.backendLocalUrl;
    const uniqueString = uuidv4() + data.id;
    const uniqueStringHashed = yield bcrypt_1.default.hashSync(uniqueString, 12);
    const url = `${currentUrl}user/verify/${data.id}/${uniqueString}`;
    const expiresDate = (0, moment_1.default)().add(6, 'hours');
    const verficationData = yield prisma_1.default.userVerfication.create({
        data: {
            userId: data.id,
            expiresAt: expiresDate.toDate(),
            uniqueString: uniqueStringHashed
        }
    });
    if (verficationData) {
        const pathName = path.join(__dirname, '../../../../template/verify.html');
        const obj = { link: url };
        const subject = "Email Verification";
        const toMail = data.email;
        try {
            yield (0, emailTransporter_1.EmailtTransporter)({ pathName, replacementObj: obj, toMail, subject });
        }
        catch (err) {
            console.log(err);
            throw new apiError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, 'Unable to send email !');
        }
    }
});
const create = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield prisma_1.default.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
        const { password } = payload, othersData = __rest(payload, ["password"]);
        const existEmail = yield tx.auth.findUnique({ where: { email: othersData.email } });
        if (existEmail) {
            throw new Error("Email Already Exist !!");
        }
        const doctor = yield tx.doctor.create({ data: othersData });
        yield tx.auth.create({
            data: {
                email: doctor.email,
                password: password && (yield bcrypt_1.default.hashSync(password, 12)),
                role: client_1.UserRole.doctor,
                userId: doctor.id
            },
        });
        return doctor;
    }));
    if (data.id) {
        yield sendVerificationEmail(data);
    }
    return data;
});
const getAllDoctors = (filters, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { limit, page, skip } = (0, paginationHelper_1.default)(options);
    const { searchTerm, max, min, specialist } = filters, filterData = __rest(filters, ["searchTerm", "max", "min", "specialist"]);
    const andCondition = [];
    if (searchTerm) {
        andCondition.push({
            OR: doctor_interface_1.DoctorSearchableFields.map((field) => ({
                [field]: {
                    contains: searchTerm,
                    mode: 'insensitive'
                }
            }))
        });
    }
    if (Object.keys(filterData).length > 0) {
        andCondition.push({
            AND: Object.entries(filterData).map(([key, value]) => ({
                [key]: { equals: value }
            }))
        });
    }
    if (min || max) {
        andCondition.push({
            AND: ({
                price: {
                    gte: min,
                    lte: max
                }
            })
        });
    }
    if (specialist) {
        andCondition.push({
            AND: ({
                services: {
                    contains: specialist
                }
            })
        });
    }
    const whereCondition = andCondition.length > 0 ? { AND: andCondition } : {};
    const result = yield prisma_1.default.doctor.findMany({
        skip,
        take: limit,
        where: whereCondition,
    });
    const total = yield prisma_1.default.doctor.count({ where: whereCondition });
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result
    };
});
const getDoctor = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.doctor.findUnique({
        where: {
            id: id
        }
    });
    return result;
});
const deleteDoctor = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
        const patient = yield tx.doctor.delete({
            where: {
                id: id
            }
        });
        yield tx.auth.delete({
            where: {
                email: patient.email
            }
        });
    }));
    return result;
});
const updateDoctor = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const file = req.file;
    const id = req.params.id;
    const user = JSON.parse(req.body.data);
    if (file) {
        const uploadImage = yield uploadHelper_1.CloudinaryHelper.uploadFile(file);
        if (uploadImage) {
            user.img = uploadImage.secure_url;
        }
        else {
            throw new apiError_1.default(http_status_1.default.EXPECTATION_FAILED, 'Failed to Upload Image');
        }
    }
    const result = yield prisma_1.default.doctor.update({
        where: { id },
        data: user
    });
    return result;
});
exports.DoctorService = {
    create,
    updateDoctor,
    deleteDoctor,
    getAllDoctors,
    getDoctor
};
