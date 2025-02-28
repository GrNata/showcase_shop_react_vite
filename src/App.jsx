
import './App.css'
import AppShop from "./components/AppShop.jsx";
import {LoginForm} from "./components/login/LoginForm.jsx";
import {useState} from "react";

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const handlerLogin = (userData) => {
        console.log('User Data Login: ', userData);
        // Тут можно добавить логику авторизации, например, отправку на сервер

        if (userData.email === 'gr.natalij@gmail.com' && userData.password === '123') {
            setIsAuthenticated(true);
        } else {
                alert("Неверные данные, выедите снова");
        }


    }

  return (
    <>
        {isAuthenticated ? <AppShop /> : <LoginForm onLogin={handlerLogin} />}
        {/*<AppShop />*/}

    </>
  )
}

export default App
