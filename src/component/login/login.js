import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import Header from "../header";

class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            login: 'abderafii.bel@gmail.com',
            password: 'myPassword'
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
        this.props.Login({
            ...this.state
        })
    };


    render() {
        return (

            <div className="container">
                <Header/>
                <div className="row">
                    <div className="col-md-6 mx-auto mt-5">
                        <form>
                            <div className="form-group">
                                <input type="text" className="form-control" placeholder="Your Email *" value={this.state.login} onChange={(e)=>this.loginChange((e))}/>
                            </div>
                            <div className="form-group">
                                <input type="password" className="form-control" placeholder="Your Password *" value={this.state.password} onChange={(e)=>this.passwordChange(e)}/>
                            </div>
                            <div className="form-group">
                                <input type="submit" className="btnSubmit" value="Login" onClick={(e)=>this.submit(e)}/>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        isLogged: state.isLogged,
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        Login: (info) => {
            dispatch({
                type: "login",
                payload: info
            });
            ownProps.history.push('/');
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);