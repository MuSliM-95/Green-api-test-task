import { createSlice } from "@reduxjs/toolkit";
import { addChat } from "../AsyncFetch/chatFatch";

type State = {
    status: string,
    existsWhatsapp: unknown
}

const initialState: State = {
    status: "initial" || "loading" || "error" || "success",
    existsWhatsapp: null ,
}

const chatSlice = createSlice({
    name: "Authorization",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addChat.pending, (state, action) => {
                state.status = "loading";

            })
            .addCase(addChat.fulfilled, (state, action) => {
                state.status = "success";
                state.existsWhatsapp = action.payload
            })
            .addCase(addChat.rejected, (state, action) => {
                state.status = "error";

            })
    }

})

export default chatSlice.reducer