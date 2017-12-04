import React, { Component } from 'react';

const SizeChoose=(props)=>{
    switch (props.productDetails.category) {
        case value:
        return(
            <select required name="size" onChange={(e)=>this.handleChange(e)}>
            <option value="">SELECT</option>
            {this.state.clothingData.inventory.xs > 0 ? <option value="xs">XS</option> : <option disabled>XS</option>}
            {this.state.clothingData.inventory.s > 0 ? <option value="s">S</option> : <option disabled>S</option>}
            {this.state.clothingData.inventory.m > 0 ? <option value="m">M</option> : <option disabled>M</option>}
            {this.state.clothingData.inventory.l > 0 ? <option value="l">L</option> : <option disabled>L</option>}
            {this.state.clothingData.inventory.xl > 0 ? <option value="xl">XL</option> : <option disabled>XL</option>}
        </select>
        )
    
        default:
            break;
    }
}

export default SizeChoose;