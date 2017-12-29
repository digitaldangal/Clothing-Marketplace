import React, { Component } from 'react';
import {Redirect, Link} from 'react-router-dom';

class AllClothing extends Component {

    render(){
        const {redirect, currentPage} = this.state;
        return(
            <section id="all-clothing">
                {redirect ? <Redirect to={currentPage} /> : null}
                {this.renderPage()}
            </section>
        )
    }
}

export default AllClothing;