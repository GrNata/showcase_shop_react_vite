
export const Preloader = () => {

    return (
        <div className="d-flex justify-content-center">
            <div className="spinner-border text-secondary custom_spinner" role="status">
                <span className="visually-hidden">Загрузка...</span>
            </div>
        </div>
    )
};