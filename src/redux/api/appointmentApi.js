import { baseApi } from "./baseApi"

const APPOINTMENT_URL = '/booking'

export const appointmentApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getMyAppointment: build.query({
            query: () => ({
                url: `${APPOINTMENT_URL}/my-appoinment`,
                method: 'GET',
            })
        })
    })
})

export const { useGetMyAppointmentQuery } = appointmentApi;