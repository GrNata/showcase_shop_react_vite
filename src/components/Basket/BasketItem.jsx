import delete_good from './delete_for_basket.png';
import {useContext} from "react";
import {ShopContext} from "../../context/ShopContext.jsx";


export const BasketItem = (props) => {
    const {
        deleteGoodFromOrder=Function.prototype,
        incrementQuantity = Function.prototype,
        decrementQuantity = Function.prototype
    } = useContext(ShopContext);

    const {
        id,
        title,
        price,
        quantity,
        // deleteGoodFromOrder=Function.prototype,
        // incrementQuantity = Function.prototype,
        // decrementQuantity = Function.prototype
    } = props;

    // console.log('BasketItem props - ', props)

    return (
        <>
            <li className="list-group-item d-flex justify-content-between align-items-start">
                <div className="ms-2 me-auto w-100">
                    <div className="fw-bold">{title}</div>
                    <div className="d-flex justify-content-between align-items-center">
                        <span>price: {price.toFixed(2)}$</span>
                        <div className="d-flex align-items-center gap-2">
                            {/*<button type="button" className="btn btn-light cursor-pointer" onClick={() => changeQuantity(id, 'minus')}>-</button>*/}
                            <button type="button" className="btn btn-light cursor-pointer" onClick={() => decrementQuantity(id)}>-</button>
                            <span>{quantity}</span>
                            {/*<button type="button" className="btn btn-light cursor-pointer" onClick={() => changeQuantity(id, 'plus')}>+</button>*/}
                            <button type="button" className="btn btn-light cursor-pointer" onClick={() => incrementQuantity(id)}>+</button>
                        </div>
                    </div>

                </div>
                <span className="badge rounded-pill price-quantity">{(+price * +quantity).toFixed(2)}$</span>
                <img
                    className="bi bi-archive-fill basket-icon-delete cursor-pointer"
                    src={delete_good}
                    onClick={() => deleteGoodFromOrder(id)}
                />
            </li>
        </>
    )
}