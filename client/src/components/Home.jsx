import React, { Component } from 'react';
import{Link} from 'react-router-dom';

import Article from './Article';
import FeaturedBrands from './FeaturedBrands';


class Home extends Component {
    constructor(props){
        super(props);
        this.state = {
            
        }
    }

    render(){
        return(
            <section>
                <main role="main">
                    <Article />
                    <div>
                        <h1>Featured Brands</h1>
                        <div className="featured-brands">
                            <FeaturedBrands />
                        </div>
                    </div>
                </main>
            </section>
        )
    }
}

export default Home;