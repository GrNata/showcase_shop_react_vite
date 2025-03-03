import {fetchCategoriesList} from "../../service/DummyService.jsx";
import {API_URL_BASE} from "../../config.js";

export const ShopReducer =(state, {type, payload}) => {

    switch (type) {

        case 'SET_GOODS': {
            console.log('SET_GOODS payload - ', payload)
            return {
                ...state,
                goods: payload || [],
                // goods: payload.products || [],
                // totalPosition: payload.total || 0,
                loading: false
            };
        }

        case 'SET_ORDER':
            return  {
            ...state,
            order: payload.newOrder
            };
        case 'SET_CATEGORY_LIST':
            return {
                ...state,
                categoriesList: payload
            };
        case 'SET_LOADING':
            return {
                ...state,
                loading: payload
            }
        case 'CLOSE_ALERT':
            return {
                ...state,
                alertTitle: ''
            };
        case 'HANDLE_BASKET_SHOW':
            return {
                ...state,
                isBasketShow: !state.isBasketShow
            };
        case 'ADD_TO_BASKET': {
            const {id, title, price} = payload;
                // Проверяем, есть ли товар в корзине
                const existingItem = state.order.find(item => item.id === id);
                let newOrder;
                let titleForalert = '';
                if (existingItem) {
                    // Если есть, создаём новый массив с обновлённым количеством
                    newOrder = state.order(item =>
                        item.id === id ? {...item, quantity: item.quantity + 1} : item
                    );
                } else {
                    // Если товара нет в корзине, добавляем новый
                    newOrder = [...state.order, {id, title, price, quantity: 1}];
                    titleForalert = title;
                }
            return {
                ...state,
                order: newOrder,
                alertTitle: titleForalert
            };
        }
        case 'DELETE_GOOD_FROM_ORDER': {
            const newOrder = state.order.filter(item => item.id !== payload);
            return {
                ...state,
                order: newOrder !== undefined ? newOrder : state.order
            };
        }
        case 'INCREMENT_QUANTITY': {
            const incOrder = state.order.map(item =>
                item.id === payload ? {...item, quantity: item.quantity + 1} : item
            );
            return {
                ...state,
                order: incOrder
            };
        }
        case 'DECREMENT_QUANTITY':
            return {
                ...state,
                order: state.order.map(item =>
                    item.id === payload ? (
                        // проверка на === 0 количество товара в заказе, если да удалить
                        item.quantity > 1 ?
                            {...item, quantity: item.quantity - 1} : null
                    ) : item
                )
                    .filter(Boolean) // Убираем `null`, чтобы удалить товар
            };
        case 'COUNT_ALL_PRICE': {
            const allPriceCount = state.order.length === 0 ?
                0 :
                state.order.reduce((sum, item) => sum + (Number(item.quantity) * Number(item.price) ), 0)
                    .toFixed(2);
            return {
                ...state,
                allPrice: allPriceCount
            };
        }
        case 'COUNT_ALL_QUANTITY': {
            let quantity = 0;
            if (state.order.length > 0 ) {
                quantity = state.order.reduce((sum, item) => sum + Number(item.quantity), 0);
            }
            return {
                ...state,
                quantityAll: quantity
            }
        };

        default:
            return state
    }
}