import {useContext, useEffect, useState} from "react";
import {fetchAllProducts, fetchSearchProducts} from "../service/DummyService.jsx";
import {Preloader} from "./Preloader.jsx";
import {GoodsList} from "./goods/GoodsList.jsx";
import {SearchGoods} from "./Filter/SearchGoods.jsx";
import {ShopContext} from "../context/ShopContext.jsx";

// function Shop() {
function Shop() {

    const {
        loading,
        setGoods,
        setLoading,
    } = useContext(ShopContext);

    const [searchProduct, setSearchProduct] = useState('');


    const handelSearchGoods = async (input) => {
        setLoading(true);
        const query = typeof input === 'string' ? input.toLowerCase() : input.target.value.toLowerCase();
        // console.log('search product - ', query);
        const searchGoods = await fetchSearchProducts(query);
        // console.log('Search - ', searchGoods.products )
        // console.log('Search - ', searchGoods )

        setGoods(searchGoods.products);
        // console.log("After setGoods call:", searchGoods.products);
        setSearchProduct('');
        setLoading(false);
    };

    return (
        <main className='container-fluid shop-container'>
            {
                loading ? <Preloader /> : (
                    <>
                        <SearchGoods handelSearchGoods={handelSearchGoods} searchProduct={searchProduct} setSearchProduct={setSearchProduct}/>
                        <GoodsList />
                    </>
                    )
            }
        </main>
    )
}

export default Shop;