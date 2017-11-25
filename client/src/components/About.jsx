import React, { Component } from 'react';

class About extends Component {
    constructor(props){
        super(props);
        this.state = {

        }
    }

    render(){
        return(
            <section id="about">
                <div className="about-page">
                    <h1 className="ui header">Streetwear Boutiques</h1>
                    <div className="page-container ui container">
                        <div className="first-para">
                            <p className="text">
                                <span className="bold">Streetwear Boutiques</span> was founded and created by, Amidou Kante, in 2017 to bridge the gap between new clothing brands, and fashion lovers alike. Amidou Kante was inspired by various fashion communities and has built a place for different labels to grow and flourish. We take pride in being the first to provide a platform for new, innovative, unique, and emerging brands. 
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

export default About;