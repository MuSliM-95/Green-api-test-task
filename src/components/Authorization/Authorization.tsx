import React, { useState } from "react";
import styles from "./Authorization.module.scss"
import { Dispatch } from "@reduxjs/toolkit"
import { useDispatch } from "react-redux";

const Authorization = () => {
    const [idInstance, setIdInstance] = useState()
    const [apiTokenInstance, setApiTokenInstance] = useState()

    const dispatch = useDispatch()

    const handleIdInstance = (e: any) => {
        setIdInstance(e.target.value)
    }
    const handleApiTokenInstance = (e: any) => {
        setIdInstance(e.target.value)
    }

    const handleAuthorization = () => {
    }

    return (
        <div className={styles.authorizationWrapper}>
            <h1 className={styles.loginText}>Войти в чат</h1>
            <form>
                <input type="text" placeholder="Введите idInstance" onChange={handleIdInstance} />
                <input type="text" placeholder="Введите apiTokenInstance" onChange={handleApiTokenInstance} />
                <button type="button">Войти</button>
            </form>
        </div>
    )
}

export default Authorization