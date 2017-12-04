import React, { Component } from 'react';

const SizeChoose=(props)=>{
    const {productDetails} = props;
    switch (productDetails.category) {
        case "OUTERWEAR":
        case "TOPS":
        return(
            <select required name="size" onChange={(e)=>props.handleChange(e)}>
                <option value="">SELECT</option>
                {Object.values(productDetails.inventory).map((size, i)=>{
                return(
                    size > 0 ? <option key={i} value={size}>{Object.keys(productDetails.inventory)[i].toUpperCase()}</option> : <option disabled>{Object.keys(productDetails.inventory)[i].toUpperCase()}</option>
                )
                })}
            </select>
        )

        case "BOTTOMS":
        return(
            <select required name="size" onChange={(e)=>props.handleChange(e)}>
                <option value="">SELECT</option>
                {Object.values(productDetails.inventory).map((size, i)=>{
                return(
                    size > 0 ? <option key={i} value={size}>{Object.keys(productDetails.inventory)[i].toUpperCase()}</option> : <option disabled>{Object.keys(productDetails.inventory)[i].toUpperCase()}</option>
                )
                })}
            </select>
        )

        case "ACCESSORIES":
        return(
            <select required name="size" onChange={(e)=>props.handleChange(e)}>
                <option value="">SELECT</option>
                {Object.values(productDetails.inventory).map((size, i)=>{
                return(
                    size > 0 ? <option key={i} value={size}>{Object.keys(productDetails.inventory)[i].toUpperCase()}</option> : <option disabled>{Object.keys(productDetails.inventory)[i].toUpperCase()}</option>
                )
                })}
            </select>
        )
    
        default:
            return(
                <div></div>
            )
    }
}

export default SizeChoose;