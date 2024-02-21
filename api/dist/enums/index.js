"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthUser = exports.BloodGroup = void 0;
var BloodGroup;
(function (BloodGroup) {
    BloodGroup[BloodGroup["O+"] = 0] = "O+";
    BloodGroup[BloodGroup["O-"] = 1] = "O-";
    BloodGroup[BloodGroup["B+"] = 2] = "B+";
    BloodGroup[BloodGroup["B-"] = 3] = "B-";
    BloodGroup[BloodGroup["AB+"] = 4] = "AB+";
    BloodGroup[BloodGroup["AB-"] = 5] = "AB-";
    BloodGroup[BloodGroup["A+"] = 6] = "A+";
    BloodGroup[BloodGroup["A-"] = 7] = "A-";
})(BloodGroup || (exports.BloodGroup = BloodGroup = {}));
var USER_RULES;
(function (USER_RULES) {
    USER_RULES[USER_RULES["ADMIN"] = 0] = "ADMIN";
    USER_RULES[USER_RULES["PATIENT"] = 1] = "PATIENT";
    USER_RULES[USER_RULES["DOCTOR"] = 2] = "DOCTOR";
})(USER_RULES || (USER_RULES = {}));
var AuthUser;
(function (AuthUser) {
    AuthUser["ADMIN"] = "admin";
    AuthUser["DOCTOR"] = "doctor";
    AuthUser["PATIENT"] = "patient";
    AuthUser["SUPER_ADMIN"] = "super_admin";
})(AuthUser || (exports.AuthUser = AuthUser = {}));
