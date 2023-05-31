import React, { useState, useEffect } from "react";
import styles from "./Chat.module.scss"
import { useAppDispatch, useAppSelector } from "../../hooks/hook";
import { Navigate } from "react-router-dom";
import { getChatHistory } from "../../app/AsyncFetch/chatFatch";



const Chat = () => {
    // const signingin = useAppSelector(state => state.chatSlice.existsWhatsapp)
    const token = useAppSelector(state => state.chatSlice.token)
    const phoneNumber = useAppSelector(state => state.chatSlice.phoneNumber)
    const [count, setCount] = useState(0)

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getChatHistory({ count }))
    }, [])

    if (!token) {
        return <Navigate to={"signingIn"} />
    }

    return (
        <div className={styles.chatWrapper}>
            <div className={styles.chatBlock}>
                <div className={styles.chatBlockHeader}>
                    <div className={styles.userInfoBlockWrapper}>
                        <div className={styles.userInfoBlock}>
                            <span></span>
                            <div className={styles.phoneNumber}>{phoneNumber}</div>
                        </div>
                        <div className={styles.logoutButtonBlock}>
                            <button type="button"></button>
                        </div>
                    </div>
                </div>
                <div className={styles.addMessageWrapper}>
                    <div className={styles.addMessageBlock}>
                        <span className={styles.addMessageBlockSpan1}></span>
                        <span className={styles.addMessageBlockSpan2}></span>
                        <input type="text" />
                        <button type="button"></button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Chat