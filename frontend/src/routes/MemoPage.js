import '../App.css';
import React from "react";
import {Header} from "../components/Header";
import MemoList from "../components/MemoList";
import {Link} from 'react-router-dom';
import Form from "../components/Form";
import {postFileContent} from "../requests/requests";
import buttonImg from "../images/add-memo-button.png";
import audioButtonImg from "../images/add-audio-button.png";


export default class MemoPage extends React.Component {

    constructor(props){
        super(props);
        this.state = {name: this.props.location.state.name,
            content: this.props.location.state.content}
    }

    render()
    {
        console.log(this.props.location.state.name);
        console.log(this.props);

        return (
            <div>
                <Form fileName = {this.state.name} fileContent={this.state.content}/>
                <Link to={{
                    pathname : "/audio",
                    state : {
                        name : "",
                        content : ""
                    }
                }}>
                    <div class = "createMemo">
                        <img class="createAudio" src={audioButtonImg} width="50" height="50"/>
                    </div>
                </Link>
            </div>
        );
    }
}

