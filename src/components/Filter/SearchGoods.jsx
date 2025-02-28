import {fetchSearchProducts} from "../../service/DummyService.jsx";

export const SearchGoods = ({handelSearchGoods, searchProduct, setSearchProduct}) => {

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handelSearchGoods(event);
        }
    };

    const handleClick = () => {
        console.log('Click - ', searchProduct)
        handelSearchGoods(searchProduct);
    };

    return (
        <div className="input-group mb-3">
            <input
                type="text"
                className="form-control"
                placeholder="Enter name of good / product"
                aria-label="Имя пользователя получателя"
                aria-describedby="button-addon2"
                name='searchProduct'
                value={searchProduct}
                onChange={(e) => setSearchProduct(e.target.value)}
                onKeyDown={handleKeyDown}
            />
            <button
                className="btn btn-outline-secondary btn-search"
                type="button" id="button-addon2"
                onClick={handleClick}
            >
                Search
            </button>
        </div>

    )
}