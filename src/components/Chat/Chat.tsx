import React, { FC, useState, useEffect, ChangeEvent, useRef } from "react";
import styles from "./Chat.module.scss"
import { messageValidation, useAppDispatch, useAppSelector } from "../../hooks/hook";
import { Navigate } from "react-router-dom";
import { addMessage, getChatHistory } from "../../app/AsyncFetch/chatFatch";
import { logoutChat } from "../../app/Reducers/chatReducer";



const Chat: FC = () => {
    const token = useAppSelector(state => state.chatSlice.token)
    const phoneNumber = useAppSelector(state => state.chatSlice.phoneNumber)
    const chat = useAppSelector(state => state.chatSlice.chat)
    const [text, setText] = useState("")
    const [render, setRender] = useState(false)

    const dispatch = useAppDispatch()
    const buttonRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        dispatch(getChatHistory())
        window.scrollTo({
            top: buttonRef.current?.offsetTop,
            left: 0,
            behavior: "smooth"
        })
    },[])

    const logout = (): void => {
        dispatch(logoutChat())
    }

    const handleTextChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setText(e.target.value)
    }
    const handleAddMessage = (): void => {
        if (messageValidation(text)) {
            dispatch(addMessage({ text }))
            setRender(!render)

            window.scrollTo({
                top: buttonRef.current?.offsetTop,
                left: 0,
                behavior: "smooth"
            })
            setText("")
        }
    }
    // Второй раз фильтрую массив, с сообщениями. Иногда успевали появиться на экране 
    const chatFiltr = chat?.filter((obj, index, self) => index === self.findIndex((t) => t.id === obj.id))

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
                            <button onClick={logout} type="button"></button>
                        </div>
                    </div>
                </div>
                <div className={styles.chatBlockWrapper}>
                    <div className={styles.chatListWrapper}>
                        <div className={styles.chatListBlock}>
                            {chatFiltr?.map((message, index) => {
                                return (
                                    <div className={message.type === "sentMessages" ? styles.outgoingMessagBlock : styles.receivedMessageBlock} key={index}>
                                        <div ref={buttonRef} className={message.type === "sentMessages" ? styles.outgoingMessage : styles.receivedMessage} >{message.text}</div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
                <div className={styles.addMessageWrapper}>
                    <div className={styles.addMessageBlock}>
                        <span className={styles.addMessageBlockSpan1}></span>
                        <span className={styles.addMessageBlockSpan2}></span>
                        <input type="text" value={text} onChange={handleTextChange} />
                        <button onClick={handleAddMessage} type="button"></button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Chat