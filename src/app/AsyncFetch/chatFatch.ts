import { createAsyncThunk } from "@reduxjs/toolkit"
interface AddAutchData {
    IdInstance: string,
    ApiTokenInstance: string,
    phoneNumber: string
}

interface Text {
    text: string
}

export interface Message {
    id: number,
    text: string,
    type: string
}
const phoneNumber = localStorage.getItem("phoneNumber")
const IdInstance = localStorage.getItem("IdInstance")
const ApiTokenInstance = localStorage.getItem("ApiTokenInstance")

export const addChat = createAsyncThunk<boolean, AddAutchData, { rejectValue: unknown }>(
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

export const getChatHistory = createAsyncThunk<Message, undefined, { rejectValue: unknown }>("get/chat", async (_, thunkApi) => {
    try {
        const res = await fetch(`https://api.green-api.com/waInstance${IdInstance}/receiveNotification/${ApiTokenInstance}`)
        const data = await res.json()

        if (data) {
            const rmMessage = await fetch(`https://api.green-api.com/waInstance${IdInstance}/deleteNotification/${ApiTokenInstance}/${data.receiptId}`, {
                method: "DELETE",
            })
        }

        if (data?.body.typeWebhook !== "incomingMessageReceived") {
            return thunkApi.rejectWithValue({ error: "error" })
        }
        if (!data) {
            return thunkApi.rejectWithValue({ error: "error" })
        }

        if (data.body.senderData.chatId !== `${phoneNumber}@c.us`) {
            return thunkApi.rejectWithValue({ error: "error" })
        }

        const payload: Message = {
            id: data.receiptId,
            text: data?.body?.messageData.textMessageData.textMessage,
            type: "incomingMessage"
        }

        return payload

    } catch (error) {
        console.log(error);
        return thunkApi.rejectWithValue(error)

    }
})

export const addMessage = createAsyncThunk<Message, Text, { rejectValue: unknown }>("add/message", async ({ text }, thunkApi) => {
    try {
        const res = await fetch(`https://api.green-api.com/waInstance${IdInstance}/sendMessage/${ApiTokenInstance}`, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({ chatId: `${phoneNumber}@c.us`, message: `${text}` })
        })
        const data = await res.json()

        if (!data) {
            return thunkApi.rejectWithValue({ error: "error" })
        }

        // Не стал тратить время, для получения id отправленного сообщения  
        const payload: Message = {
            id: Math.floor(Math.random() * 5000),
            text,
            type: "sentMessages",
        }
        return payload

    } catch (error) {
        console.log(error);
        return thunkApi.rejectWithValue(error)

    }

})