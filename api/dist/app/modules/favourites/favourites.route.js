"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FavouriteRouter = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = require("../../middlewares/auth");
const enums_1 = require("../../../enums");
const favourites_controller_1 = require("./favourites.controller");
const router = express_1.default.Router();
router.get('/', (0, auth_1.auth)(enums_1.AuthUser.PATIENT), favourites_controller_1.FavouriteController.getPatientFavourites);
router.post('/add', (0, auth_1.auth)(enums_1.AuthUser.PATIENT), favourites_controller_1.FavouriteController.addFavourite);
router.post('/remove', (0, auth_1.auth)(enums_1.AuthUser.PATIENT), favourites_controller_1.FavouriteController.removeFavourite);
exports.FavouriteRouter = router;
