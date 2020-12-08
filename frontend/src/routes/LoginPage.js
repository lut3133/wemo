import '../App.css';
import React from "react";
import {postLogin} from "../requests/requests";
import { withRouter } from 'react-router-dom';

class LoginPage extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            id: React.createRef(),
            password: React.createRef()
        }
        this.submit = this.submit.bind(this)
    }

    async submit(){
        const data = {
            id: this.state.id.current.value,
            password: this.state.password.current.value
        }
        const echo_result = await postLogin(data);
        console.log(echo_result);
        this.props.history.push("/");
    }

    render() {
        return (
            <div>
                <span>LoginPage</span>
                <br/>
                <input ref={this.state.id}/>
                <br/>
                <input ref={this.state.password}/>
                <button onClick={this.submit}>Login</button>
            </div>
        );
    }
}

export default withRouter(LoginPage)