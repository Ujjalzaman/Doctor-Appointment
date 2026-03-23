import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi"

const ADMIN_URL = '/admin'

export const adminApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getAdminStats: build.query({
            query: () => ({
                url: `${ADMIN_URL}/stats`,
                method: 'GET'
            }),
            providesTags: [tagTypes.admin]
        }),
        getAllAppointments: build.query({
            query: (arg) => ({
                url: `/appointment`,
                method: 'GET',
                params: arg
            }),
            transformResponse: (response) => {
                return {
                    appointments: response?.data || [],
                    meta: response?.meta || {}
                };
            },
            providesTags: [tagTypes.appointments]
        }),
        getAllPatients: build.query({
            query: (arg) => ({
                url: `/patient`,
                method: 'GET',
                params: arg
            }),
            transformResponse: (response) => {
                return {
                    patients: response?.data || [],
                    meta: response?.meta || {}
                };
            },
            providesTags: [tagTypes.patient]
        }),
    })
})

export const { 
    useGetAdminStatsQuery,
    useGetAllAppointmentsQuery,
    useGetAllPatientsQuery
} = adminApi;

export { useUpdateAppointmentMutation } from './appointmentApi';
