import {GoodItem} from "./GoodItem.jsx";

export const GoodsList = (props) => {
    const {
        goods = [],
        setOrder,
        order,
        addToBasket = Function.prototype,
        changeQuantity
    } = props;

    if (!goods.length) {
        return <h3>Error, goods is not</h3>
    }

    return (
        <div className={`container-fluid ${goods.length === 1 ? 'd-flex justify-content-center' : ''}`}>
            <div className="row g-4">
                {/*<div className={`row g-4 ${goods.length === 1 ? 'justify-content-center' : ''}`}>*/}
                {goods.map((good, index) => {
                    console.log("GoodsList: Rendering GoodItem:", good);
                    return (
                        <GoodItem key={good.id || index}
                                  good={good}
                                  setOrder={setOrder}
                                  order={order}
                                  addToBasket={addToBasket}
                                  changeQuantity={changeQuantity}
                                  isSingle={goods.length === 1} // передаём инфо о количестве товаров
                        />
                    )
                } )}
            </div>
        </div>
    )
}