import { createSlice } from "@reduxjs/toolkit";
import { authorization } from "../AsyncFetch/authorizationFatch";

type State = {
    status: string,
    id: string | null,
    token: string | null,
    statusInstance: string
}

const initialState: State = {
    status: "initial" || "loading" || "error" || "success",
    id: localStorage.getItem("IdInstance") || null,
    token: localStorage.getItem("ApiTokenInstance") || null,
    statusInstance: "offline" || "online"
}

const chatSlice = createSlice({
    name: "Authorization",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(authorization.pending, (state, action) => {
                state.status = "loading";

            })
            .addCase(authorization.fulfilled, (state, action) => {
                state.status = "success";                
                state.id = action.payload.IdInstance;
                state.token = action.payload.ApiTokenInstance;
                state.statusInstance = action.payload.statusInstance

            })
            .addCase(authorization.rejected, (state, action) => {
                state.status = "error"
            })
    }

})

export default chatSlice.reducer