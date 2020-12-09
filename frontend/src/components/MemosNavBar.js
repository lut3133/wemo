import React from "react"
import {postDeleteFile} from "../requests/requests";
import {Link} from "react-router-dom";

export default class MemosNavBar extends React.Component{

    render(){
        const {dispatchDeleteMemo} = this.props

        return (
            <div class="memosNavBar"><Link class="folderSelect" to="/file">메모 찾기</Link></div>
        )
    }
}

