import {GoodItem} from "./GoodItem.jsx";
import {useContext} from "react";
import {ShopContext} from "../../context/ShopContext.jsx";

export const GoodsList = (props) => {

    const  {
        goods = [],
        order,
        setOrder,
        addToBasket = Function.prototype,
        incrementQuantity,
        decrementQuantity
    } = useContext(ShopContext);

    // const {
    //     goods = [],
    //     setOrder,
    //     order,
    //     addToBasket = Function.prototype,
    //     incrementQuantity,
    //     decrementQuantity
    // } = props;

    if (!goods.length) {
        return <h3>Error, goods is not</h3>
    }

    return (
        <div className={`container-fluid ${goods.length === 1 ? 'd-flex justify-content-center' : ''}`}>
            <div className="row g-4">
                {goods.map((good) => (
                    <GoodItem key={good.id}
                              good={good}
                              // setOrder={setOrder}
                              // order={order}
                              // addToBasket={addToBasket}
                              isSingle={goods.length === 1} // передаём инфо о количестве товаров
                              // incrementQuantity={incrementQuantity}
                              // decrementQuantity={decrementQuantity}
                    />
                ))}
            </div>
        </div>
    )
}