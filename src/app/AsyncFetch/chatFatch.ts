import { createAsyncThunk } from "@reduxjs/toolkit"

interface AddAutchData {
    IdInstance: string,
    ApiTokenInstance: string,
    phoneNumber: string
}


export const addChat = createAsyncThunk<unknown, AddAutchData>(
    "add/chat", async ({ IdInstance, ApiTokenInstance, phoneNumber }, thunkApi) => {
        try {
            const res = await fetch(`https://api.green-api.com/waInstance${IdInstance}/checkWhatsapp/${ApiTokenInstance}`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({ phoneNumber })
            })
            const data = await res.json()
            if (!data.existsWhatsapp) {
                return data.existsWhatsapp
            }
            localStorage.setItem("phoneNumber", phoneNumber)
            localStorage.setItem("IdInstance", IdInstance)
            localStorage.setItem("ApiTokenInstance", ApiTokenInstance)
            return data.existsWhatsapp
        } catch (error) {
            console.log(error);
            return thunkApi.rejectWithValue(error)

        }
    }
)