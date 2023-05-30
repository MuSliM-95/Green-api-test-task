import React, { ChangeEvent, useState } from "react";
import styles from "./Authorization.module.scss"
import { useAppDispatch, useAppSelector } from "../../hooks/hook";
import { authorization } from "../../app/AsyncFetch/authorizationFatch";
import { Navigate } from "react-router-dom";

const Authorization = () => {
    const [IdInstance, setIdInstance] = useState("1101825750")
    const [ApiTokenInstance, setApiTokenInstance] = useState("068001e610304abdbf87c2f1d30c411d17d9cc6ca12e410e85")
    
    const token = useAppSelector(state => state.chatSlice.token)
    const dispatch = useAppDispatch()

    const handleIdInstance = (e: ChangeEvent<HTMLInputElement>) => {
        setIdInstance(e.target.value)
    }
    const handleApiTokenInstance = (e: ChangeEvent<HTMLInputElement>) => {
        setApiTokenInstance(e.target.value)
    }

    const handleAuthorization = () => {
        dispatch(authorization({ IdInstance, ApiTokenInstance }))
    }

    if (token) {
        return <Navigate to={"/"} />
    }
    return (
        <div className={styles.authorizationWrapper}>
            <h1 className={styles.loginText}>Войти в чат</h1>
            <form>
                <input type="text"
                    placeholder="Введите idInstance"
                    onChange={handleIdInstance}
                    value={IdInstance} />

                <input type="text"
                    placeholder="Введите apiTokenInstance"
                    onChange={handleApiTokenInstance}
                    value={ApiTokenInstance}
                />
                <button onClick={handleAuthorization} type="button">Войти</button>
            </form>
        </div>
    )
}

export default Authorization