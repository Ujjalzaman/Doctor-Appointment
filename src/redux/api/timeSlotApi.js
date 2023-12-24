import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi"

const TIMELOT_URL = '/timeslot'

export const appointmentApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        createTimeSlot: build.query({
            query: ({data}) => ({
                url: `${TIMELOT_URL}/create`,
                method: 'POST',
                data: data
            }),
            invalidatesTags: [tagTypes.timeSlot]
        }),
        getAllTimeSlot: build.query({
            query: () => ({
                url: `${TIMELOT_URL}/`,
                method: 'GET'
            }),
            providesTags: [tagTypes.timeSlot]
        }),
        getTimeSlot: build.query({
            query: (id) => ({
                url: `${TIMELOT_URL}/${id}`,
                method: 'GET'
            }),
            providesTags: [tagTypes.timeSlot]
        }),
        getDoctorTimeSlot: build.query({
            query: (arg) => ({
                url: `${TIMELOT_URL}/my-slot`,
                method: 'GET',
                params: arg
            }),
            providesTags: [tagTypes.timeSlot]
        }),
        deleteTimeSlot: build.query({
            query: () => ({
                url: `${TIMELOT_URL}/`,
                method: 'DELETE'
            }),
            invalidatesTags: [tagTypes.timeSlot]
        }),
        UpdateTimeSlot: build.mutation({
            query: ({id, data}) => ({
                url: `${TIMELOT_URL}/${id}`,
                method: 'PATCH',
                data: data
            }),
            invalidatesTags: [tagTypes.timeSlot]
        }),
    })
})

export const { useGetDoctorAppointmentsQuery, useGetPatientAppointmentsQuery, useGetDoctorPatientsQuery } = appointmentApi;