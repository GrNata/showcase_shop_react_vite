import {useContext, useEffect} from "react";
import {ShopContext} from "../../context/ShopContext.jsx";

export const Alert = () => {

    const {
        alertTitle,
        closeAlert = Function.prototype
    } = useContext(ShopContext);

    // Будем скрывать подсказку по таймеру
    useEffect(() => {
        const timerId = setTimeout(closeAlert, 2000);

        return () => {
            clearTimeout(timerId);
        }
    }, [alertTitle]);

    return (
        <div className="toast  show fade position-fixed  "
             role="alert" aria-live="assertive" aria-atomic="true">
            <div className="toast-body">
                <p>{alertTitle}</p>
                 has been added to the cart.
            </div>
        </div>
    )
};