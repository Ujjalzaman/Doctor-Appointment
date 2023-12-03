import { tagTypes } from "../tag-types"
import { baseApi } from "./baseApi"

const REVIEW = '/reviews'

const reviewApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        reviews: build.query({
            query: () => ({
                url: REVIEW,
                method: "GET",
            }),
        }),
        myReviews: build.query({
            query: () => ({
                url: `${REVIEW}/my-review`,
                method: "GET"
            }),
            providesTags: [tagTypes.userReview]
        }),
        addReview: build.mutation({
            query: (data) => ({
                url: `${REVIEW}/`,
                method: 'POST',
                data: data,
            }),
            invalidatesTags: [tagTypes.userReview]

        }),
        review: build.query({
            query: (id) => ({
                url: `${REVIEW}/${id}`,
                method: 'GET'
            }),
            providesTags: [tagTypes.userReview]
        }),
        deleteReview: build.mutation({
            query: (id) => ({
                url: `${REVIEW}/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: [tagTypes.userReview]
        }),
        updateReview: build.mutation({
            query: (data) => ({
                url: `${REVIEW}/${data.id}`,
                method: 'PATCH',
                data: data.body
            }),
            invalidatesTags: [tagTypes.userReview]
        })

    }),
})

export const { useMyReviewsQuery,useAddReviewMutation, useDeleteReviewMutation, useReviewQuery, useReviewsQuery, useUpdateReviewMutation } = reviewApi;   