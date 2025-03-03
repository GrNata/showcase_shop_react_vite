import {useContext, useEffect, useState} from "react";
import {fetchAllProducts, fetchSearchProducts} from "../service/DummyService.jsx";
import {Preloader} from "./Preloader.jsx";
import {GoodsList} from "./goods/GoodsList.jsx";
import {SearchGoods} from "./Filter/SearchGoods.jsx";
import {ShopContext} from "../context/ShopContext.jsx";

// function Shop() {
function Shop({
                  // goods = [],
                  // setGoods,
                  // setOrder,
                  // order,
                  // addToBasket=Function.prototype,
                  // incrementQuantity,
                  // decrementQuantity
              }) {

    const {
        goods,
        loading,
        order,
        setGoods,
        setOrder,
        setLoading,
        addToBasket=Function.prototype,
        incrementQuantity,
        decrementQuantity
    } = useContext(ShopContext);

    // количество загруженного товара (размер goods)
    // const [totalPosition, setTotalPosition] = useState(0);
    // const [loading, setLoading] = useState(true);
    const [searchProduct, setSearchProduct] = useState('');


    const handelSearchGoods = async (input) => {
        setLoading(true);
        const query = typeof input === 'string' ? input.toLowerCase() : input.target.value.toLowerCase();
        console.log('search product - ', query);
        const searchGoods = await fetchSearchProducts(query);
        // console.log('Search - ', searchGoods.products )
        console.log('Search - ', searchGoods )

        setGoods(searchGoods.products);
        console.log("After setGoods call:", searchGoods.products);
        setSearchProduct('');
        setLoading(false);
    };

    // // первоначальная загрузка товаров
    // useEffect(() => async function getProducts() {
    //     console.log('useEffect - 1')
    //     const data = await fetchAllProducts();
    //     setGoods(data);
    //     // const {products, total} = await fetchAllProducts();
    //     // setGoods(products);
    //     // setTotalPosition(total);
    //     // setLoading(false);
    //
    //     // console.log('total - ', total)
    //     // console.log('goods - ', products)
    //
    // }, []);



    return (
        <main className='container-fluid shop-container'>
            {
                loading ? <Preloader /> : (
                    <>
                        <SearchGoods handelSearchGoods={handelSearchGoods} searchProduct={searchProduct} setSearchProduct={setSearchProduct}/>
                        <GoodsList
                            // goods={goods}
                            // setOrder={setOrder}
                            // order={order}
                            // addToBasket={addToBasket}
                            // incrementQuantity={incrementQuantity}
                            // decrementQuantity={decrementQuantity}
                        />
                    </>
                    )
            }
        </main>
    )
}

export default Shop;