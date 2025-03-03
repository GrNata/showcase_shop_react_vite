
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
        order = [],
        isBasketShow,
        alertTitle,
        countAllPrice,
        countAllQuantity,
        setGoods
    } = useContext(ShopContext);


    useEffect(  () => {
        const fetchData = async () => {
            const data = await fetchAllProducts();
            setGoods(data.products);
        };
        fetchData();
    }, []);


    // При изменении заказа - подсчет общего количества и всей суммы заказа
    useEffect(() => {
        countAllPrice();
        countAllQuantity();
    }, [order]);


    return (
        <>
            <Header/>
            {
                isBasketShow && <BasketList />
            }
            {
                alertTitle && <Alert/>
            }
            <Shop />
            <Footer />
        </>
    )
}

export default AppShop;
