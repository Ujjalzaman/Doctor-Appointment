import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi"

const BLOGS_URL = '/blogs'

export const blogApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        createBlog : build.mutation({
            query: (data) =>({
                url: `${BLOGS_URL}`,
                method: 'POST',
                data: data
            }),
            invalidatesTags: [tagTypes.blogs]
        }),
        getAllBlogs : build.query({
            query: (arg) => ({
                url: `${BLOGS_URL}/`,
                method: 'GET',
                params: arg
            }),
            transformResponse: (response) =>{
                return {
                    blogs: response.data,
                    meta: response.meta
                }
            },
            providesTags: [tagTypes.blogs]
        }),
        getSingleBlog: build.query({
            query: (id) => ({
                url:`${BLOGS_URL}/${id}`,
                method: 'GET'
            }),
            providesTags: [tagTypes.blogs]
        }),
        updateBlog: build.mutation({
            query: ({id, data}) => ({
                url:`${BLOGS_URL}/${id}`,
                method: 'PATCH',
                data: data
            }),
            providesTags: [tagTypes.blogs]
        }),
        deleteBlog: build.mutation({
            query: (id) => ({
                url:`${BLOGS_URL}/${id}`,
                method: 'DELETE'
            }),
            providesTags: [tagTypes.blogs]
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