import { baseApi } from "./baseApi"

const APPOINTMENT_URL = '/appointment'

export const appointmentApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getPatientAppointments : build.query({
            query: () => ({
                url: `${APPOINTMENT_URL}/patient/appointments`,
                method: 'GET'
            })
        }),
        getDoctorAppointments : build.query({
            query: () => ({
                url: `${APPOINTMENT_URL}/doctor/appointments`,
                method: 'GET'
            })
        })
    })
})

export const { useGetDoctorAppointmentsQuery, useGetPatientAppointmentsQuery } = appointmentApi;