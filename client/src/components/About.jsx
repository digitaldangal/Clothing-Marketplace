import React, { Component } from 'react';

class About extends Component {
    constructor(props){
        super(props);
        this.state = {

        }
    }
    
    render(){
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
                                <div className="img">
                                    <img src="https://firebasestorage.googleapis.com/v0/b/copped-9a558.appspot.com/o/images%2Ftiger_back.png?alt=media&token=4d1dc6f7-3cc3-4d80-83a4-20cabc4466ee" alt=""/>
                                </div>
                                <p className="text">
                                    <span className="bold">Streetwear Boutiques</span> was founded and created by, me Amidou Kante, in 2017 to bridge the gap between new clothing brands, and fashion lovers alike. I have always been interested in fashion, streetwear, and supporting smaller brands. However, there isn't a convenient way to explore all those brands, so I've decided to build a place where that is possible. I was inspired by various fashion communities and I'm on a mission to create a place for different labels to grow and flourish. 
                                </p>
                            </div>
                            <div className="item paragraph two">
                                <p className="text">
                                <span className="bold">Streetwear Boutiques</span> provides an exclusive curated selection of various brands, and our goal is to eventually become the source of the latest and most stunning labels. The more brands that sign up, the more our community grows to reach more customers, and the more our platform grows in the fashion world. We take pride in being the first to provide a platform for new, innovative, unique, and emerging brands. 
                                </p>
                                <div className="img">
                                    <img src="https://firebasestorage.googleapis.com/v0/b/copped-9a558.appspot.com/o/images%2F12666326_1080641875288231_678991855_n.jpg?alt=media&token=93a94ac0-dc59-45e3-b8b2-e9c4ed3e6e22" alt=""/>
                                </div>
                            </div>
                            <div className="item paragraph three">
                                <div className="img">
                                    <img src="https://firebasestorage.googleapis.com/v0/b/copped-9a558.appspot.com/o/images%2FONI_FRONT.png?alt=media&token=22b7d355-c402-4766-84cf-0a473fb9455d" alt=""/>
                                </div>
                                <p className="text">
                                <h1 className="ui header title" style={paraTitle}>Your Safety First</h1>
                                In order to protect our users, and keep our community safe, each brand is approved first before they are allowed to sell clothing. We have a zero-tolerance policy for any fraudulent behavior. We are always monitoring the marketplace, and any fraudulent user will be banned from our services immediately. Please exercise good judgment when using the marketplace.
                                </p>
                            </div>

                            <a href="/designers" className="ui secondary button">Shop Designers</a>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

export default About;