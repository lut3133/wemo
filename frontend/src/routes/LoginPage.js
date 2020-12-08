import '../App.css';
import React from "react";

class LoginPage extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            id: "",
            password: ""
        }
    }

    updateId = (event) => {this.setState({id: event.target.value})}
    updatePassword = (event) => {this.setState({password:event.target.value})}

    render() {
        return (
            <div>
                <span>LoginPage</span>
                <br/>
                <input value={this.state.id} onChange={this.updateId}/>
                <br/>
                <input value={this.state.password} onChange={this.updatePassword}/>
                <button>Login</button>
            </div>
        );
    }
}

export default LoginPage;