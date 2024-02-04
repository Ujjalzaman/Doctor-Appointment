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
            providesTags: [tagTypes.prescription]
        }),
        getPrescription: build.query({
            query: (id) => ({
                url: `${PRESCRIPTION_URL}/${id}`,
                method: 'GET'
            }),
            providesTags: [tagTypes.prescription]
        }),
        createPrescription: build.mutation({
            query: ({ data }) => ({
                url: `${PRESCRIPTION_URL}/create`,
                method: 'POST',
                data: data
            }),
            invalidatesTags: [tagTypes.prescription]
        }),
        deletePrescription: build.mutation({
            query: () => ({
                url: `${PRESCRIPTION_URL}/`,
                method: 'DELETE',
            }),
            invalidatesTags: [tagTypes.prescription]
        }),
        updatePrescription: build.mutation({
            query: ({ id, data }) => ({
                url: `${PRESCRIPTION_URL}/${id}`,
                method: 'PATCH',
                data: data
            }),
            invalidatesTags: [tagTypes.prescription]
        }),
        updatePrescriptionAndAppointment: build.mutation({
            query: (data) => ({
                url: `${PRESCRIPTION_URL}/update-prescription-appointment`,
                method: 'PATCH',
                data: data
            }),
            invalidatesTags: [tagTypes.prescription]
        }),
        getDoctorPrescription: build.query({
            query: () => ({
                url: `${PRESCRIPTION_URL}/doctor/prescription`,
                method: 'GET'
            }),
            providesTags: [tagTypes.prescription]
        }),
        getPatientPrescription: build.query({
            query: () => ({
                url: `${PRESCRIPTION_URL}/patient/prescription`,
                method: 'GET'
            }),
            providesTags: [tagTypes.prescription]
        })
    })
})

export const {
    useCreatePrescriptionMutation,
    useGetAllPrescriptionsQuery,
    useGetPrescriptionQuery,
    useDeletePrescriptionMutation,
    useGetDoctorPrescriptionQuery,
    useGetPatientPrescriptionQuery,
    useUpdatePrescriptionQuery,
    useUpdatePrescriptionAndAppointmentMutation
} = prescriptionApi;