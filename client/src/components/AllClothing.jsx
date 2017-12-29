import React, { Component } from 'react';
import {Redirect, Link} from 'react-router-dom';

class AllClothing extends Component {
    constructor(props){
        super(props);
        this.state = {
            redirect: false,
            currentPage: '',
            clothingData: false,
            clothingDataLoaded: false
        }
    }

    render(){
        const {redirect, currentPage} = this.state;
        return(
            <section id="all-clothing">
                {redirect ? <Redirect to={currentPage} /> : null}
                <ListOFBrands />
                <Clothes />
            </section>
        )
    }
}

export default AllClothing;