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
                                <span className="bold">Streetwear Boutiques</span> 
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

export default About;