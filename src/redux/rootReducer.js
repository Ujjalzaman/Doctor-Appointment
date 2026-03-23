import { baseApi } from "./api/baseApi";
import invoiceSlice from "./feature/invoiceSlice";
export const reducer = {
    [baseApi.reducerPath]: baseApi.reducer,
    invoice: invoiceSlice
}