import { configureStore } from "@reduxjs/toolkit"
import chatSlice from "../Reducers/chatReducer"


export const store = configureStore({
    reducer: {
        chatSlice
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch