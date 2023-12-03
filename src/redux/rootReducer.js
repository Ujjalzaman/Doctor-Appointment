import { baseApi } from "./api/baseApi";
import authSliceReducer  from "./slice/userSlice";
export const reducer = {
    [baseApi.reducerPath]: baseApi.reducer,
    auth: authSliceReducer
}