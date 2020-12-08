import '../App.css';
import React from "react";
import {postLogin, postRegister} from "../requests/requests";
import { withRouter } from 'react-router-dom';

class LoginPage extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            name: React.createRef(),
            id: React.createRef(),
            password: React.createRef(),
            password2: React.createRef()

        }
        this.submit = this.submit.bind(this)
    }

    async submit(){
        const data = {
            name: this.state.name.current.value,
            id: this.state.id.current.value,
            password: this.state.password.current.value,
            password2: this.state.password.current.value
        }
        const echo_result = await postRegister(data);
        console.log(echo_result);
        this.props.history.push("/");
    }

    render() {
        return (
            <div>
                <span>RegisterPage</span>
                <br/>
                <input ref={this.state.name}/>
                <br/>
                <input ref={this.state.id}/>
                <br/>
                <input ref={this.state.password}/>
                <br/>
                <input ref={this.state.password2}/>
                <button onClick={this.submit}>Register</button>
            </div>
        );
    }
}

export default withRouter(LoginPage)