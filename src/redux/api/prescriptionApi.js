import { baseApi } from "./baseApi"

const PRESCRIPTION_URL = '/prescription'

export const prescriptionApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getAllPrescriptions: build.query({
            query: () => ({
                url: `${PRESCRIPTION_URL}`,
                method: 'GET'
            })
        }),
        getPrescription: build.query({
            query: (id) => ({
                url: `${PRESCRIPTION_URL}/${id}`,
                method: 'GET'
            })
        }),
        createPrescription: build.query({
            query: ({ data }) => ({
                url: `${PRESCRIPTION_URL}/create`,
                method: 'POST',
                data: data
            })
        }),
        deletePrescription: build.query({
            query: () => ({
                url: `${PRESCRIPTION_URL}/`,
                method: 'DELETE',
            })
        }),
        updatePrescription: build.query({
            query: ({ id, data }) => ({
                url: `${PRESCRIPTION_URL}/${id}`,
                method: 'PATCH',
                data: data
            })
        }),
        getDoctorPrescription: build.query({
            query: () => ({
                url: `${PRESCRIPTION_URL}/doctor/prescription`,
                method: 'GET'
            })
        }),
        getPatientPrescription: build.query({
            query: () => ({
                url: `${PRESCRIPTION_URL}/patient/prescription`,
                method: 'GET'
            })
        })
    })
})

export const {
    useCreatePrescriptionQuery,
    useGetAllPrescriptionsQuery,
    useGetPrescriptionQuery,
    useDeletePrescriptionQuery,
    useGetDoctorPrescriptionQuery,
    useGetPatientPrescriptionQuery,
    useUpdatePrescriptionQuery
} = prescriptionApi;