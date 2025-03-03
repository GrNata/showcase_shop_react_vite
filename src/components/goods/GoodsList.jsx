import {GoodItem} from "./GoodItem.jsx";
import {useContext} from "react";
import {ShopContext} from "../../context/ShopContext.jsx";

export const GoodsList = () => {

    const  {
        goods = [],
    } = useContext(ShopContext);

    if (!goods.length) {
        return <h3>Error, goods is not</h3>
    }

    return (
        <div className={`container-fluid ${goods.length === 1 ? 'd-flex justify-content-center' : ''}`}>
            <div className="row g-4">
                {goods.map((good) => (
                    <GoodItem key={good.id}
                              good={good}
                              isSingle={goods.length === 1} // передаём инфо о количестве товаров
                    />
                ))}
            </div>
        </div>
    )
}