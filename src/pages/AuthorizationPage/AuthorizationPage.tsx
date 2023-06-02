import React, { FC } from "react";
import styles from "./AuthorizationPage.module.scss"
import Authorization from "../../components/Authorization/Authorization";

const AuthorizationPage:FC = () => {

    return(
        <div className={styles.authorizationPage}>
            <Authorization/>
        </div>
    )
}

export default AuthorizationPage