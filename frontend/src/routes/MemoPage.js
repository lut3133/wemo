import '../App.css';
import React from "react";
import {Header} from "../components/Header";
import MemoList from "../components/MemoList";
import {Link} from 'react-router-dom';
import Form from "../components/Form";


export default class MemoPage extends React.Component {

    constructor(props){
        super(props);
    }

    render()
    {
        console.log(this.props.location.state.name);
        console.log(this.props);
        return (
            <div>
                <Link to="/home">
                    <Header/>
                </Link>
                <Form fileName = {this.props.location.state.name} fileContent={this.props.location.state.content}/>
            </div>
        );
    }
}

