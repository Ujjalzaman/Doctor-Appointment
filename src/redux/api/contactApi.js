import { baseApi } from "./baseApi"

export const contactApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        contact: build.mutation({
            query: (data) => ({
                url: `/contact`,
                method: 'POST',
                data: data,
            })
        }),

    })
})

export const { useContactMutation } = contactApi;