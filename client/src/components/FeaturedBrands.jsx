import React, { Component } from 'react';
// import{Link} from 'react-router-dom';

class FeaturedBrands extends Component {
    constructor(props){
        super(props);
        this.state = {
            
        }
    }

    componentDidMount() {
        // Get Request from database of featured brands
    }

    renderBrands(){
        return(
            <ul>
                <li><div>Brand 1</div></li>
                <li><div>Brand 1</div></li>
                <li><div>Brand 1</div></li>
            </ul>
        )
    }
    render(){
        return(
            <div className="featured-brands">
                {this.renderBrands()}
            </div>
        )
    }
}

export default FeaturedBrands;