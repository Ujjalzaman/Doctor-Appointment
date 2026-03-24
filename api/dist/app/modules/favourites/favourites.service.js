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
exports.FavouritesService = void 0;
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const apiError_1 = __importDefault(require("../../../errors/apiError"));
const http_status_1 = __importDefault(require("http-status"));
const createFavourite = (user, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isUserExist = yield prisma_1.default.patient.findUnique({
        where: {
            id: user.userId
        }
    });
    if (!isUserExist) {
        throw new apiError_1.default(http_status_1.default.NOT_FOUND, 'Patient Account is not found !!');
    }
    //check already have or not
    const isFavourite = yield prisma_1.default.favourites.findFirst({
        where: {
            doctorId: payload.doctorId
        }
    });
    if (isFavourite) {
        throw new apiError_1.default(http_status_1.default.NOT_FOUND, 'AllReady doctor is Favourite !!');
    }
    else {
        payload.patientId = isUserExist.id;
        const favourites = yield prisma_1.default.favourites.create({
            data: payload
        });
        return favourites;
    }
});
const removeFavourite = (user, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isUserExist = yield prisma_1.default.patient.findUnique({
        where: {
            id: user.userId
        }
    });
    if (!isUserExist) {
        throw new apiError_1.default(http_status_1.default.NOT_FOUND, 'Patient Account is not found !!');
    }
    //check already have or not
    const isFavourite = yield prisma_1.default.favourites.findFirst({
        where: {
            doctorId: payload.doctorId
        }
    });
    if (!isFavourite) {
        throw new apiError_1.default(http_status_1.default.NOT_FOUND, 'Doctor is not in Favourite !!');
    }
    else {
        const favourites = yield prisma_1.default.favourites.delete({
            where: {
                id: isFavourite.id
            }
        });
        return favourites;
    }
});
const getPatientFavourites = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const isUserExist = yield prisma_1.default.patient.findUnique({
        where: {
            id: user.userId
        }
    });
    if (!isUserExist) {
        throw new apiError_1.default(http_status_1.default.NOT_FOUND, 'Patient Account is not found !!');
    }
    const favourites = yield prisma_1.default.favourites.findMany({
        where: {
            patientId: isUserExist.id
        },
        include: {
            doctor: true
        }
    });
    return favourites;
});
exports.FavouritesService = {
    createFavourite,
    removeFavourite,
    getPatientFavourites
};
