import React from "react";
import styles from "./Chat.module.scss"
import { useAppSelector } from "../../hooks/hook";
import { Navigate } from "react-router-dom";

const Chat = () => {
    const token = useAppSelector(state => state.chatSlice.token)

    console.log(token);
    if (!token) {
        return <Navigate to={"/signingIn"} />
    }
    return (
        <div>
          Hello World
        </div>
    )
}
export default Chat