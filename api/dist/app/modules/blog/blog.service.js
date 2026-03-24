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
exports.BlogService = void 0;
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const apiError_1 = __importDefault(require("../../../errors/apiError"));
const http_status_1 = __importDefault(require("http-status"));
const blog_interface_1 = require("./blog.interface");
const paginationHelper_1 = __importDefault(require("../../../shared/paginationHelper"));
const uploadHelper_1 = require("../../../helpers/uploadHelper");
const createBlog = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const file = req.file;
    const data = JSON.parse(req.body.data);
    const isUserExist = yield prisma_1.default.doctor.findUnique({
        where: {
            id: user.userId
        }
    });
    if (!isUserExist) {
        throw new apiError_1.default(http_status_1.default.NOT_FOUND, 'Doctor Account is not found !!');
    }
    if (isUserExist) {
        data.userId = isUserExist.id;
    }
    if (file) {
        const uploadImage = yield uploadHelper_1.CloudinaryHelper.uploadFile(file);
        if (uploadImage) {
            data.img = uploadImage.secure_url;
        }
        else {
            throw new apiError_1.default(http_status_1.default.EXPECTATION_FAILED, 'Failed to Updated Image');
        }
    }
    return yield prisma_1.default.blogs.create({ data });
});
const getAllBlogs = (filters, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { limit, page, skip } = (0, paginationHelper_1.default)(options);
    const { searchTerm } = filters, filterData = __rest(filters, ["searchTerm"]);
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            OR: blog_interface_1.blogSearchablFields.map((field) => ({
                [field]: {
                    contains: searchTerm,
                    mode: 'insensitive'
                }
            }))
        });
    }
    ;
    if (Object.keys(filterData).length > 0) {
        andConditions.push({
            AND: Object.entries(filterData).map(([key, value]) => ({
                [key]: { equals: value }
            }))
        });
    }
    const whereConditions = andConditions.length > 0 ? { AND: andConditions } : {};
    const result = yield prisma_1.default.blogs.findMany({
        skip,
        take: limit,
        where: whereConditions,
        include: {
            user: {
                select: {
                    firstName: true,
                    lastName: true,
                    designation: true
                }
            }
        },
        orderBy: options.sortBy && options.sortOrder ? {
            [options.sortBy]: options.sortOrder
        } : {
            createdAt: 'desc'
        }
    });
    const total = yield prisma_1.default.blogs.count({ where: whereConditions });
    return {
        meta: {
            page,
            limit,
            total
        },
        data: result
    };
});
const getBlog = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.blogs.findUnique({
        where: { id },
        include: {
            user: {
                select: {
                    firstName: true,
                    lastName: true,
                    designation: true
                }
            }
        }
    });
    return result;
});
const deleteBlog = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.blogs.delete({
        where: { id }
    });
    return result;
});
const updateBlog = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const file = req.file;
    const id = req.params.id;
    const blogData = JSON.parse(req.body.data);
    if (file) {
        const uploadImage = yield uploadHelper_1.CloudinaryHelper.uploadFile(file);
        if (uploadImage) {
            blogData.img = uploadImage.secure_url;
        }
        else {
            throw new apiError_1.default(http_status_1.default.EXPECTATION_FAILED, 'Failed to Updated Image');
        }
    }
    const result = yield prisma_1.default.blogs.update({
        where: { id },
        data: blogData
    });
    return result;
});
exports.BlogService = {
    createBlog,
    getAllBlogs,
    getBlog,
    deleteBlog,
    updateBlog
};
