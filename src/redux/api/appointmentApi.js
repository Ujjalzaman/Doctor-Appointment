import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi"

const APPOINTMENT_URL = '/appointment'

export const appointmentApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        createAppointment : build.mutation({
            query: (data) =>({
                url: `${APPOINTMENT_URL}/create`,
                method: 'POST',
                data: data
            }),
            invalidatesTags: [tagTypes.appointments]
        }),
        getPatientAppointments : build.query({
            query: () => ({
                url: `${APPOINTMENT_URL}/patient/appointments`,
                method: 'GET'
            }),
            providesTags: [tagTypes.appointments]
        }),
        getDoctorAppointments : build.query({
            query: (arg) => ({
                url: `${APPOINTMENT_URL}/doctor/appointments`,
                method: 'GET',
                params: arg
            }),
            providesTags: [tagTypes.appointments]
        }),
        getDoctorPatients : build.query({
            query: () => ({
                url: `${APPOINTMENT_URL}/doctor/patients`,
                method: 'GET'
            }),
            providesTags: [tagTypes.appointments]
        })
    })
})

export const { useGetDoctorAppointmentsQuery, 
    useGetPatientAppointmentsQuery, 
    useGetDoctorPatientsQuery ,
    useCreateAppointmentMutation
} = appointmentApi;