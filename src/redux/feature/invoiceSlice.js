import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data: {}
}

export const invoiceSlice = createSlice({
    name: 'invoice',
    initialState,
    reducers: {
        addInvoice: (state, action) => {
            state.data = action.payload;
        }
    }
})

export const { addInvoice } = invoiceSlice.actions;
export default invoiceSlice.reducer;