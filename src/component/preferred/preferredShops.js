import React, {Component} from 'react';
import Header from "../header";
import Cookies from "js-cookie";

class PreferredShops extends Component {
    constructor(props){
        super(props);
        navigator.geolocation.getCurrentPosition(this.showPosition);
        this.state = {
            preferredShops: []
        }
    }
    showPosition = (p)=>{
        this.setState({
            location: p
        });
        fetch('http://localhost:3030/Preferred?latitude='+this.state.location.coords.latitude+'&longitude='+this.state.location.coords.longitude,
            {
            method: 'get',
            headers: {
                'access_token': Cookies.get('access-token'),
                'Content-Type': 'application/json', 'Accept': 'application/json'
            }
        })  .then(res=>res.json())
            .then(res=>{
                this.setState({
                    preferredShops: res.likedShops
                });
                console.log(res)
            })
    };
    removeShop = (e)=>{
        console.log(e.target);
        fetch('http://localhost:3030/preferred',{
            method: 'delete',
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



    render() {
        let shops = this.state.preferredShops.map((s)=>{
            return (<div className="col-4 mt-5" key={s._id}>
                <div className="card">
                    <img className="card-img-top" src="http://placehold.it/150x150" alt="Card image cap"/>
                    <div className="card-body">
                        <h5 className="card-title">{s.name}</h5>
                        <span href="#" className="btn btn-primary mr-2" id={s._id} onClick={(e)=>this.removeShop(e)}>remove</span>

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

export default PreferredShops;