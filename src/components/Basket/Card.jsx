import icon_basket from "../../assets/basket_blue.jpg";
import {useContext} from "react";
import {ShopContext} from "../../context/ShopContext.jsx";

export const Card = () => {

    const {quantityAll, handelBasketShow} = useContext(ShopContext);

    return (
        <div
            className='position-relative d-inline-block'
            onClick={handelBasketShow}
        >
            <img src={icon_basket} alt="Basket Icon" className="basket-icon"/>
            {
                quantityAll >= 0 ?
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                        {quantityAll} {/* Количество товаров */}
                    </span>
                    :
                    null
            }
        </div>
    )
}