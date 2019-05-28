import React, {Component} from 'react';
import Header from "../header";
import Cookies from "js-cookie";

class SignUp extends Component {
    constructor(props){
        super(props);
        this.state = {
            username: '',
            email: '',
            password: '',
            status: 0,
            error: ''
        }
    }
    passwordChange = (e)=>{
        this.setState({password: e.target.value})
    };
    emailChange = (e)=>{
        this.setState({email: e.target.value})
    };
    usernameChange = (e)=>{
        this.setState({username: e.target.value})
    };


    submit = (e)=>{
        e.preventDefault();
        fetch('http://localhost:3030/register',{
            method: 'post',
            headers: {'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: JSON.stringify({
                username: this.state.username,
                email: this.state.email,
                password: this.state.password
            })
        }).then(res=>{
            this.setState({status: res.status})
            return res.json();
        })


            .then( res=>{
                if (this.state.status == 200){
                    this.props.history.push('/login');
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
                                    <input type="text" className="form-control" placeholder="Your Username *" value={this.state.username} onChange={(e)=>this.usernameChange((e))}/>
                                </div>
                                <div className="form-group">
                                    <input type="text" className="form-control" placeholder="Your Email *" value={this.state.email} onChange={(e)=>this.emailChange((e))}/>
                                </div>
                                <div className="form-group">
                                    <input type="password" className="form-control" placeholder="Your Password *" value={this.state.password} onChange={(e)=>this.passwordChange(e)}/>
                                </div>
                                <div className="form-group">
                                    <input type="submit" className="btnSubmit" value="Register" onClick={(e)=>this.submit(e)}/>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default SignUp;