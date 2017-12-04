import React from 'react';

const ChooseSize=(props)=>{
    switch (props.category) {
        case "OUTERWEAR":
        case "TOPS":
            return(
                <div>
                    <input required="true" name="xxs" type="number" placeholder="XXS" onChange={(e)=>props.handleChange(e)}/>
                    <input required="true" name="xs" type="number" placeholder="XS" onChange={(e)=>props.handleChange(e)}/>
                    <input required="true" name="s" type="number" placeholder="S" onChange={(e)=>props.handleChange(e)}/>
                    <input required="true" name="m" type="number" placeholder="M" onChange={(e)=>props.handleChange(e)}/>
                    <input required="true" name="l" type="number" placeholder="L" onChange={(e)=>props.handleChange(e)}/>
                    <input required="true" name="xl" type="number" placeholder="XL" onChange={(e)=>props.handleChange(e)}/>
                    <input required="true" name="xxl" type="number" placeholder="XXL" onChange={(e)=>props.handleChange(e)}/>
                </div>
            )
        case "BOTTOMS":
            return(
            <div>
                <input required="true" name="us_26" type="number" placeholder="US 26" onChange={(e)=>props.handleChange(e)}/>
                <input required="true" name="us_27" type="number" placeholder="US 27" onChange={(e)=>props.handleChange(e)}/>
                <input required="true" name="us_28" type="number" placeholder="US 28" onChange={(e)=>props.handleChange(e)}/>
                <input required="true" name="us_29" type="number" placeholder="US 29" onChange={(e)=>props.handleChange(e)}/>
                <input required="true" name="us_30" type="number" placeholder="US 30" onChange={(e)=>props.handleChange(e)}/>
                <input required="true" name="us_31" type="number" placeholder="US 31" onChange={(e)=>props.handleChange(e)}/>
                <input required="true" name="us_32" type="number" placeholder="US 32" onChange={(e)=>props.handleChange(e)}/>
                <input required="true" name="us_33" type="number" placeholder="US 33" onChange={(e)=>props.handleChange(e)}/>
                <input required="true" name="us_34" type="number" placeholder="US 34" onChange={(e)=>props.handleChange(e)}/>
                <input required="true" name="us_35" type="number" placeholder="US 35" onChange={(e)=>props.handleChange(e)}/>
                <input required="true" name="us_36" type="number" placeholder="US 36" onChange={(e)=>props.handleChange(e)}/>
                <input required="true" name="us_37" type="number" placeholder="US 37" onChange={(e)=>props.handleChange(e)}/>
                <input required="true" name="us_38" type="number" placeholder="US 38" onChange={(e)=>props.handleChange(e)}/>
                <input required="true" name="us_39" type="number" placeholder="US 39" onChange={(e)=>props.handleChange(e)}/>
                <input required="true" name="us_40" type="number" placeholder="US 40" onChange={(e)=>props.handleChange(e)}/>
                <input required="true" name="us_41" type="number" placeholder="US 41" onChange={(e)=>props.handleChange(e)}/>
                <input required="true" name="us_42" type="number" placeholder="US 42" onChange={(e)=>props.handleChange(e)}/>
                <input required="true" name="us_43" type="number" placeholder="US 43" onChange={(e)=>props.handleChange(e)}/>
                <input required="true" name="us_44" type="number" placeholder="US 44" onChange={(e)=>props.handleChange(e)}/>
            </div>
            )
        case "ACCESSORIES":
            return(
                <div>
                    <input required="true" name="os" type="number" placeholder="One Size" onChange={(e)=>props.handleChange(e)}/>
                    <input required="true" name="xs" type="number" placeholder="XS" onChange={(e)=>props.handleChange(e)}/>
                    <input required="true" name="s" type="number" placeholder="S" onChange={(e)=>props.handleChange(e)}/>
                    <input required="true" name="m" type="number" placeholder="M" onChange={(e)=>props.handleChange(e)}/>
                    <input required="true" name="l" type="number" placeholder="L" onChange={(e)=>props.handleChange(e)}/>
                    <input required="true" name="xl" type="number" placeholder="XL" onChange={(e)=>props.handleChange(e)}/>
                </div>
            )
    
        default:
            return(
                <div>
                </div>
            )
    }
}

export default ChooseSize;