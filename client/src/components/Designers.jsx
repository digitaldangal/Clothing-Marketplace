import React, { Component } from 'react';
import {Link, Redirect} from 'react-router-dom';
import {Table} from 'semantic-ui-react';
import firebase from '../config/firebase';
var db = firebase.firestore();

class Designers extends Component {
    constructor(props){
        super(props);
        this.state = {
            redirect: false,
            currentPage: null,
            currentUser: false,
            brandData: false,
        }
    }

    componentWillMount() {
        let brandData = {};
        if(this.props.brandDataLoaded === false){
            db.collection("brands").where("approved", "==", true).orderBy("name").get().then(res=>{
                res.forEach((brand)=>{
                    return brandData[brand.id] = brand.data()
                })
            }).then(()=>{
                this.setState({brandData: brandData})
                this.props.storeFeed(brandData);
            }).catch(err=>{console.log(err)})
        }else{
            let brandDataFeed = this.props.brandData;
            this.setState({
                brandData: brandDataFeed
            })
        }
    }

    renderBrands(){
        const tableStyle = {
            "border": "none",
            "outline": "none"
        }
        if(this.state.brandData){
            return(
                <div className="designer-table">
                    {Object.values(this.state.brandData).map((brand, i)=>{
                        return(
                            <Table fixed singleLine style={tableStyle} key={i}>
                                <Table.Body>
                                    <Table.Row className="table-contents">
                                        <Table.Cell width={3} className="table-title"><Link to={`/designers/${brand.name}/${brand.id}`}>{brand.name}</Link></Table.Cell>
                                        <Table.Cell className="table-description">{brand.description}</Table.Cell>
                                    </Table.Row>
                                </Table.Body>
                            </Table>
                        )
                    })}
                </div>
            )
        }else{
            return(
                <div className="ui active inverted dimmer">
                    <div className="ui indeterminate text loader">Preparing Files</div>
                </div>
            )
        }
    }

    renderPage(){
        if(this.state.brandData){
            return(
                <div className="brand-list">
                    <h1 className="ui header">Designers</h1>
                    <div className="page-container">
                        {this.renderBrands()}
                    </div>
                </div>
            )
        }else{
            return(
                <div className="ui active inverted dimmer">
                    <div className="ui indeterminate text loader">Preparing Files</div>
                </div>
            )
        }
    }
    render(){
        const {redirect, currentPage} = this.state;
        return(
            <section id="brand-list">
                {redirect ? <Redirect to={currentPage} /> : null}
                {this.renderPage()}
            </section>
        )
    }
}

export default Designers;