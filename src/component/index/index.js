import React, {Component} from 'react';
import Header from "../header";
import Cookies from 'js-cookie';

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
                'access_token': Cookies.get('access-token'),
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

    likeShop = (e)=>{
        console.log(e.target);
        fetch('http://localhost:3030/preferred',{
            method: 'post',
            headers: {
                'access_token': Cookies.get('access-token'),
                'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: JSON.stringify({
                shopId: e.target.id
            })
        }).then(res=>res.json())
            .then(res=>{
                console.log(res);
                navigator.geolocation.getCurrentPosition(this.showPosition);
            })
    };

    dislikeShop = (e)=>{

    };

    render() {

        let shops = this.state.shops.map((s)=>{
            return (<div className="col-4 mt-5" key={s._id}>
                <div className="card">
                    <img className="card-img-top" src="http://placehold.it/150x150" alt="Card image cap"/>
                    <div className="card-body">
                        <h5 className="card-title">{s.name}</h5>
                        <span href="#" className="btn btn-primary mr-2" id={s._id} onClick={(e)=>this.likeShop(e)}>like</span>
                        <span href="#" className="btn btn-danger" id={s._id}>dislike</span>
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


export default Index;