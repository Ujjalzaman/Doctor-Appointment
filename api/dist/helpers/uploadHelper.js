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
exports.CloudinaryHelper = void 0;
const cloudinary_1 = require("cloudinary");
const config_1 = __importDefault(require("../config"));
const multer_1 = __importDefault(require("multer"));
cloudinary_1.v2.config({
    cloud_name: config_1.default.cloudinary.name,
    api_key: config_1.default.cloudinary.key,
    api_secret: config_1.default.cloudinary.secret
});
const upload = (0, multer_1.default)({ storage: multer_1.default.memoryStorage() });
const uploadFile = (file) => __awaiter(void 0, void 0, void 0, function* () {
    if (!file || !file.buffer) {
        throw new Error('File not Provided or Invalid');
    }
    return new Promise((resolve, reject) => {
        cloudinary_1.v2.uploader.upload_stream({ resource_type: 'auto', folder: 'doctorOnCall' }, (error, result) => {
            if (error) {
                reject(error);
            }
            else {
                resolve(result);
            }
        }).end(file.buffer);
    });
});
exports.CloudinaryHelper = {
    uploadFile,
    upload
};
