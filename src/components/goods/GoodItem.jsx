// import no_foto from '../assets/no_foto.jpg';
import {useContext, useState} from "react";
import {ImageLoader} from "./ImageLoader.jsx";
import {ShopContext} from "../../context/ShopContext.jsx";

export const GoodItem = ({
                             good,
                             isSingle
                        }) => {
    const {id, title, price, category, description, rating, images} = good;

    const {
        order = [],
        addToBasket = Function.prototype,
        incrementQuantity = Function.prototype,
        decrementQuantity = Function.prototype
    } = useContext(ShopContext);

    const [isExpanded, setIsExpanded] = useState(false);

    return (
        // <div key={id} className="col-12 col-sm-6 col-lg-3">
        <div key={id} className={`col-12 ${isSingle ? 'col-md-12 col-lg-12' : 'col-sm-6 col-md-4 col-lg-3'}`}>
            <div className="card">
                <div className="card-body-my">
                    <ImageLoader className="img-fluid" src={images} alt={id}/>
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text  d-flex justify-content-between categoty-price-card mt-3 mb-2">
                        <span>category: </span>
                        <span>{category}</span>
                    </p>
                    <p className="card-text  d-flex justify-content-between categoty-price-card mt-0 mb-2">
                        <span>rating: </span>
                        <span>{rating}</span>
                    </p>
                    {/*<p className="card-text description-card">{description}</p>*/}
                    {/* При нажатии показываем описание*/}
                    <div className='description-container'>
                        <p className="card-text description-card">
                            {isExpanded ? description : `${description.slice(0, 25)}...`}
                        </p>
                        <button className='btn btn-description' onClick={() => setIsExpanded(!isExpanded)}>
                            {isExpanded ? 'Close' : 'More details...'}
                        </button>
                    </div>

                    <p className='card-text raiting-cart'>{price}$</p>
                    {/* Если order пустой, показываем кнопку Buy, иначе показываем кнопки + и -  */}
                    {
                        order.length === 0 ||
                        !order.some(item => item.id === id)
                        // || order.some(item => item.id === id && item.quantity === 0)
                            ? (
                            <button onClick={() => addToBasket(good)} type="button" className="btn btn-bay">
                                Buy
                            </button>
                        ) : (
                             // Проверяем, есть ли товар в корзине, если есть - отображаем кнопки для изменения количества
                        <>
                            <div className="d-flex align-items-center gap-4">
                                <button type="button" className="btn btn-light cursor-pointer" onClick={() => decrementQuantity(id)}>
                                    -
                                </button>
                                <span>
                                    {
                                        order.find(item => item.id === id) ?.quantity
                                    }
                                </span>
                                <button type="button" className="btn btn-light cursor-pointer" onClick={() => incrementQuantity(id)}>
                                    +
                                </button>
                            </div>
                        </>
                    )}
        </div>
    </div>
</div>
)
};