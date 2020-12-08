import '../App.css';
import React from "react";
import {Header} from "../components/Header";
import MemoList from "../components/MemoList";
import {Route,Link, Switch} from 'react-router-dom';
import Home from "../components/Home";

export default class MemosPage extends React.Component {

    constructor(props){
        super(props);
    }

    render()
    {
        return (
            <div>
                <Header/>
                <MemoList/>
                <Link to="/">home</Link>
            </div>
        );
    }
}

