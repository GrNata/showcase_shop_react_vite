import {createContext, useReducer, useState} from "react";
import {reducerShop} from "../reducer/Reducer.jsx";


export const ShopContext = createContext();


const initialState = {
    goods: [],
    order: [],
    isBasketShow: false,
    quantityAll: 0,
    allPrice: 0,
    isDeleteBasketItem: false,
    reciveId: 0,
    isChangeQuantity: false,
    action: '',
    alertTitle: '',
    categoriesList: []

}

export const ContextProviderShop = ({children}) => {
    const [value, dispatch] = useReducer(reducerShop, initialState);

    value.closeAlert = () => {
      dispatch({type: 'CLOSE_ALERT'})
    };
    value.addToBasket = (newOrder) => {
        dispatch({type: 'ADD_TO_BASKET', payload: newOrder})
    };
    value.handelBasketShow = () => {
        dispatch({type: 'HANDLE_BASKET_SHOW'})
    };
    value.deleteGoodFromOrder = (id) => {
        dispatch({type: 'DELETE_GOOD_FROM_ORDER', payload: {id: id}})
    };
    value.changeQuantity = (id, operation) => {
        dispatch({type: 'CHANGE_QUANTITY', payload: {id: id, operation: operation}})
    };

    value.deleteFromOrder = () => {
        dispatch({type: 'DELETE_FROM_BASKET'})
    };
    value.allQuantity = () => {
        dispatch({type: 'ALL_QUANTITY'})
    };
    value.incrementQuantity = (findOrder) => {
        if (!findOrder.length) {
            console.error("Ошибка: передан пустой массив в incrementQuantity");
            return;
        }
        dispatch({type: 'INCREMENT_QUANTITY', payload: findOrder})
    };
    value.decrementQuantity = (findOrder) => {
        dispatch({type: 'DECREMENT_QUANTITY', payload: findOrder})
    };

    return (
        <ShopContext.Provider value={value}>
            {children}
        </ShopContext.Provider>
    );
};