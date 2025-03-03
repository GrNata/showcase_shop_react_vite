import {BasketItem} from "./BasketItem.jsx";
import {useContext} from "react";
import {ShopContext} from "../../context/Context.jsx";


export const BasketList = (props) => {
    const {
        // order = [],
        handelBasketShow=Function.prototype,
        // quantityAll,
        allPrice,
        deleteGoodFromOrder=Function.prototype,
        changeQuantity=Function.prototype
    } = props;

    const {order, quantityAll} = useContext(ShopContext);

    return (
        <ol className="list-group  basket-list backgraund-basket">
            <li className="title-basket  d-flex justify-content-between align-items-start active">
                <div className="ms-2 me-auto">
                    <div className="fw-bold">Basket</div>
                </div>
                <span className="badge  rounded-pill">total: {quantityAll}</span>
                <span
                    className="badge bg-secondary rounded-pill cursor-pointer"
                    onClick={handelBasketShow}>X</span>
            </li>
            {
                order.length ? order.map(item => (
                    <BasketItem
                        key={item.id} {...item}
                        handelBasketShow={handelBasketShow}
                        deleteGoodFromOrder={deleteGoodFromOrder}
                        changeQuantity={changeQuantity}
                    />
                )) : (
                    <>
                        <li className="list-group-item d-flex justify-content-between align-items-start">
                            <div className="ms-2 me-auto">
                                <div className="fw-bold">Basket is empty</div>
                            </div>
                        </li>
                    </>
                )
            }

            <li className="list-group-item d-flex justify-content-between align-items-start">
                <div className="ms-4 me-auto">
                    <div className="fw-bold">All price:</div>
                </div>
                <span className="badge price-quantity rounded-pill ms-1 me-5">{allPrice}$</span>

            </li>
            <button type="button" className="design-btn cursor-pointer">Оформить</button>
        </ol>
    )
}