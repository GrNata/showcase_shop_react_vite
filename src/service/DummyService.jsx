import {API_URL_BASE, API_URL_CATEGORIES_LIST, API_URL_PRODUCT_BY_CATEGORY, API_URL_SEARCH_PRODUCT} from "../config.js";


export const fetchAllProducts = async () => {
    const res = await fetch(API_URL_BASE
        //     , {
        // header: {
        //     'key': API_KEY,
        // }}
        );

    try {
        return await res.json();
    } catch (error) {
        console.log("Ошибка загрузки данных - ", error);
    }
}

export const fetchCategoriesList = async () => {
        try {
            const res = await fetch(API_URL_CATEGORIES_LIST);
            return await res.json();
        } catch (error) {
            console.log("Ошибка загрузки данных - ", error);
        }
};

export const fetchProductsByCategory = async (url) => {
    // console.log('URL - ', {url})
    // const res = await fetch(`${API_URL_PRODUCT_BY_CATEGORY}${url}`);
    const res = await fetch(url);
    try {
        return await res.json();
    } catch (error) {
        console.log("Ошибка загрузки данных - ", error);
    }
}

export const fetchSearchProducts = async (product) => {
    const res = await fetch(`${API_URL_SEARCH_PRODUCT}${product}`);
    try {
        return await res.json();
    } catch (error) {
        console.log("Ошибка загрузки данных - ", error);
    }
}



