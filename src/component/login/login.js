import React, {Component} from 'react';
import Header from "../header";
import Cookies from 'js-cookie';

class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            login: 'abderafii.bel@gmail.com',
            password: 'myPassword',
            isLogged: Cookies.get('access-token'),
            status: 0,
            error: ''
        };
        if (Cookies.get('access-token')){
            this.props.history.push('/nearby');
        }
    }
    loginChange = (e)=>{
        this.setState({login: e.target.value})
    };
    passwordChange = (e)=>{
        this.setState({password: e.target.value})
    };

    submit = (e)=>{
        e.preventDefault();
        fetch('http://localhost:3030/login',{
            method: 'post',
            headers: {'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: JSON.stringify({
                email: this.state.login,
                password: this.state.password
            })
        }).then(res=>{
            this.setState({status: res.status})
            return res.json();
        })


            .then( res=>{
                if (this.state.status == 200){
                    Cookies.set('access-token', res.access_token);
                    this.setState({isLogged: true});
                    this.props.history.push('/nearby');
                } else {
                    this.setState({
                        error: res.error
                    })
                }
            })


            .catch(e=>console.log(e));
    };


    render() {
        return (

            <div className="container-fluid">
                <Header/>
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 mx-auto mt-5">
                            <form>
                                <div className="form-group">
                                    <input type="text" className="form-control" placeholder="Your Email *" value={this.state.login} onChange={(e)=>this.loginChange((e))}/>
                                </div>
                                <div className="form-group">
                                    <input type="password" className="form-control" placeholder="Your Password *" value={this.state.password} onChange={(e)=>this.passwordChange(e)}/>
                                </div>
                                <span>{this.state.error}</span>
                                <div className="form-group">
                                    <input type="submit" className="btnSubmit" value="Login" onClick={(e)=>this.submit(e)}/>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;