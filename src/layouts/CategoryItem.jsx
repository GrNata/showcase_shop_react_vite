import {useState} from "react";

export const CategoryItem = (props) => {

    const {
        checkedCategory = Function.prototype,
        id,
        category,
        selected
    } = props;

    return (
        <div className="form-radio-item">
            <input className="form-radio-input"
                   type="radio"
                   onChange={() => checkedCategory(id)}
                   checked={selected === id}
            />
            <span> </span>
            <label className="form-radio-label" >
                {category}
            </label>
        </div>
    )
}