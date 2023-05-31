import React from 'react';
import styles from './App.module.scss';
import { BrowserRouter, Route, Routes } from "react-router-dom"
import AuthorizationPage from './pages/AuthorizationPage/AuthorizationPage';
import ChatPage from './pages/ChatPage/ChatPage';


function App() {
  return (
    <div className={styles.App}>
      <BrowserRouter>
        <Routes>
          <Route path='signingIn' element={<AuthorizationPage />} />
          <Route path='/' element={<ChatPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
