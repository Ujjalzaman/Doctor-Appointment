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
exports.FavouriteController = void 0;
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const favourites_service_1 = require("./favourites.service");
const addFavourite = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield favourites_service_1.FavouritesService.createFavourite(req.user, req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        message: 'Successfully Add Favourite !!',
        success: true,
        data: result
    });
}));
const removeFavourite = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield favourites_service_1.FavouritesService.removeFavourite(req.user, req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        message: 'Successfully Removed Favourite !!',
        success: true,
        data: result,
    });
}));
const getPatientFavourites = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield favourites_service_1.FavouritesService.getPatientFavourites(req.user);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        message: 'Successfully Retrieve Favourites !!',
        success: true,
        data: result,
    });
}));
exports.FavouriteController = {
    addFavourite,
    removeFavourite,
    getPatientFavourites
};
