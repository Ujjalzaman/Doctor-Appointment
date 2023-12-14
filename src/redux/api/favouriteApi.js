import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi"

const FAVOURITE_URL = '/favourite'

export const favouriteApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        addFavourite: build.mutation({
            query: (data) => ({
                url: `${FAVOURITE_URL}/add`,
                method: 'POST',
                data: data
            }),
            invalidatesTags: [tagTypes.favourite]
        }),
        removeFavourite: build.mutation({
            query: (data) => ({
                url: `${FAVOURITE_URL}/remove`,
                method: 'POST',
                data: data
            }),
            invalidatesTags: [tagTypes.favourite]
        }),
        getFavourite: build.query({
            query: () => ({
                url: `${FAVOURITE_URL}/`,
                method: 'GET'
            }),
            providesTags: [tagTypes.favourite]
        }),
    })
})

export const { useGetFavouriteQuery, useAddFavouriteMutation, useRemoveFavouriteMutation } = favouriteApi;