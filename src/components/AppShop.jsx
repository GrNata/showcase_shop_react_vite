
import '../App.css';
import {Header} from "../layouts/Header.jsx";
import {Footer} from "../layouts/Footer.jsx";
import Shop from "./Shop.jsx";
import {useContext, useEffect, useState} from "react";
import {BasketList} from "./Basket/BasketList.jsx";
import {Alert} from "./Basket/Alert.jsx";
import {ShopContext} from "../context/ShopContext.jsx";
import {fetchAllProducts} from "../service/DummyService.jsx";


function AppShop() {

    const {
        goods = [],
        order = [],
        isBasketShow,
        alertTitle,
        quantityAll,
        allPrice,
        setOrder,
        countAllPrice,
        countAllQuantity,
        setGoods
    } = useContext(ShopContext);

    useEffect(() => {
        console.log('new goods - ', goods)
    }, [goods])

    useEffect(  () => {
        const fetchData = async () => {
            const data = await fetchAllProducts();
            setGoods(data.products);
            // console.log('recieva data - ', data)
        };
        fetchData();
    }, []);

    // !!//
    // const closeAlert = () => {
    //     setAlertTitle('');
    // };
    //
    // // !!
    // const addToBasket = (newOrder) => {
    //     const {id, title, price} = newOrder;
    //
    //     setOrder(prevOrder => {
    //         // Проверяем, есть ли товар в корзине
    //         const existingItem = prevOrder.find(item => item.id === id);
    //
    //         if (existingItem) {
    //             // Если есть, создаём новый массив с обновлённым количеством
    //             return prevOrder.map(item =>
    //                 item.id === id ? {...item, quantity: item.quantity + 1} : item
    //             );
    //         } else {
    //             return [...prevOrder, {id, title, price, quantity: 1}];
    //         }
    //     });
    // };
    //
    // // !!
    // // показ / закрытие корзины
    // const handelBasketShow = () => {
    //     // console.log('handelBasketShow')
    //     setIsBasketShow(!isBasketShow)
    // }
    //
    // // !!
    // // Удаление товара из заказа
    // const deleteGoodFromOrder = (id) => {
    //     const newOrder = order.filter(item => item.id !== id);
    //     setOrder(newOrder !== undefined ? newOrder : order);
    // }
    //
    // // !!
    // const incrementQuantity = (id) => {
    //     setOrder(prevOrder => {
    //         // Если есть, создаём новый массив с обновлённым количеством
    //         return prevOrder.map(item =>
    //             item.id === id ? {...item, quantity: item.quantity + 1} : item
    //         );
    //     });
    // }
    //
    // // !!
    // const decrementQuantity = (id) => {
    //     setOrder(prevOrder => {
    //         return prevOrder.map(item =>
    //             item.id === id ? (
    //                 // проверка на === 0 количество товара в заказе, если да удалить
    //                     item.quantity > 1 ?
    //                         {...item, quantity: item.quantity - 1} : null
    //                 ) : item
    //             )
    //             .filter(Boolean) // Убираем `null`, чтобы удалить товар
    //     });
    // };
    //
    // // !!
    // const countAllPrice = () => {
    //     const allPriceCount = order.length === 0 ? 0 : order.reduce((sum, item) => sum + (Number(item.quantity) * Number(item.price) ), 0);
    //     setAllPrice(allPriceCount.toFixed(2));
    // };
    //
    // // !!
    // const countAllQuantity = () => {
    //     let quantity = 0;
    //     if (order.length > 0 ) {
    //         quantity = order.reduce((sum, item) => sum + Number(item.quantity), 0);
    //     }
    //     setQuantityAll(quantity);
    // };


    // При изменении заказа - подсчет общего количества и всей суммы заказа
    useEffect(() => {
        countAllPrice();
        countAllQuantity();
    }, [order]);


    return (
        <>
            <Header
                // order={order}
                // handelBasketShow={handelBasketShow}
                // quantityAll={quantityAll}
                // categoriesList={categoriesList}
                // setCategoriesList={setCategoriesList}
                // setGoods={setGoods}
            />
            {
                isBasketShow && <BasketList
                    // order={order}
                    // handelBasketShow={handelBasketShow}
                    // quantityAll={quantityAll}
                    // allPrice={allPrice}
                    // deleteGoodFromOrder={deleteGoodFromOrder}
                    // // changeQuantity={changeQuantity}
                    // incrementQuantity={incrementQuantity}
                    // decrementQuantity={decrementQuantity}
                />
            }
            {
                alertTitle && <Alert
                    // title={alertTitle}
                                     // closeAlert={closeAlert}
                                />
            }
            <Shop
                // goods={goods}
                // // setGoods={setGoods}
                // setOrder={setOrder}
                //   order={order}
                //   allPrice={allPrice}
                //   addToBasket={addToBasket}
                //   // changeQuantity={changeQuantity}
                // incrementQuantity={incrementQuantity}
                //     decrementQuantity={decrementQuantity}
            />
            <Footer />
        </>
    )
}

export default AppShop;
