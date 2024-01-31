import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi"

const APPOINTMENT_URL = '/appointment'

export const appointmentApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        createAppointment: build.mutation({
            query: (data) => ({
                url: `${APPOINTMENT_URL}/create`,
                method: 'POST',
                data: data
            }),
            invalidatesTags: [tagTypes.appointments]
        }),
        createAppointmentByUnauthenticateUser: build.mutation({
            query: (data) => ({
                url: `${APPOINTMENT_URL}/create-un-authenticate`,
                method: 'POST',
                data: data
            }),
            invalidatesTags: [tagTypes.appointments]
        }),
        trackAppointment: build.mutation({
            query: (data) => ({
                url: `${APPOINTMENT_URL}/tracking`,
                method: 'POST',
                data: data
            })
        }),
        updateAppointment: build.mutation({
            query: ({ id, data }) => ({
                url: `${APPOINTMENT_URL}/${id}`,
                method: 'PATCH',
                data: data
            }),
            invalidatesTags: [tagTypes.appointments]
        }),
        getPatientAppointments: build.query({
            query: () => ({
                url: `${APPOINTMENT_URL}/patient/appointments`,
                method: 'GET'
            }),
            providesTags: [tagTypes.appointments]
        }),
        getSingleAppointment: build.query({
            query: (id) => ({
                url: `${APPOINTMENT_URL}/${id}`,
                method: 'GET'
            }),
            providesTags: [tagTypes.appointments]
        }),
        getAppointmentedPaymentInfo: build.query({
            query: (id) => ({
                url: `${APPOINTMENT_URL}/patient-payment-info/${id}`,
                method: 'GET'
            }),
            providesTags: [tagTypes.appointments]
        }),
        getDoctorAppointments: build.query({
            query: (arg) => ({
                url: `${APPOINTMENT_URL}/doctor/appointments`,
                method: 'GET',
                params: arg
            }),
            providesTags: [tagTypes.appointments]
        }),
        getDoctorPatients: build.query({
            query: () => ({
                url: `${APPOINTMENT_URL}/doctor/patients`,
                method: 'GET'
            }),
            providesTags: [tagTypes.appointments]
        }),
        getPatientInvoices: build.query({
            query: () => ({
                url: `${APPOINTMENT_URL}/patient/invoices`,
                method: 'GET'
            }),
            providesTags: [tagTypes.appointments]
        }),
        getDoctorInvoices: build.query({
            query: () => ({
                url: `${APPOINTMENT_URL}/doctor/invoices`,
                method: 'GET'
            }),
            providesTags: [tagTypes.appointments]
        })
    })
})

export const { 
    useGetDoctorAppointmentsQuery,
    useGetPatientAppointmentsQuery,
    useGetDoctorPatientsQuery,
    useCreateAppointmentMutation,
    useGetSingleAppointmentQuery,
    useGetAppointmentedPaymentInfoQuery,
    useGetPatientInvoicesQuery,
    useGetDoctorInvoicesQuery,
    useUpdateAppointmentMutation,
    useCreateAppointmentByUnauthenticateUserMutation, 
    useTrackAppointmentMutation
} = appointmentApi;