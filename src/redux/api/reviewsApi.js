import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi"

const REVIEW_URL = '/review'

export const reviewApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getAllReviews: build.query({
            query: (args) => ({
                url: `${REVIEW_URL}`,
                method: 'GET',
                params: args
            }),
            providesTags: [tagTypes.reviews]
        }),
        getSingleReview: build.query({
            query: (id) => ({
                url: `${REVIEW_URL}/${id}`,
                method: 'GET'
            }),
            providesTags: [tagTypes.reviews]
        }),
        getDoctorReviews: build.query({
            query: (id) => ({
                url: `${REVIEW_URL}/doctor-review/${id}`,
                method: 'GET'
            }),
            providesTags: [tagTypes.reviews]
        }),
        replyReviews: build.query({
            query: ({id, data}) => ({
                url: `${REVIEW_URL}/${id}/reply`,
                method: 'PATCH',
                data: data
            }),
            providesTags: [tagTypes.reviews]
        }),
        createReview: build.mutation({
            query: ({ data }) => ({
                url: `${REVIEW_URL}/`,
                method: 'POST',
                data: data
            }),
            invalidatesTags: [tagTypes.reviews]
        }),
        deleteReview: build.query({
            query: (id) => ({
                url: `${REVIEW_URL}/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: [tagTypes.reviews]
        }),
        updateReview: build.query({
            query: ({ id, data }) => ({
                url: `${REVIEW_URL}/${id}`,
                method: 'PATCH',
                data: data
            }),
            invalidatesTags: [tagTypes.reviews]
        })
    })
})

export const {
    useCreateReviewMutation,
    useDeleteReviewQuery,
    useGetAllReviewsQuery,
    useGetDoctorReviewsQuery,
    useGetSingleReviewQuery,
    useUpdateReviewQuery,
    useReplyReviewsQuery,
} = reviewApi;