import React, {Component} from 'react';
import Header from "../header";
import {connect} from "react-redux";

class Index extends Component {
    constructor(props){
        super(props);
        navigator.geolocation.getCurrentPosition(this.showPosition);
        this.state = {
            shops: []
        }
    }
    showPosition = (p)=>{
        console.log(p);
        this.setState({
            location: p
        });
        fetch('http://localhost:3030/shops',{
            method: 'post',
            headers: {
                'access_token': this.props.access_token,
                'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: JSON.stringify({
                location: {
                    latitude: this.state.location.coords.latitude,
                    longitude: this.state.location.coords.longitude
                }
            })
        }).then(res=>res.json())
            .then(res=>{
                this.setState({
                    shops: res.shops
                })
            })
    };
    render() {

        let shops = this.state.shops.map((s)=>{
            return (<div className="col-4 mt-5" key={s._id}>
                <div className="card">
                    <img className="card-img-top" src="http://placehold.it/150x150" alt="Card image cap"/>
                    <div className="card-body">
                        <h5 className="card-title">{s.name}</h5>
                        <a href="#" className="btn btn-primary mr-2">LIkE</a>
                        <a href="#" className="btn btn-danger">DISLIKE</a>
                    </div>
                </div>
            </div>)
        });
        return (
            <div className="container-fluid">
                <Header/>
                <div className="container">
                    <div className="row">
                        {shops}
                    </div>
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        access_token: state.user.access_token,
    };
};

export default connect(mapStateToProps,null)(Index);