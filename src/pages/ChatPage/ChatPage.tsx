import React, { FC } from "react";
import styles from "./ChatPage.module.scss"
import Chat from "../../components/Chat/Chat";


const ChatPage:FC = () => {

  
    return (
        <div className={styles.chatPage}>
            <Chat />
        </div>
    )
}

export default ChatPage