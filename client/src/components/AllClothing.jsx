import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import Clothes from './Clothes';
import ListOfBrands from './ListOfBrands';

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
                <div className="ui grid computer only">
                    <ListOfBrands />
                </div>
                <Clothes />
            </section>
        )
    }
}

export default AllClothing;