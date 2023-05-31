import React, { useState } from "react";
import styles from "./Chat.module.scss"
import { useAppSelector } from "../../hooks/hook";
import { Navigate } from "react-router-dom";



const Chat = () => {

    const signingin = useAppSelector(state => state.chatSlice.existsWhatsapp)
console.log(!!signingin);

    if (!signingin) {
        return <Navigate to={"signingIn"} />
    }

    return (
        <div>

        </div>
    )
}
export default Chat