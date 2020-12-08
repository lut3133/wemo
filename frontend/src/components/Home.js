import React from 'react';
import {Link} from "react-router-dom";

class Home extends React.Component {
    render() {
        return (
            <div>
                <h1>home</h1>
                <Link to="/register">register-page</Link>
                <br/>
                <Link to="/login">login-page</Link>
                <br/>
                <Link to="/memo">memos-page</Link>
                <br/>
                <Link to="/file">files-page</Link>
            </div>
        )
    }
}

export default Home;