import '../App.css';
import React from "react";
import {Header} from "../components/Header";
import MemoList from "../components/MemoList";
import {Route,Link, Switch} from 'react-router-dom';
import Home from "../components/Home";
import MemosNavBar from "../components/MemosNavBar";
import NavBar from "../components/NavBar";
import buttonImg from '../images/add-memo-button.png'

export default class MemosPage extends React.Component {

    constructor(props){
        super(props);
    }

    createMemo(){
        window.location.replace("/memo");
    }

    render()
    {
        return (
            <div>
                <MemoList/>
                <Link to={{
                    pathname : "/memo",
                    state : {
                        name : "",
                        content : ""
                    }
                }}>
                    <div class = "createMemo">
                        <img class="createMemo" src={buttonImg} width="50" height="50"/>
                    </div>
                </Link>
            </div>
        );
    }
}

