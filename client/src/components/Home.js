import React, { Component } from 'react';
import{Link} from 'react-router-dom';
import Card from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';

class Home extends Component {
    constructor(props){
        super(props);
        this.state = {
            
        }
    }

    render(){
        return(
            <Card>
                <Link to="/login"><RaisedButton label="Login"/></Link>
                <Link to="/register"><RaisedButton label="Register"/></Link>
            </Card>
        )
    }
}

export default Home;