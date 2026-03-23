import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi"

const BLOGS_URL = '/blogs'

export const blogApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        createBlog: build.mutation({
            query: (data) => ({
                url: `${BLOGS_URL}`,
                method: 'POST',
                data: data,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }),
            invalidatesTags: [tagTypes.blogs]
        }),
        getAllBlogs: build.query({
            query: (arg) => ({
                url: `${BLOGS_URL}/`,
                method: 'GET',
                params: arg
            }),
            transformResponse: (response) => {
                return {
                    blogs: response.data,
                    meta: response.meta
                }
            },
            providesTags: [tagTypes.blogs]
        }),
        getSingleBlog: build.query({
            query: (id) => ({
                url: `${BLOGS_URL}/${id}`,
                method: 'GET'
            }),
            providesTags: [tagTypes.blogs]
        }),
        updateBlog: build.mutation({
            query: ({ data, id }) => ({
                url: `${BLOGS_URL}/${id}`,
                method: 'PATCH',
                data: data,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }),
            invalidatesTags: [tagTypes.blogs]
        }),
        deleteBlog: build.mutation({
            query: (id) => ({
                url: `${BLOGS_URL}/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: [tagTypes.blogs]
        }),
    })
})

export const {
    useCreateBlogMutation,
    useDeleteBlogMutation,
    useGetAllBlogsQuery,
    useUpdateBlogMutation,
    useGetSingleBlogQuery
} = blogApi;