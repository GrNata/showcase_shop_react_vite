
import '../App.css';
import {Header} from "../layouts/Header.jsx";
import {Footer} from "../layouts/Footer.jsx";
import Shop from "./Shop.jsx";
import {useContext, useEffect, useState} from "react";
import {BasketList} from "./Basket/BasketList.jsx";
import {Alert} from "./Basket/Alert.jsx";
import {ShopContext} from "../context/Context.jsx";

function AppShop() {
    const [goods, setGoods] = useState([]);
    // const [order, setOrder] = useState([]);
    const [isBasketShow, setIsBasketShow] = useState(false);
    // const [quantityAll, setQuantityAll] = useState(0);
    const [allPrice, setAllPrice] = useState(0);
    const [isDeleteBasketItem, setIsDeleteBasketItem] = useState(false);
    const [reciveId, setReciveId] = useState(0);
    const [isChangeQuantity, setIsChangeQuantity] = useState(false);
    const [action, setAction] = useState('');
    const [alertTitle, setAlertTitle] = useState('');
    // const [chooseCategory, setChooseCategory] = useState('');
    const [categoriesList, setCategoriesList] = useState([]);

    const {allQuantity, order, incrementQuantity, decrementQuantity} = useContext(ShopContext);


    useEffect(() => {
        console.log('new goods - ', goods)
    }, [goods])


    const closeAlert = () => {
        setAlertTitle('');
    };

    // const addToBasket = (newOrder) => {
    //     console.log('Add to basket - ', newOrder)
    //
    //     const {id, title, price} = newOrder;
    //
    //         // вариант - 2
    //         // Проверяем, есть ли товар в корзине
    //     console.log('order before add - ', order)
    //         const existingItem = order.find(item => item.id === id);
    //         console.log('Add to basket existingItem  - ', existingItem)
    //
    //         let orderNew = null;
    //
    //         if (existingItem) {
    //             // Если есть, создаём новый массив с обновлённым количеством
    //             orderNew = order.map(item =>
    //                 item.id === id ? {...item, quantity: item.quantity + 1} : item
    //             );
    //         } else {
    //             // для подсказки
    //             setAlertTitle(title);
    //             // Если товара нет, добавляем новый
    //             orderNew = [...order, {id, title, price, quantity: 1}];
    //         }
    //         console.log('OrderNew - ', orderNew)
    //         setOrder(orderNew);
    //
    //     //     вариант -1
    //     // setOrder(prevOrder => {
    //     //     // Проверяем, есть ли товар в корзине
    //     //     const existingItem = prevOrder.find(item => item.id === id);
    //     //     console.log('Add to basket existingItem  - ', existingItem)
    //     //
    //     //     let orderNew = null;
    //     //
    //     //     if (existingItem) {
    //     //         // Если есть, создаём новый массив с обновлённым количеством
    //     //         return prevOrder.map(item =>
    //     //             item.id === id ? {...item, quantity: item.quantity + 1} : item
    //     //         );
    //     //     } else {
    //     //         // для подсказки
    //     //         setAlertTitle(title);
    //     //         // Если товара нет, добавляем новый
    //     //         return [...prevOrder, {id, title, price, quantity: 1}];
    //     //     }
    //     // });
    //
    // };

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
            // setOrder(prevOrder => {
                if (action === 'plus') {
                    console.log('useEffect findOrder - ', findOrder)
                    // Если есть, создаём новый массив с обновлённым количеством
                    // return prevOrder.map(item =>
                    //     item.id === findOrder[0].id ? {...item, quantity: item.quantity + 1} : item
                    // );
                    incrementQuantity(findOrder);
                }
                if (action === 'minus') {
                    // Если есть, создаём новый массив с обновлённым количеством
                    // return prevOrder.map(item =>
                    //     item.id === findOrder[0].id ? {...item, quantity: item.quantity - 1} : item
                    // );
                    decrementQuantity(findOrder[0]);
                }
            // });

        setAction('');

    }, [isChangeQuantity]);

    // Удаление товара из корзины
    useEffect(() => {
        // console.log('delete id - ', reciveId )
        const newOrder = order.filter(item => item.id !== reciveId);

        // !!!!
        // setOrder(newOrder !== undefined ? newOrder : order);

    }, [isDeleteBasketItem]);

    // При добавление товара в корзину - подсчет общего количества и всей суммы заказа
    useEffect(() => {
        // console.log('alertTitle - ', alertTitle)

        // DELETE_FROM_BASKET
        // проверка на < 0 количество товара в заказе, если да удалить
        order.map(item => {
            // if (item.quantity < 0) {
            if (item.quantity <= 0) {
                // console.log('delete in basked id - ', item.id)
                setReciveId(item.id);
                setIsDeleteBasketItem(!isDeleteBasketItem);
            }
        });

        // ALL_PRICE
        const allPriceCount = order.length === 0 ? 0 : order.reduce((sum, item) => sum + (Number(item.quantity) * Number(item.price) ), 0);
        setAllPrice(allPriceCount);

        // ALL_QUANTITY
        // let quantity = 0;
        // if (order.length > 0 ) {
        //     quantity = order.reduce((sum, item) => sum + Number(item.quantity), 0);
        // }
        // setQuantityAll(quantity);
        allQuantity();

    }, [order]);


    return (
        <>
            <Header
                // order={order}
                handelBasketShow={handelBasketShow}
                // quantityAll={quantityAll}
                categoriesList={categoriesList}
                setCategoriesList={setCategoriesList}
                setGoods={setGoods}
            />
            {
                isBasketShow && <BasketList
                    // order={order}
                    handelBasketShow={handelBasketShow}
                    // quantityAll={quantityAll}
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
                // setOrder={setOrder}
                  // order={order}
                  allPrice={allPrice}
                  // addToBasket={addToBasket}
                  changeQuantity={changeQuantity}
            />
            <Footer />
        </>
    )
}

export default AppShop;
