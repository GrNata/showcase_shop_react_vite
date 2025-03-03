
export function reducerShop(state, {type, payload}) {

    switch (type) {
        case 'CLOSE_ALERT':
            return {
                ...state,
                alertTitle: '',
            };
        case 'ADD_TO_BASKET':
             {
                console.log('order before add - ', state.order);
                const existingItem = state.order.find(item => item.id === payload.id);
                // console.log('Add to basket existingItem  - ', existingItem);

                let orderNew = null;
                let titleForAlert = ''
                if (existingItem) {
                    // Если есть, создаём новый массив с обновлённым количеством
                    orderNew = state.order.map(item =>
                        item.id === payload.id ? {...item, quantity: item.quantity + 1} : item
                    );
                } else {
                    // для подсказки
                    titleForAlert = payload.title;
                    // Если товара нет, добавляем новый
                    const {id, title, price} = payload;
                    orderNew = [...state.order, {id, title, price, quantity: 1}];
                }
                console.log('OrderNew - ', orderNew)
                 return {
                        ...state,
                     order: orderNew,
                     alertTitle: titleForAlert,
                 }
            }
        case 'HANDLE_BASKET_SHOW':
            return {
                ...state,
                isBasketShow: !state.isBasketShow,
                }
        case 'DELETE_GOOD_FROM_ORDER':
            return {
                ...state,
                reciveId: payload.id,
                isDeleteBasketItem: !state.isDeleteBasketItem,
            };
        case 'CHANGE_QUANTITY':
            return {
                ...state,
                reciveId: payload.id,
                action: payload.operation,
                isChangeQuantity: !state.isChangeQuantity,
            }
        case 'DELETE_FROM_BASKET':
        {
            // console.log('alertTitle - ', alertTitle)

            // проверка на < 0 количество товара в заказе, если да удалить
            state.order.map(item => {
                // if (item.quantity < 0) {
                if (item.quantity <= 0) {
                    console.log('delete in basked id - ', item.id)
                    // setReciveId(item.id);
                    // setIsDeleteBasketItem(!isDeleteBasketItem);
                    return {
                        ...state,
                        reciveId: item.id,
                        isDeleteBasketItem: !state.isDeleteBasketItem
                    }
                }
            });


            // const allPriceCount = order.length === 0 ? 0 : order.reduce((sum, item) => sum + (Number(item.quantity) * Number(item.price) ), 0);
            // setAllPrice(allPriceCount);
            //
        }
        case 'ALL_QUANTITY':
        {
            let quantity = 0;
            console.log('REDUCER order - ', state.order)
            if (state.order.length > 0 ) {
                quantity = state.order.reduce((sum, item) => sum + Number(item.quantity), 0);
            }
            console.log('REDUCER quantity All - ', quantity)
            return {
                ...state,
                quantityAll: quantity
            }
        }
        case 'INCREMENT_QUANTITY':
        {
            console.log('increment findOrder - ', payload)
                    // Если есть, создаём новый массив с обновлённым количеством
            const newOrder =  state.order.map(item =>
                item.id === payload ? {...item, quantity: item.quantity + 1} : item);
            return {
                ...state,
                order: newOrder
            }
        }
        case 'DECREMENT_QUANTITY':
        {
            const newOrder =  state.order.map(item =>
                    item.id === payload.findOrder[0].id ? {...item, quantity: item.quantity - 1} : item);
            return {
                ...state,
                order: newOrder
            }
            // }
        }


        default:
            return state;
    }
}