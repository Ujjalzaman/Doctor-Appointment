export enum BloodGroup {
    'O+', 'O-', 'B+', 'B-', 'AB+', 'AB-', 'A+', 'A-'
}

enum USER_RULES {
    "ADMIN",
    "PATIENT",
    "DOCTOR"
}
export enum AuthUser {
    ADMIN = 'admin',
    DOCTOR = 'doctor',
    PATIENT = 'patient',
    SUPER_ADMIN = 'super_admin'
}