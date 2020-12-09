import React from "react"
import {Link} from "react-router-dom";

export default class NavBar extends React.Component{

    render(){

        return (
            <div class="navBar"><Link class="navBarMenu" to="/memos">메모</Link>
                <Link class="navBarMenu" to="/file">메모 찾기</Link></div>
        )
    }
}

