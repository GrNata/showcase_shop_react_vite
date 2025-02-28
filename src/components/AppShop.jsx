
import '../App.css';
import {Header} from "../layouts/Header.jsx";
import {Footer} from "../layouts/Footer.jsx";
import Shop from "./Shop.jsx";
import {useEffect, useState} from "react";
import {BasketList} from "./Basket/BasketList.jsx";
import {Alert} from "./Basket/Alert.jsx";

function AppShop() {
    const [goods, setGoods] = useState([]);
    const [order, setOrder] = useState([]);
    const [isBasketShow, setIsBasketShow] = useState(false);
    const [quantityAll, setQuantityAll] = useState(0);
    const [allPrice, setAllPrice] = useState(0);
    const [isDeleteBasketItem, setIsDeleteBasketItem] = useState(false);
    const [reciveId, setReciveId] = useState(0);
    const [isChangeQuantity, setIsChangeQuantity] = useState(false);
    const [action, setAction] = useState('');
    const [alertTitle, setAlertTitle] = useState('');
    // const [chooseCategory, setChooseCategory] = useState('');
    const [categoriesList, setCategoriesList] = useState([]);

    console.log("🔥 Рендер AppShop!");


    useEffect(() => {
        console.log('new goods - ', goods)
    }, [goods])


    const closeAlert = () => {
        setAlertTitle('');
    };

    const addToBasket = (newOrder) => {
        const {id, title, price} = newOrder;

        setOrder(prevOrder => {
            // Проверяем, есть ли товар в корзине
            const existingItem = prevOrder.find(item => item.id === id);

            if (existingItem) {
                // Если есть, создаём новый массив с обновлённым количеством
                return prevOrder.map(item =>
                    item.id === id ? {...item, quantity: item.quantity + 1} : item
                );
            } else {
                // для подсказки
                setAlertTitle(title);
                // Если товара нет, добавляем новый
                // return [...prevOrder, {id, title, price, quantity: 1, isInBasket: true}];
                return [...prevOrder, {id, title, price, quantity: 1}];
            }
        });
    };

    // показ / закрытие корзины
    const handelBasketShow = () => {
        // console.log('handelBasketShow')
        setIsBasketShow(!isBasketShow)
    }

    // Удаление товара из заказа
    const deleteGoodFromOrder = (id) => {
        setReciveId(id)
        setIsDeleteBasketItem(!isDeleteBasketItem);
    }

    // Изменение количества товара в заказе
    const changeQuantity = (id, operation) => {
        // console.log('changeQuantity id - ', id, ' operation - ', operation)
        setReciveId(id);
        setAction(operation);
        setIsChangeQuantity(!isChangeQuantity);
    }

    // Изменения количества товара в корзине
    useEffect(() => {
        // console.log('change quantity id', - action)
        if (action === '') return;
        const findOrder = order.filter(item => item.id === reciveId);
        // console.log('findOrder - ', findOrder, ', id - ', findOrder[0].id)
        // if (action === 'plus') {
            setOrder(prevOrder => {

                if (action === 'plus') {
                    // Если есть, создаём новый массив с обновлённым количеством
                    return prevOrder.map(item =>
                        item.id === findOrder[0].id ? {...item, quantity: item.quantity + 1} : item
                    );
                }
                if (action === 'minus') {
                    // Если есть, создаём новый массив с обновлённым количеством
                    return prevOrder.map(item =>
                        item.id === findOrder[0].id ? {...item, quantity: item.quantity - 1} : item
                    );
                }
            });

        setAction('');

    }, [isChangeQuantity]);

    // Удаление товара из корзины
    useEffect(() => {
        // console.log('delete id - ', reciveId )
        const newOrder = order.filter(item => item.id !== reciveId);
        setOrder(newOrder !== undefined ? newOrder : order);
    }, [isDeleteBasketItem]);

    // При добавление товара в корзину - подсчет общего количества и всей суммы заказа
    useEffect(() => {
        // console.log('alertTitle - ', alertTitle)

        // проверка на < 0 количество товара в заказе, если да удалить
        order.map(item => {
            // if (item.quantity < 0) {
            if (item.quantity <= 0) {
                // console.log('delete in basked id - ', item.id)
                setReciveId(item.id);
                setIsDeleteBasketItem(!isDeleteBasketItem);
            }
        });

        const allPriceCount = order.length === 0 ? 0 : order.reduce((sum, item) => sum + (Number(item.quantity) * Number(item.price) ), 0);
        setAllPrice(allPriceCount.toFixed2);

        let quantity = 0;
        if (order.length > 0 ) {
            quantity = order.reduce((sum, item) => sum + Number(item.quantity), 0);
        }
        setQuantityAll(quantity);
    }, [order]);

    console.log("AppShop: Перед рендером Shop:", { goods, setGoods });

    return (
        <>
            <Header
                order={order}
                handelBasketShow={handelBasketShow}
                quantityAll={quantityAll}
                categoriesList={categoriesList}
                setCategoriesList={setCategoriesList}
                setGoods={setGoods}
            />
            {
                isBasketShow && <BasketList
                    order={order}
                    handelBasketShow={handelBasketShow}
                    quantityAll={quantityAll}
                    allPrice={allPrice}
                    deleteGoodFromOrder={deleteGoodFromOrder}
                    changeQuantity={changeQuantity}
                />
            }
            {
                alertTitle && <Alert title={alertTitle} closeAlert={closeAlert} />
            }

            <Shop
                goods={goods}
                setGoods={setGoods}
                setOrder={setOrder}
                order={order}
                allPrice={allPrice}
                addToBasket={addToBasket}
                changeQuantity={changeQuantity}
                    />

            <Footer />
        </>
    )
}

export default AppShop;
