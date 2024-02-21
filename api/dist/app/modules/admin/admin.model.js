"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminModel = void 0;
const mongoose_1 = require("mongoose");
const constants_1 = require("../../../constants");
const AdminSchema = new mongoose_1.Schema({
    name: {
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        middleName: {
            type: String,
        }
    },
    address: {
        type: String,
    },
    bloodGroup: {
        type: String,
        enum: constants_1.BloodGroup
    },
    email: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: Number,
        required: true,
    },
    status: {
        type: Boolean,
        default: true,
    }
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    }
});
exports.AdminModel = (0, mongoose_1.model)('Admin', AdminSchema);
