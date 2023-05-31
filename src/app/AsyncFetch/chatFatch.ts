import { createAsyncThunk } from "@reduxjs/toolkit"

interface AddAutchData {
    IdInstance: string,
    ApiTokenInstance: string,
    phoneNumber: string
}
interface Count {
    count: number
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
            let data = await res.json()
            if (!data.existsWhatsapp) {
                return data
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

export const getChatHistory = createAsyncThunk<Array<object>, Count>("get/chat", async ({ count }, thunkApi) => {
    try {
        const phoneNumber = localStorage.getItem("phoneNumber")
        const IdInstance = localStorage.getItem("IdInstance")
        const ApiTokenInstance = localStorage.getItem("ApiTokenInstance")
        const res = await fetch(`https://api.green-api.com/waInstance${IdInstance}/getChatHistory/${ApiTokenInstance}`, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({ phoneNumber, count })
        })
        const data = await res.json()
        console.log(data);
        
       return data 
    } catch (error) {
        console.log(error);

    }
})