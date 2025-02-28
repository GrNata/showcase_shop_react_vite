import {useEffect} from "react";

export const Alert = (props) => {
    const {
        title = '',
        closeAlert = Function.prototype
    } = props;


    // Будем скрывать подсказку по таймеру
    useEffect(() => {
        const timerId = setTimeout(closeAlert, 2000);

        return () => {
            clearTimeout(timerId);
        }
    }, [title]);

    return (
        // <div className="toast  show fade custom-toast-animation position-fixed start-50 translate-middle-x"
        <div className="toast  show fade position-fixed  "
             role="alert" aria-live="assertive" aria-atomic="true">
            <div className="toast-body">
                <p>{title}</p>
                 has been added to the cart.
            </div>
        </div>
    )
};