import React from 'react';
import {Link} from 'react-router-dom';

const Clothes = (props) => {
    const {clothingData} = props;
    return(
        <div className="ui link cards">
        {Object.values(clothingData).map((product, i)=>{
            return(
                <div className="card" key={i} >
                    <Link to={`/designers/${product.designer}/${product.clothing_label.id}/${product.title}/${product.id}`}>
                        <div className="imageHolder"></div>
                    </Link>    
                        <div className="content">
                        <div className="header">{product.title}</div>
                                {product.inventory_total === 0 ? (<p id="soldout">SOLD OUT</p>) : null}
                            <div className="description links">
                                {product.designer}
                            </div>
                            <div className="meta links">
                                <Link to={`/search/products/${product.category.toLowerCase()}`}>{product.category}</Link>
                                <a>${product.price}</a>
                            </div>
                        </div>
                </div> 
            )
        })}
        </div>
    )
}

export default Clothes;