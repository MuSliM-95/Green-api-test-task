import { createSlice } from "@reduxjs/toolkit";
import { addChat, getChatHistory } from "../AsyncFetch/chatFatch";

type State = {
    status: string,
    existsWhatsapp: unknown,
    token: string | null,
    phoneNumber: string | null,
    chat: Array<object>
}

const initialState: State = {
    status: "initial" || "loading" || "error" || "success",
    existsWhatsapp: null,
    token: localStorage.getItem("ApiTokenInstance") || null,
    phoneNumber: localStorage.getItem("phoneNumber") || null,
    chat: []
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
                state.existsWhatsapp = action.payload;
                state.token = localStorage.getItem("ApiTokenInstance");

            })
            .addCase(addChat.rejected, (state, action) => {
                state.status = "error";

            });
        builder
            .addCase(getChatHistory.pending, (state, action) => {
                state.status = "loading";
            })
            .addCase(getChatHistory.fulfilled, (state, action) => {
                state.status = "success";
                state.chat = action.payload
            })
            .addCase(getChatHistory.rejected, (state, action) => {
                state.status = "error";
            })
    }

})

export default chatSlice.reducer