import '../App.css';
import React from "react";
import {Link} from 'react-router-dom';
import Form from "../components/Form";
import audioButtonImg from "../images/add-audio-button.png";


export default class MemoPage extends React.Component {

    constructor(props){
        super(props);
        this.state = {name: this.props.location.state.name,
            content: this.props.location.state.content,
            modificationDate: this.props.location.state.modificationDate}
    }

    render()
    {
        console.log(this.props.location.state.name);
        console.log(this.props);

        return (
            <div>
                <Form fileName = {this.state.name} fileContent={this.state.content} modificationDate ={this.state.modificationDate}/>
                <Link to={{
                    pathname : "/audio",
                    state : {
                        name : "",
                        content : ""
                    }
                }}>
                    <div class = "createMemo">
                        <img class="createAudio" src={audioButtonImg} alt="녹음 파일 추가 버튼" width="50" height="50"/>
                    </div>
                </Link>
            </div>
        );
    }
}

