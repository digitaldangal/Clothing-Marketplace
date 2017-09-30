import React, { Component } from 'react';
import{Link} from 'react-router-dom';

import Article from './Article';


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
                        
                    </div>
                </main>
            </section>
        )
    }
}

export default Home;