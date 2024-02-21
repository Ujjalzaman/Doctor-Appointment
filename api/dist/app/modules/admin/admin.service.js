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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminService = void 0;
const admin_model_1 = require("./admin.model");
const getAllAdmin = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield admin_model_1.AdminModel.find();
    return result;
});
const getSingleAdmin = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield admin_model_1.AdminModel.findOne({ _id: payload });
    return result;
});
const deleteAdmin = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    yield admin_model_1.AdminModel.findOneAndDelete({ _id: payload });
});
const updateAdmin = (adminId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield admin_model_1.AdminModel.findOneAndUpdate({ _id: adminId }, { payload });
    return result;
});
exports.AdminService = {
    getAllAdmin,
    getSingleAdmin,
    deleteAdmin,
    updateAdmin
};
