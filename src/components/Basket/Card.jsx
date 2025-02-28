import icon_basket from "../../assets/basket_blue.jpg";

export const Card = (props) => {
    const {quantity = 0, order, handelBasketShow = Function.prototype} = props;

    // console.log('Card - ', props)

    return (
        <div
            className='position-relative d-inline-block'
            onClick={handelBasketShow}
        >
            <img src={icon_basket} alt="Basket Icon" className="basket-icon"/>
            {
                quantity >= 0 ?
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                        {quantity} {/* Количество товаров */}
                    </span>
                    :
                    null
            }
        </div>
    )
}