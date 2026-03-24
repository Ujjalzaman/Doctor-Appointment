"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IOptions = exports.IAuthRules = exports.patientCondition = exports.BloodGroup = void 0;
exports.BloodGroup = ['O+', 'O-', 'B+', 'B-', 'AB+', 'AB-', 'A+', 'A-'];
exports.patientCondition = ["Critical", "Serious", "Stable", "Acute", "Chronic", "Critical but Stable", "Non-Critical", "Terminal", "Emergent", "Urgent"];
exports.IAuthRules = ['ADMIN', "PATIENT", "DOCTOR"];
exports.IOptions = ['limit', 'page', 'sortBy', 'sortOrder'];
