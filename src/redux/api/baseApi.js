import { axiosBaseQuery } from '@/helpers/axios/axiosBaseQuery'
import { getBaseUrl } from '@/helpers/config/envConfig'
import { createApi } from '@reduxjs/toolkit/query/react'
import { tagTypeList } from '../tag-types'

export const baseApi = createApi({
    reducerPath: 'api',
    baseQuery: axiosBaseQuery({ baseUrl: getBaseUrl() }),
    endpoints: () => ({}),
    tagTypes: tagTypeList
})