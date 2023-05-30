import { createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit"

interface AddAutchData {
    IdInstance: string,
    ApiTokenInstance: string,
}

interface GetAutchData extends AddAutchData {
    statusInstance: string
}
export const authorization = createAsyncThunk<GetAutchData, AddAutchData>(
    "get/autch",
    async ({ IdInstance, ApiTokenInstance }, thunkApi) => {
        try {
            const res = await fetch(`https://api.green-api.com/waInstance${IdInstance}/getStatusInstance/${ApiTokenInstance}`)
            let data = await res.json()
            localStorage.setItem("IdInstance", IdInstance)
            localStorage.setItem("ApiTokenInstance", ApiTokenInstance)
            data = { ...data, IdInstance, ApiTokenInstance }
            return data
        } catch (error) {
            console.log(error);
        }
    }
)