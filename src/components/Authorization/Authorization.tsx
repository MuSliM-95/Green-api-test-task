import React, { ChangeEvent, FC, useState } from "react";
import styles from "./Authorization.module.scss"
import { useAppDispatch, useAppSelector } from "../../hooks/hook";
import { addChat } from "../../app/AsyncFetch/chatFatch";
import { Navigate } from "react-router-dom";


const Authorization: FC = () => {
    const [IdInstance, setIdInstance] = useState("")
    const [ApiTokenInstance, setApiTokenInstance] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")

    const signingin = useAppSelector(state => state.chatSlice.existsWhatsapp)
    const token = useAppSelector(state => state.chatSlice.token)
    const status = useAppSelector(state => state.chatSlice.status)
    const dispatch = useAppDispatch()

    const handleIdInstance = (e: ChangeEvent<HTMLInputElement>): void => {
        setIdInstance(e.target.value)
    }

    const handleApiTokenInstance = (e: ChangeEvent<HTMLInputElement>): void => {
        setApiTokenInstance(e.target.value)
    }

    const handlePhoneNumber = (e: ChangeEvent<HTMLInputElement>): void => {
        setPhoneNumber(e.target.value)
    }

    const handleAuthorization = (): void => {
        dispatch(addChat({ IdInstance, ApiTokenInstance, phoneNumber }))
    }

    if (token) {
        return <Navigate to={"/"} />
    }

    return (
        <div className={styles.authorizationWrapper}>
            <h1 className={styles.loginText}>Войти в чат</h1>
            <form>
                <input type="text"
                    className={status === "error" ? styles.errorBlockActivi : styles.input}
                    placeholder="Введите idInstance"
                    onChange={handleIdInstance}
                    value={IdInstance} />

                <input type="text"
                    className={status === "error" ? styles.errorBlockActivi : styles.input}
                    placeholder="Введите apiTokenInstance"
                    onChange={handleApiTokenInstance}
                    value={ApiTokenInstance}
                />
                <input
                    className={!signingin && signingin !== null ? styles.errorBlockActivi : styles.input}
                    type="number"
                    name="phoneNumber"
                    id="phone"
                    onChange={handlePhoneNumber}
                    value={phoneNumber}
                    autoComplete="none"
                />
                <button onClick={handleAuthorization} type="button">Войти</button>
            </form>
        </div>
    )
}

export default Authorization