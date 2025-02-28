import {useEffect, useState} from "react";
import {fetchAllProducts, fetchSearchProducts} from "../service/DummyService.jsx";
import {Preloader} from "./Preloader.jsx";
import {GoodsList} from "./goods/GoodsList.jsx";
import {SearchGoods} from "./Filter/SearchGoods.jsx";

// function Shop() {
function Shop({
                  goods = [],
                  setGoods,
                  setOrder,
                  order,
                  // allPrice = 0,
                  addToBasket=Function.prototype,
                  changeQuantity
              }) {

    // const [goods, setGoods] = useState([]);
    // количество загруженного товара (размер goods)
    const [totalPosition, setTotalPosition] = useState(0);
    const [loading, setLoading] = useState(true);
    const [searchProduct, setSearchProduct] = useState('');

    console.log('SHOP goods - ', goods)


    const handelSearchGoods = async (input) => {
        const query = typeof input === 'string' ? input.toLowerCase() : input.target.value.toLowerCase();
        console.log('search product - ', query);
        const searchGoods = await fetchSearchProducts(query);
        console.log('Search - ',searchGoods.products )

        setGoods(searchGoods.products);
        setSearchProduct('');
    };

    useEffect(() => {
        async function getProducts() {
            try {
                const { products, total } = await fetchAllProducts();
                setGoods(products);
                setTotalPosition(total);
                setLoading(false);
                console.log('total - ', total);
                console.log('goods - ', products);
            } catch (error) {
                console.error("Ошибка загрузки данных (useEffect Shop.jsx):", error);
                setLoading(false);
            }
    }

    getProducts();

    }, []);

    // useEffect(() => {
    //     setSearchProduct('');
    // }, [goods])

    return (
        <main className='container-fluid shop-container'>
            {
                loading ? <Preloader /> : (
                    <>
                        <SearchGoods handelSearchGoods={handelSearchGoods} searchProduct={searchProduct} setSearchProduct={setSearchProduct}/>
                        <GoodsList
                            goods={goods}
                            setOrder={setOrder}
                            order={order}
                            addToBasket={addToBasket}
                            changeQuantity={changeQuantity}
                        />
                    </>
                    )
            }
        </main>
    )
}

export default Shop;