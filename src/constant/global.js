export const bloodGrup = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-']
export const bloodGrupOptions = bloodGrup.map((data) =>{
    return {
        label: data,
        value: data
    }
})

const gender = ['male', 'femal', 'shemale']

export const genderOptions = gender.map((data) =>{
    return {
        label: data,
        value: data
    }
})