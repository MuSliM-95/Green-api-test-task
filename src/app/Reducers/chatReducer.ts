import { createSlice } from "@reduxjs/toolkit";
import { Message, addChat, addMessage, getChatHistory } from "../AsyncFetch/chatFatch";


type State = {
    status: string,
    existsWhatsapp: unknown,
    token: string | null,
    phoneNumber: string | null,
    chat: Message[],
}
const initialState: State = {
    status: "initial" || "loading" || "error" || "success",
    existsWhatsapp: null,
    token: localStorage.getItem("ApiTokenInstance") || null,
    phoneNumber: localStorage.getItem("phoneNumber") || null,
    chat: JSON.parse(localStorage.getItem("chat")!) || []
}

const chatSlice = createSlice({
    name: "Authorization",
    initialState,
    reducers: {
        logoutChat: (state) => {
            state.token = localStorage.removeItem("ApiTokenInstance")!
            state.phoneNumber = localStorage.removeItem("phoneNumber")!
            state.chat = localStorage.removeItem("chat")!
            state.chat = []
            localStorage.removeItem("IdInstance")
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(addChat.pending, (state, action) => {
                state.status = "loading";

            })
            .addCase(addChat.fulfilled, (state, action) => {
                state.status = "success";
                state.chat = []
                state.existsWhatsapp = action.payload;
                state.token = localStorage.getItem("ApiTokenInstance");
                state.phoneNumber = localStorage.getItem("phoneNumber");
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
                if (action.payload) {
                    state.chat.push(action.payload)
                    state.chat = state.chat.filter((mss, index, self) => index === self.findIndex((t) => t.id === mss.id))

                    return localStorage.setItem("chat", JSON.stringify(state.chat))
                }
            })
            .addCase(getChatHistory.rejected, (state, action) => {
                state.status = "error";
            });
        builder
            .addCase(addMessage.pending, (state, action) => {
                state.status = "loading";
            })
            .addCase(addMessage.fulfilled, (state, action) => {
                state.status = "success";
                if (action.payload) {
                    state.chat.push(action.payload)
                    return localStorage.setItem("chat", JSON.stringify(state.chat))
                }

            })
            .addCase(addMessage.rejected, (state, action) => {
                state.status = "error";
            });

    }

})
export const { logoutChat } = chatSlice.actions
export default chatSlice.reducer