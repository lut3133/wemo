import React from 'react';
import {Link} from "react-router-dom";
import {Header} from "./Header";
import NavBar from "./NavBar";

class Home extends React.Component {
    render() {
        return (
            <div>
                <Link to="/register">register-page</Link>
                <br/>
                <Link to="/login">login-page</Link>
            </div>
        )
    }
}

export default Home;