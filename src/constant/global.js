export const bloodGrup = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-']
export const bloodGrupOptions = bloodGrup.map((data) => {
    return {
        label: data,
        value: data
    }
})

const gender = ['male', 'female', 'shemale']

export const genderOptions = gender.map((data) => {
    return {
        label: data,
        value: data
    }
})
export const daysArray = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']

export const doctorSpecialistArray = [
    { id: 1, value: "Cardiologist" },
    { id: 2, value: "Dermatologist" },
    { id: 3, value: "Orthopedic Surgeon", },
    { id: 4, value: "Gynecologist" },
    { id: 5, value: "Neurologist" },
    { id: 6, value: "Ophthalmologist" },
    { id: 7, value: "Pediatrician" },
    { id: 8, value: "Endocrinologist" },
    { id: 9, value: "Gastroenterologist" },
    { id: 10, value: "Pulmonologist" },
    { id: 11, value: "Orthopedic" }
]

export const doctorSpecialistOptions = doctorSpecialistArray.map(data => {
    return {
        label: data.value,
        value: data.value
    }
});

export const doctorTimeSlot = [
    "08:00 AM",
    "08:30 AM",
    "09:00 AM",
    "09:30 AM",
    "10:00 AM",
    "10:30 AM",
    "11:00 AM",
    "11:30 AM",
    "01:00 PM",
    "01:30 PM",
    "02:00 PM",
    "02:30 PM",
    "03:00 PM",
    "03:30 PM",
    "04:00 PM",
    "04:30 PM",
    "05:00 PM"
]

