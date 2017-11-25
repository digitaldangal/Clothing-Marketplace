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
                    <h3 className="ui header">Expand Your Wardrobe</h3>
                    <div className="page-container ui container">
                        <div className="ui divided items container">
                            <div className="paragraph">
                                <div className="img">
                                    <img src="https://firebasestorage.googleapis.com/v0/b/copped-9a558.appspot.com/o/images%2Ftiger_back.png?alt=media&token=4d1dc6f7-3cc3-4d80-83a4-20cabc4466ee" alt=""/>
                                </div>
                                <p className="text">
                                    <span className="bold">Streetwear Boutiques</span> was founded and created by, me Amidou Kante, in 2017 to bridge the gap between new clothing brands, and fashion lovers alike. I have always been interested in fashion, streetwear, and supporting smaller brands. However, there isn't a convenient way to explore all those brands, so I've decided to build a place where that is possible. I was inspired by various fashion communities and I'm on a mission to create a place for different labels to grow and flourish. 
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

export default About;