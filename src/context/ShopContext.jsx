import {createContext, useReducer, useState} from "react";
import {ShopReducer} from "../components/reducer/ShopReducer.jsx";

export const ShopContext = createContext();

const initialState = {
    goods:[],
    order: [],
    isBasketShow: false,
    quantityAll: 0,
    allPrice: 0,
    alertTitle: '',
    categoriesList: [],
    totalPosition: 0,
    loading: true,
}

export const ContextProvider = ({children}) => {
    const [state, dispatch]= useReducer(ShopReducer, initialState);

    const contextValue = {
        ...state,
        setGoods: (data) => {
            dispatch({type: 'SET_GOODS', payload: data})
        },
        setOrder: (newOrder) => {
            dispatch({type: 'SET_ORDER', payload: newOrder})
        },
        setCategoriesList: (categories) => {
            dispatch({type: 'SET_CATEGORY_LIST', payload: categories})
        },
        setLoading: (loading) => {
            dispatch({type: 'SET_LOADING', payload: loading})
        },
        closeAlert: () => {
            dispatch({type: 'CLOSE_ALERT'})
        },
        handelBasketShow: () => {
            dispatch({type: 'HANDLE_BASKET_SHOW'})
        },
        addToBasket: (newOrder) => {
            dispatch({type: 'ADD_TO_BASKET', payload: newOrder})
        },

        deleteGoodFromOrder: (id) => {
            dispatch({type: 'DELETE_GOOD_FROM_ORDER', payload: id})
        },
        incrementQuantity: (id) => {
            dispatch({type: 'INCREMENT_QUANTITY', payload: id})
        },
        decrementQuantity: (id) => {
            dispatch({type: 'DECREMENT_QUANTITY', payload: id})
        },
        countAllPrice: () => {
            dispatch({type: 'COUNT_ALL_PRICE'})
        },
        countAllQuantity: () => {
            dispatch({type: 'COUNT_ALL_QUANTITY'})
        }
    };

    return (
        <ShopContext.Provider value={contextValue}>
            {children}
        </ShopContext.Provider>
    );

    // value.setGoods = (data) => {
    //     dispatch({type: 'SET_GOODS', payload: data})
    // };
    // value.setOrder = (newOrder) => {
    //     dispatch({type: 'SET_ORDER', payload: newOrder})
    // };
    // value.setCategoriesList = (categories) => {
    //     dispatch({type: 'SET_CATEGORY_LIST', payload: categories})
    // };
    // value.closeAlert = () => {
    //     dispatch({type: 'CLOSE_ALERT'})
    // };
    // value.handelBasketShow = () => {
    //     dispatch({type: 'HANDLE_BASKET_SHOW'})
    // };
    // value.addToBasket =(newOrder) => {
    //     dispatch({type: 'ADD_TO_BASKET', payload: newOrder})
    // };
    // value.deleteGoodFromOrder = (id) => {
    //     dispatch({type: 'DELETE_GOOD_FROM_ORDER', payload: id})
    // };
    // value.incrementQuantity = (id) => {
    //     dispatch({type: 'INCREMENT_QUANTITY', payload: id})
    // };
    // value.decrementQuantity = (id) => {
    //     dispatch({type: 'DECREMENT_QUANTITY', payload: id})
    // };
    // value.countAllPrice = () => {
    //     dispatch({type: 'COUNT_ALL_PRICE'})
    // };
    // value.countAllQuantity = () => {
    //     dispatch({type: 'COUNT_ALL_QUANTITY'})
    // };

}