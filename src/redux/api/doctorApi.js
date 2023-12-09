import { baseApi } from "./baseApi"

const DOC_URL = '/doctor'

export const doctorApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getDoctors: build.query({
            query: () => ({
                url: `${DOC_URL}`,
                method: 'GET',
            })
        }),
        getDoctor: build.query({
            query: (id) => ({
                url: `${DOC_URL}/${id}`,
                method: 'GET',
            })
        })
    })
})

export const { useGetDoctorsQuery, useGetDoctorQuery } = doctorApi