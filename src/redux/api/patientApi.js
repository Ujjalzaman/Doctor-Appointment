import { tagTypes } from "../tag-types"
import { baseApi } from "./baseApi"
const PAT_URL = '/patient'

export const patientApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getPatient: build.query({
            query: (id) => ({
                url: `${PAT_URL}/${id}`,
                method: 'GET',
            }),
            providesTags: [tagTypes.patient]
        }),
        updatePatient: build.mutation({
            query: ({ data, id }) => ({
                url: `${PAT_URL}/${id}`,
                method: 'PATCH',
                data: data,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }),
            invalidatesTags: [tagTypes.patient]
        })
    })
})

export const { useGetPatientQuery, useUpdatePatientMutation } = patientApi