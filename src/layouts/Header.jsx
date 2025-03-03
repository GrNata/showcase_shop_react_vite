import icon_basket from '../assets/basket_blue.jpg';
import {Card} from "../components/Basket/Card.jsx";
import {useContext, useEffect, useState} from "react";
import {fetchProductsByCategory, fetchCategoriesList} from "../service/DummyService.jsx";
import {CategoryItem} from "./CategoryItem.jsx";
import {API_URL_BASE} from "../config.js";
import {ShopContext} from "../context/ShopContext.jsx";

export const Header = ({
                           // order,
                           // handelBasketShow=Function.prototype,
                           //  quantityAll,
                           // categoriesList = [],
                           // // setCategoriesList = [],
                           //  setGoods
                       }) => {
    const {
        order,
        quantityAll,
        categoriesList,
        setGoods,
        handelBasketShow,
        setCategoriesList
    } = useContext(ShopContext);

    // const [categoriesList, setCategoriesList] = useState([]);
    const [selected, setSelected] = useState(null);

    useEffect(() => {

        if (!categoriesList.length > 0) {
            getCategoriesList();
        }
    }, [])

    const getCategoriesList = async () => {
        const list = await fetchCategoriesList();
        // console.log('list - ', list)

        const categories = [
            {id: 1, category: 'All', url: API_URL_BASE, isChecked: true},
            ...list.map((item, index) => ({
                id: (index + 2),
                category: item.name,
                url: item.url,
                isChecked: false
            }))
        ];
        console.log('categories - ', categories)
        setCategoriesList(categories);
    }

    const checkedCategory = async (id) => {
        console.log('checkedCategory id - ', id, ' isSelected - ', selected)
        const updateList = categoriesList.map((item) => ({
            ...item,
            isChecked: item.id === id ? !item.isChecked : false, // Сбрасываем все, кроме текущего
        }));
        setCategoriesList(updateList);

        const categotyFind = updateList.find(item => item.id === id);
        if (categotyFind?.url) {
            const goodsByCategory = await fetchProductsByCategory(categotyFind.url);
            setGoods(goodsByCategory.products);
        }

        setSelected((prev => prev === id ? null : id));
    }



    return (
            <>
                {/* Навигационная панель */}
                <nav className="navbar navbar-expand-lg navbar-dark fixed-top w-100 custom-header">
                    <div className="container-fluid d-flex justify-content-center position-relative">

                        {/* Кнопка бокового меню слева */}
                        <button
                            className="btn btn-light position-absolute start-0"
                            type="button"
                            data-bs-toggle="offcanvas"
                            data-bs-target="#sidebarMenu"
                            aria-controls="sidebarMenu"
                            onClick={getCategoriesList}
                        >
                            <i className="bi bi-list"></i>
                        </button>

                        {/* Заголовок по центру */}
                        <a className="navbar-brand mx-auto text-center" href="#">Витрина - интернет магазина</a>

                        {/* Корзина справа */}
                        <Card quantity={quantityAll} order={order} handelBasketShow={handelBasketShow} />
                    </div>
                </nav>

                {/* Боковое меню (Offcanvas Sidebar) */}
                <div className="offcanvas offcanvas-start" tabIndex="-1" id="sidebarMenu" aria-labelledby="sidebarMenuLabel">
                    <div className="offcanvas-header">
                        <h6 className="offcanvas-title" id="sidebarMenuLabel">Categories:</h6>
                        {/*<button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>*/}
                    </div>
                    <div className="offcanvas-body">
                        <ul className="list-unstyled">
                            <li>
                                {/*<p>Categories</p>*/}
                                {/*<a className="dropdown-item" href="#">Categories</a>*/}
                                <div className="d-flex flex-column">
                                    {
                                        categoriesList.map((item) => (
                                            <CategoryItem
                                                checkedCategory={checkedCategory}
                                                {...item}
                                                key={item.id}
                                                // setSelected={setSelected}
                                                selected={selected}
                                            />
                                        ))
                                    }
                                </div>
                            </li>
                            {/*<li><a className="dropdown-item" href="#">Настройки</a></li>*/}
                            {/*<li>*/}
                            {/*    <hr className="dropdown-divider"/>*/}
                            {/*</li>*/}
                            {/*<li><a className="dropdown-item" href="#">Выйти</a></li>*/}
                        </ul>
                    </div>
                </div>
            </>

    )
}