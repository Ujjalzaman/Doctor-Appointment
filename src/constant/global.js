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
    { id: 1, value: "cardiologist" },
    { id: 2, value: "Dermatologist" },
    { id: 3, value: "Orthopedic Surgeon", },
    { id: 4, value: "Gynecologist" },
    { id: 5, value: "Neurologist" },
    { id: 6, value: "Ophthalmologist" },
    { id: 7, value: "Pediatrician" },
    { id: 8, value: "Endocrinologist" },
    { id: 9, value: "Gastroenterologist" },
    { id: 10, value: "Pulmonologist" },
    { id: 11, value: "orthopedic" }
]

export const doctorSpecialistOptions = doctorSpecialistArray.map(data => {
    return {
        label: data.value,
        value: data.value
    }
})
