import React from 'react';
import Footer from './Footer';
import {Link} from 'react-router-dom';

const Terms = (props)=> {
    const paraTitle = {
        marginBottom: '1em',
        textAlign: 'center',
        marginTop: '1em',
    }
    return(
        <section id="about">
            <div className="about-page ui container">
                <h1 className="ui header">Discover Streetwear Boutiques</h1>
                <h3 className="ui header">Expand Your Wardrobe</h3>
                <div className="page-container ui container">
                    <div className="ui divided items container">
                        <div className="item paragraph">
                            <p className="text">
                               
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </section>
    )
}

export default Terms;