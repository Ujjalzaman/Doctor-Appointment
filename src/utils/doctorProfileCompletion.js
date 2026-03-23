/**
 * Required professional profile fields for doctors (used for onboarding gate + sidebar status).
 */
export function getDoctorProfileProgress(doctor) {
    if (!doctor) {
        return { percent: 0, missing: [], complete: false };
    }
    const checks = [
        { ok: !!(doctor.phone && String(doctor.phone).trim()), label: 'Phone number' },
        { ok: !!(doctor.specialization && String(doctor.specialization).trim()), label: 'Specialization' },
        { ok: !!(doctor.designation && String(doctor.designation).trim()), label: 'Designation' },
        {
            ok: !!(doctor.clinicName?.trim() || doctor.clinicAddress?.trim()),
            label: 'Clinic name or address',
        },
        {
            ok: !!(doctor.biography && String(doctor.biography).trim().length >= 30),
            label: 'Biography (at least 30 characters)',
        },
        { ok: !!(doctor.price != null && String(doctor.price).trim()), label: 'Consultation fee' },
    ];
    const done = checks.filter((c) => c.ok).length;
    const percent = Math.round((done / checks.length) * 100);
    const missing = checks.filter((c) => !c.ok).map((c) => c.label);
    return { percent, missing, complete: percent === 100 };
}
