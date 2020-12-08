import React from 'react';
import {Link} from "react-router-dom";
import {Header} from "./Header";

class Home extends React.Component {
    render() {
        return (
            <div>
                <Header/>
                <Link to="/register">register-page</Link>
                <br/>
                <Link to="/login">login-page</Link>
                <br/>
                <Link to="/memos">memos-page</Link>
                <br/>
                <Link to="/memo">memo-page</Link>
                <br/>
                <Link to="/file">files-page</Link>
            </div>
        )
    }
}

export default Home;