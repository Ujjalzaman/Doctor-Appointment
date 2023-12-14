import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi"

const PRESCRIPTION_URL = '/prescription'

export const prescriptionApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getAllPrescriptions: build.query({
            query: () => ({
                url: `${PRESCRIPTION_URL}`,
                method: 'GET'
            }),
            providesTags: [tagTypes.favourite]
        }),
        getPrescription: build.query({
            query: (id) => ({
                url: `${PRESCRIPTION_URL}/${id}`,
                method: 'GET'
            }),
            providesTags: [tagTypes.favourite]
        }),
        createPrescription: build.query({
            query: ({ data }) => ({
                url: `${PRESCRIPTION_URL}/create`,
                method: 'POST',
                data: data
            }),
            invalidatesTags: [tagTypes.favourite]
        }),
        deletePrescription: build.query({
            query: () => ({
                url: `${PRESCRIPTION_URL}/`,
                method: 'DELETE',
            }),
            invalidatesTags: [tagTypes.favourite]
        }),
        updatePrescription: build.query({
            query: ({ id, data }) => ({
                url: `${PRESCRIPTION_URL}/${id}`,
                method: 'PATCH',
                data: data
            }),
            invalidatesTags: [tagTypes.favourite]
        }),
        getDoctorPrescription: build.query({
            query: () => ({
                url: `${PRESCRIPTION_URL}/doctor/prescription`,
                method: 'GET'
            }),
            providesTags: [tagTypes.favourite]
        }),
        getPatientPrescription: build.query({
            query: () => ({
                url: `${PRESCRIPTION_URL}/patient/prescription`,
                method: 'GET'
            }),
            providesTags: [tagTypes.favourite]
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