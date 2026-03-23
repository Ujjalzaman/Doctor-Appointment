import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi"

const MEDICINE_URL = '/medicine'

export const medicineApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        createMedicine: build.mutation({
            query: (data) => ({
                url: `${MEDICINE_URL}/`,
                method: 'POST',
                data: data
            }),
            invalidatesTags: [tagTypes.medicine]
        }),
        updateMedicine: build.mutation({
            query: (data) => ({
                url: `${MEDICINE_URL}/`,
                method: 'PATCH',
                data: data
            }),
            invalidatesTags: [tagTypes.medicine]
        }),
        deleteMedicine: build.mutation({
            query: (id) => ({
                url: `${MEDICINE_URL}/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: [tagTypes.medicine]
        }),

    })
})

export const {
    useCreateMedicineMutation,
    useUpdateMedicineMutation,
    useDeleteMedicineMutation
} = medicineApi;